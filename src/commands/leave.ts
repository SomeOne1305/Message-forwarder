import { Scenes } from 'telegraf';

const debug = require('debug')('bot:leave_message');

const leaveMessage = () => async (ctx: Scenes.WizardContext) => {
  debug('Triggered "leave message" scene');
  await ctx.answerCbQuery();
  return ctx.scene.enter('send-message-scene');
};
export { leaveMessage };
