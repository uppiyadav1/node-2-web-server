const request = require("request");

const getWeather = (lat, long, callback) => {
  //console.log(lat,long);
  let url = "http://api.weatherstack.com/current?access_key=dafa0027714f80260bec587a4000635d&query=" + lat + "," + long;
  let option = {
    url: url,
    json: true
  }
  request(option, (error, {body:response}={}) => {
    if (error) {
      callback("Error coming",null);
    } else {
      let data = response.current;
      callback(null,data)
    }
  });
}


module.exports = getWeather;
