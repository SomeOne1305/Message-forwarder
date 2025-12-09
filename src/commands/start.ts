// commands/onStart.ts
import createDebug from 'debug';
import { Context, Markup } from 'telegraf';
import { CHANEL_ID } from '../constants';

const debug = createDebug('bot:greeting_text');

const onStart = () => async (ctx: Context) => {
  debug('Triggered "start" command');

  const user_id = ctx.message?.from.id;
  const member = await ctx.telegram.getChatMember(CHANEL_ID, user_id!);
  const link = await ctx.telegram.exportChatInviteLink(CHANEL_ID);
  if (member.status === 'left' || member.status === 'kicked') {
    return ctx.reply("Iltimos kanalga qo'shiling", {
      reply_markup: {
        inline_keyboard: [
          [{ text: "Kanalga qo'shilish", url: link }],
          [{ text: '️✅ Tekshirish', callback_data: 'check_subscribe' }],
        ],
      },
    });
  }

  return ctx.reply(
    '🏠 Bosh sahifa',
    Markup.inlineKeyboard([
      Markup.button.callback('✉️ Xabar yuborish', 'send_message', false),
    ]),
  );
};

export { onStart };
