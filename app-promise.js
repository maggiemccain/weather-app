const yargs = require('yargs');
const axios = require('axios');  //library that marries http and promises

const argv = yargs
    .options({
        a: {
            demand: true,
            alias: 'address',
            describe: 'Address to fetch weather for',
            string: true
        }
    })
    .help() //adds help arguement
    .alias('help', 'h')
    .argv;

var encodedAddress = encodeURI(argv.address);
var geocodeUrl = `http://maps.google.com/maps/api/geocode/json?address=${encodedAddress}`;

axios.get(geocodeUrl).then((response) => {
    if (response.data.status === 'ZERO_RESULTS') {
        throw new Error('Unable to find that address.'); //throwing the error, sends the error to catch
    }
    var lat = response.data.results[0].geometry.location.lat;
    var lng = response.data.results[0].geometry.location.lng;
    var weatherUrl= `https://api.darksky.net/forecast/7bb8bef0ae21f57ec6c74c26028fa176/${lat},${lng}`;
    console.log(response.data.results[0].formatted_address)
    return axios.get(weatherUrl);
}).then((response) => {
    console.log(`It's currently ${response.data.currently.temperature} , but feels like ${response.data.currently.apparentTemperature}.`);
}).catch((e) => {
    if (e.code === 'ENOTFOUND') {
        console.log('Unable to connect to API servers.');
    } else {
        console.log(e.message);
    }
});

// benefits: chaining vs nesting- easier to read and maintain