import { Markup, Scenes } from 'telegraf';
import { CHANEL_ID } from '../constants';

let waiting_message_id: number | null = null;

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
  await ctx.editMessageText(
    '<b>Xabar:</b>  ' + msg.text + '\n <b>Status:</b> ' + '✅',
    { parse_mode: 'HTML' },
  );
  setTimeout(
    async () =>
      await ctx.editMessageText(
        '🏠 Bosh sahifa',
        Markup.inlineKeyboard([
          Markup.button.callback('✉️ Xabar yuborish', 'send_message', false),
        ]),
      ),
    700,
  );
  await ctx.deleteMessage(msg.message_id);
  return ctx.scene.leave();
};

export const sendMessageScene = new Scenes.WizardScene(
  'send-message-scene',
  step1,
  step2,
);
