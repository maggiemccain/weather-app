const request = require('request');

var geocodeAddress = (address, callback) => {
    var encodedAddress = encodeURI(address)
    // options object
    request({
        url: `http://maps.google.com/maps/api/geocode/json?address=${encodedAddress}`,
        json: true // adds to headers that we want to get json back
    }, (error, response, body) => {
        if (error) {
            callback('Unable to connect to Google servers.');
        } else if (body.status === 'ZERO_RESULTS') {
            callback('Unable to find that address.');
        } else if (body.status === 'OK') {
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng
            });
        }
    });
};


module.exports = {
    geocodeAddress
}