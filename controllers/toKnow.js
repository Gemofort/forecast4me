'use strict';

const request = require('request');
const Telegram = require('telegram-node-bot');
let apiKey = "c62395292e6776b4da7baebcf37869b6";


class ToKnowController extends Telegram.TelegramBaseController {
  /**
   * @param {Scope} $
   */
  toKnowHandler($) {

    $.sendMessage('Write your city');
    $.waitForRequest
      .then($ => {
        console.log($.message);
        let city = $.message.text;
        let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

        request(url, (err, res, data) => {
          if (err) {
            $.sendMessage('Something went wrong');
            let username = Message.username;
            $.sendMessage(username);
          }
          else {
            let weatherInfo = JSON.parse(data);
            if (weatherInfo.hasOwnProperty('main')) {
              let message = `it\'s ${weatherInfo.main.temp}С in ${weatherInfo.name}`;
              $.sendMessage(message);
            }
            else {
              $.sendMessage('Wrong city name');
            }
          }
        });
      })
  }

  get routes() {
    return {
      'toKnowCommand': 'toKnowHandler'
    };
  }
}

module.exports = ToKnowController;
