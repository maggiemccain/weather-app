// 7bb8bef0ae21f57ec6c74c26028fa176
const request = require('request');

var getWeather = (lat, lng, callback) => {
    request({
        url: `https://api.darksky.net/forecast/7bb8bef0ae21f57ec6c74c26028fa176/${lat},${lng}`,
        json: true // adds to headers that we want to get json back
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Forecast.io server');
        } else if (response.statusCode === 400) {
            callback('Unable to fetch weather');
        } else if (response.statusCode === 200) {
            callback(undefined, {
                temperature: body.currently.temperature,
                actualTemperature: body.currently.apparentTemperature
            })
        }
    });
}

module.exports.getWeather = getWeather;