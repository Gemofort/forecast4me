'use strict';

const Telegram = require('telegram-node-bot');
const BOT_TOKEN = '682525033:AAFIzSulcl_pWCMDgYAcrma8x_s9Gt92T18';
const tg = new Telegram.Telegram(BOT_TOKEN, {
  workers: 1
});


let apiKey = "c62395292e6776b4da7baebcf37869b6";
const request = require('request');
const chatId = '406575406';
const date = require('date-and-time');
let city = 'Kiev';
let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;


const ToKnowController = require('./controllers/toKnow');

tg.router
  .when(
    new Telegram.TextCommand('/weather', 'toKnowCommand'),
    new ToKnowController()
  );

setInterval(() => {
  request(url, (err, res, data) => {
    if (err) {
      tg.onMaster(() => {
        tg.api.sendMessage(chatId, 'oooooooooopsie something went wrong');
      });
    }
    else {
      let now = new Date();
      let time = date.format(now, 'H:mm:ss');
      if (time === '8:00:00' || time === '18:00:00') {
        let weatherInfo = JSON.parse(data);
        let message = `It's ${weatherInfo.main.temp}C in ${weatherInfo.name} at ${time}`;

        tg.onMaster(() => {
          tg.api.sendMessage(chatId, message);
        });
      }
    }
  });

}, 1000);
