import { Context } from 'telegraf';
import { CHANEL_ID } from '../constants';

const debug = require('debug')('bot:check_subscribe');

const check_subscribe = () => async (ctx: Context) => {
  try {
    debug('Triggered "check_subscribe" action');
    await ctx.answerCbQuery();

    const userId = ctx?.from?.id!;
    const member = await ctx.telegram.getChatMember(CHANEL_ID, userId);

    if (member.status === 'left' || member.status === 'kicked') {
      return ctx.editMessageText(
        '❌ Siz hali kanalga qo‘shilmadingiz.\nIltimos, avval obuna bo‘ling:',
        {
          reply_markup: {
            inline_keyboard: [
              [
                {
                  text: 'Kanalga qo‘shilish',
                  url: 'https://t.me/uzmustudentss',
                },
              ],
              [
                {
                  text: '️🔄 Qayta tekshirish',
                  callback_data: 'check_subscribe',
                },
              ],
            ],
          },
        },
      );
    }

    // User is subscribed → show homepage (same as /start)
    return ctx.editMessageText('🏠 Bosh sahifa', {
      reply_markup: {
        inline_keyboard: [
          [{ text: '✉️ Xabar yuborish', callback_data: 'send_message' }],
        ],
      },
    });
  } catch (error) {
    console.error(error);
    return ctx.reply('Xatolik yuz berdi. Keyinroq qayta urinib ko‘ring.');
  }
};

export { check_subscribe };
