const request = require("request");

const getLocation = (param1, callback) => {
  let geoCodeUrl = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + param1 + ".json/?limit=1&access_token=pk.eyJ1IjoidXBlbmRyYXlhZGF2MTk5MSIsImEiOiJja2Z4a2dyeGEyMHNjMnJtemMzdnczNHFzIn0.u1zasAJXB78eLM8LIYB57g";
  console.log(geoCodeUrl);
  let option = {
    url: geoCodeUrl,
    json: true
  }
  request(option, (err, {body:res}={}) => {
    let jsObj = {
      lat:null,
      long : null
    }

    if (err || res["message"]) {
      callback("Error coming", jsObj);
      console.log(err);
    } else if(!res["message"]){
      console.log("checking new variables",res);
      jsObj["lat"] = res["features"][0]["center"][1];
      jsObj["long"] =res["features"][0]["center"][0];
      callback(null, jsObj);
    }
  });
}

module.exports = getLocation
