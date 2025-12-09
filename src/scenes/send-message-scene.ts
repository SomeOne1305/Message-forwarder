import { Scenes } from 'telegraf';
import { CHANEL_ID } from '../constants';

type WizardContextWithState = Scenes.WizardContext & {
  wizard: Scenes.WizardContext['wizard'] & {
    state: {
      askMsgId?: number;
    };
  };
};
// Step 1 — ask to send message
// STEP 1 — ask user for the message
const step1 = async (ctx: WizardContextWithState) => {
  const sent = await ctx.reply('✍️ Xabaringizni yozing:');

  // Save message ID in wizard state
  ctx.wizard.state.askMsgId = sent.message_id;
  return ctx.wizard.next();
};

// STEP 2 — handle the user's text
const step2 = async (ctx: WizardContextWithState) => {
  const msg = ctx.message;
  const askMsgId = ctx.wizard.state.askMsgId;

  if (!msg || !('text' in msg)) {
    await ctx.reply('❗ Faqat matn yuboring!');
    return;
  }

  try {
    // 1. Send message to channel
    await ctx.telegram.sendMessage(CHANEL_ID, msg.text);

    // 2. Send confirmation + menu (1 message only)
    const confirmation = await ctx.reply(
      `✅ Xabar yuborildi!\n\n<b>Xabar:</b> ${msg.text}`,
    );

    // 3. DELETE the temporary messages
    try {
      if (askMsgId) await ctx.deleteMessage(askMsgId); // remove "write your message"
    } catch (e) {}

    try {
      await ctx.deleteMessage(msg.message_id); // remove user's message
    } catch (e) {}
    await ctx.deleteMessage(confirmation.message_id); // remove confirmation message
    // 4. Leave scene
    return ctx.scene.leave();
  } catch (error) {
    console.error('ERR:', error);
    await ctx.reply('❌ Xatolik yuz berdi. Iltimos, qayta urinib ko‘ring.');
  }
};

export const sendMessageScene = new Scenes.WizardScene(
  'send-message-scene',
  step1,
  step2,
);
