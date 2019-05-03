const request = require("request");
const forecast = (lat, long, callback) => {
  const url =
    "https://api.darksky.net/forecast/cff8fd26c7f59072bbffea8feb7d1e8c/" +
    lat +
    "," +
    long +
    "?units=si&lang=en";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Can not connect to forcast api", undefined);
    } else if (body.error) {
      callback("The given latitude and longitude are invalid", undefined);
    } else {
      callback(undefined, {
        summary: body.daily.data[0].summary,
        temprature: body.currently.temperature,
        rain: body.currently.precipProbability
      });
    }
  });
};

module.exports = forecast;
