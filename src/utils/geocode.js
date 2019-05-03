const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1IjoiYXJ1bjkxNSIsImEiOiJjanVzY2g2eTgwcmczNDlxdWd0ZzI2eGwwIn0.DeQvl7ArkOBi9xnUz6mGlw";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to geode service", undefined);
    } else if (body.features.length === 0) {
      callback("Unable to find location", undefined);
    } else {
      callback(undefined, {
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
      });
    }
  });
};

module.exports = geocode;
