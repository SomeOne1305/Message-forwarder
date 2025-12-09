import { VercelRequest, VercelResponse } from '@vercel/node';
import 'dotenv/config';
import { Scenes, session, Telegraf } from 'telegraf';
import { about, check_subscribe, leaveMessage, onStart } from './commands';
import { development, production } from './core';
import { sendMessageScene } from './scenes/send-message-scene';

const BOT_TOKEN = process.env.BOT_TOKEN || '';
const ENVIRONMENT = process.env.NODE_ENV || '';

const bot = new Telegraf<Scenes.WizardContext>(BOT_TOKEN);

bot.start(onStart());
bot.command('about', about());

const stage = new Scenes.Stage([sendMessageScene]);
bot.use(session());
bot.use(stage.middleware());
bot.action('send_message', async (ctx) => {
  const debug = require('debug')('bot:callback_query');
  debug('Triggered "callback_query" event for send_message');
  return leaveMessage()(ctx);
});
bot.action('check_subscribe', check_subscribe());
//prod mode (Vercel)
export const startVercel = async (req: VercelRequest, res: VercelResponse) => {
  await production(req, res, bot);
};
//dev mode
ENVIRONMENT !== 'production' && development(bot);
