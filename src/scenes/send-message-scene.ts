import { Scenes } from 'telegraf';
import { CHANEL_ID } from '../constants';

// Step 1 — ask to send message
const step1 = async (ctx: Scenes.WizardContext) => {
  await ctx.reply('✍️ Xabaringizni yozing:');
  return ctx.wizard.next();
};

// Step 2 — handle message
const step2 = async (ctx: Scenes.WizardContext) => {
  const msg = ctx.message;

  if (!msg || !('text' in msg)) {
    await ctx.reply('Faqat matn yuboring!');
    return;
  }

  await ctx.telegram.sendMessage(CHANEL_ID, `📩 Anonim xabar:\n\n${msg.text}`);

  await ctx.reply('✅ Xabaringiz kanalga yuborildi!');

  return ctx.scene.leave();
};

export const sendMessageScene = new Scenes.WizardScene(
  'send-message-scene',
  step1,
  step2,
);
