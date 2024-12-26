const TelegramBot = require('node-telegram-bot-api');
const express = require('express');
const config = require('./config');
const { getTokenPrice } = require('./services/price');
const { checkPriceAlerts } = require('./services/priceAlerts');
const { formatPrice, formatPriceAlert } = require('./utils/messageFormatter');
const { sendBotMessage } = require('./utils/messageHandler');
const { isValidToken } = require('./config/tokens');

// Initialize Express app for Railway health checks
const app = express();
app.get('/', (req, res) => res.send('Bot is running!'));
app.listen(config.port, () => {
  console.log(`Health check server running on port ${config.port}`);
});

// Initialize bot
const bot = new TelegramBot(config.telegramToken, {
  webHook: process.env.NODE_ENV === 'production'
});

// Handle /preis command
bot.onText(/\/preis(?:@\w+)? ?(\w+)?/, async (msg, match) => {
  const symbol = match[1]?.toLowerCase();
  if (!symbol) {
    return sendBotMessage(
      bot,
      msg.chat.id,
      'Bitte geben Sie ein Token-Symbol an (z.B. /preis pepu)'
    );
  }

  if (!isValidToken(symbol)) {
    return sendBotMessage(
      bot,
      msg.chat.id,
      `Ungültiges Token-Symbol: ${symbol}`
    );
  }

  try {
    const priceData = await getTokenPrice(symbol);
    if (priceData) {
      await sendBotMessage(
        bot,
        msg.chat.id,
        formatPrice(priceData)
      );
    } else {
      await sendBotMessage(
        bot,
        msg.chat.id,
        `Konnte den Preis für ${symbol.toUpperCase()} nicht abrufen.`
      );
    }
  } catch (error) {
    console.error('Price fetch error:', error);
    await sendBotMessage(
      bot,
      msg.chat.id,
      `Fehler beim Abrufen des Preises für ${symbol.toUpperCase()}.`
    );
  }
});