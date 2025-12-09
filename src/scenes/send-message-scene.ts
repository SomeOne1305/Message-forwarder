import { Markup, Scenes } from 'telegraf';
import { CHANEL_ID } from '../constants';

// Step 1 — ask to send message
const step1 = async (ctx: Scenes.WizardContext) => {
  await ctx.editMessageText('✍️ Xabaringizni yozing:');
  return ctx.wizard.next();
};

// Step 2 — handle message
const step2 = async (ctx: Scenes.WizardContext) => {
  const msg = ctx.message;

  if (!msg || !('text' in msg)) {
    await ctx.reply('Faqat matn yuboring!');
    return;
  }

  await ctx.telegram.sendMessage(CHANEL_ID, `${msg.text}`);

  const success_message = await ctx.reply('✅ Xabaringiz kanalga yuborildi!');
  ctx.deleteMessage(msg.message_id);
  ctx.deleteMessage(success_message.message_id);
  ctx.editMessageText(
    '🏠 Bosh sahifa',
    Markup.inlineKeyboard([
      Markup.button.callback('✉️ Xabar yuborish', 'send_message', false),
    ]),
  );
  return ctx.scene.leave();
};

export const sendMessageScene = new Scenes.WizardScene(
  'send-message-scene',
  step1,
  step2,
);
