const sendBotMessage = async (bot, chatId, message, isGroup = false) => {
  try {
    const options = {
      parse_mode: 'Markdown'
    };

    return await bot.sendMessage(chatId, message, options);
  } catch (error) {
    console.error('Error sending message:', error);
    throw error;
  }
};

// Function is kept for backward compatibility but now always returns true
const isAllowedThread = (msg) => true;

module.exports = { sendBotMessage, isAllowedThread };