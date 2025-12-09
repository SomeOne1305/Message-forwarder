import { Scenes } from 'telegraf';
import { CHANEL_ID } from '../constants';

let waiting_message_id: number | null = null;

// Step 1 — ask to send message
const step1 = async (ctx: Scenes.WizardContext) => {
  const waiting_message = await ctx.reply('✍️ Xabaringizni yozing:');
  waiting_message_id = waiting_message.message_id;
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
  ctx.deleteMessage(waiting_message_id!);
  return ctx.scene.leave();
};

export const sendMessageScene = new Scenes.WizardScene(
  'send-message-scene',
  step1,
  step2,
);
