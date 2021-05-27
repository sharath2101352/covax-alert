const TelegramBot = require('node-telegram-bot-api');
const cron = require('node-cron');
const https = require('https');
require('dotenv').config();
const options = {
  hostname: process.env.END_POINT_HOST,
  path: process.env.END_POINT_PATH+'?pincode=505215&date=27-05-2021',
  headers: {'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.76 Safari/537.36'},
  method: 'GET'
}
// replace the value below with the Telegram token you receive from @BotFather
const token = process.env.MESSENGER_TOKEN;

// Create a bot that uses 'polling' to fetch new updates
const bot = new TelegramBot(token, {polling: true});


// Scheduler to check slots for every 1 minute
cron.schedule('* * * * *', () => {
	const req = https.request(options, res => {
	  console.log(`statusCode: ${res.statusCode}`)

	  res.on('data', d => {
		var jsonObject = JSON.parse(d);
		console.log(jsonObject.sessions[0].center_id);
		bot.sendMessage('1758209609', 'Center: '+jsonObject.sessions[0].center_id+', Slots: '+jsonObject.sessions[0].available_capacity);
	  })
	})

	req.on('error', error => {
	  console.error(error)
	})

	req.end();
});
// send a message to the chat acknowledging receipt of their message



