const { andObj, toshObj, calendar } = require("./data.js")
// const token = process.env.TOKEN;
const token = "1278065794:AAG4ykSkz9FV5f8oXGNWu8gecbCMn3uHhSo"
const Bot = require('node-telegram-bot-api');
let bot;

if(process.env.NODE_ENV === 'production') {
  bot = new Bot(token);
  bot.setWebHook(process.env.HEROKU_URL + bot.token);
}
else {
  bot = new Bot(token, { polling: true });
}

console.log('Bot server started in the ' + process.env.NODE_ENV + ' mode');

bot.onText(/\/echo (.+)/, (msg, match) => {
  const chatId = msg.chat.id;
  const resp = match[1];
  bot.sendMessage(chatId, resp);
});

bot.on('message', (msg) => {
	console.log(msg)
	if (msg.text == "/start" || msg.text == "Bosh menyu"){
      bot.sendMessage(msg.chat.id, `Assalomu alaykum, ${msg.chat.first_name}.\nNimalarni bilishni istaysiz??`, {
         "reply_markup": {
            "keyboard": [["Ob-havo"], ["Kalendar"], ["Bot yaratuvchisi haqida"]],
            "resize_keyboard": true
         },
      });
}
   if (msg.text == "Ob-havo" || msg.text == "Orqaga" ) {
      bot.sendMessage(msg.chat.id, "Joyni tanlang", {
         "reply_markup": {
            "keyboard": [["Toshkent"], ["Andijon"], ["Bosh menyu"]],
            "resize_keyboard": true
         },
      })
   }
   if (msg.text == "Toshkent") {
      bot.sendMessage(msg.chat.id,` ${toshObj.time}
         \nToshkent shahridagi ob-havo ma'lumotlari: 
         \nHarorat: ${toshObj.temp} \nHolat: ${toshObj.weat} \nNamlik: ${toshObj.humidity} \nHavo-bosim: ${toshObj.pressure}`, {
         "reply_markup": {
            "keyboard": [["Bosh menyu"], ["Orqaga"]],
            "resize_keyboard": true
         },
      })
   }
   if (msg.text == "Andijon") {
      bot.sendMessage(msg.chat.id, ` ${andObj.time}
         \nAndijon viloyatidagi ob-havo ma'lumotlari: 
         \nHarorat: ${andObj.temp} \nHolat: ${andObj.weat} \nNamlik: ${andObj.humidity} \nHavo-bosim: ${andObj.pressure}`, {
         "reply_markup": {
            "keyboard": [["Bosh menyu"], ["Orqaga"]],
            "resize_keyboard": true
         },
      })
   }
   if (msg.text == "Kalendar") {
      bot.sendMessage(msg.chat.id, `Yil: ${calendar.Yil} \nSana: ${calendar.Sana} \nHafta: ${calendar.Hafta} \nVaqt: ${calendar.Vaqt}`, {
         "reply_markup": {
            "keyboard": [["Bosh menyu"]],
            "resize_keyboard": true
         }
      })
   }
   if ( msg.text == "Bot yaratuvchisi haqida" ) {
      bot.sendMessage(msg.chat.id, `Ism: MuhammadHusayn \nFamiliya: Olimjonov \nTug. yili: 23/03/2002 \nYosh: 18 \nTug'. joyi: Baliqchi, Andijon \nKasbi: Dasturchi \nTelegram: @donishmand23`, {
         "reply_markup": {
            "keyboard": [["Rasmini ko'rish"], ["serifikatini ko'rish"], ["Bosh menyu"], ],
            "resize_keyboard": true
         }
      })
   }
   if ( msg.text == "Rasmini ko'rish") {
      bot.sendPhoto(msg.chat.id, "https://scontent.ffru2-1.fna.fbcdn.net/v/t1.0-9/p960x960/65870431_126809595202142_7303354800358293504_o.jpg?_nc_cat=111&_nc_sid=dd7718&_nc_ohc=09gs3Ktv__UAX_EpLE7&_nc_ht=scontent.ffru2-1.fna&_nc_tp=6&oh=75905c5c330198790563197ade0bdfe3&oe=5EC81E47")
   }
   if ( msg.text == "serifikatini ko'rish") {
      bot.sendPhoto(msg.chat.id, "https://scontent.ffru2-1.fna.fbcdn.net/v/t1.0-9/s960x960/86483853_188960028987098_1826058766697627648_o.jpg?_nc_cat=102&_nc_sid=dd7718&_nc_ohc=P-YaFgOkyIYAX9Im19B&_nc_ht=scontent.ffru2-1.fna&_nc_tp=7&oh=605479b748fca5988233f60b23194474&oe=5ECBC006")
   }
});

