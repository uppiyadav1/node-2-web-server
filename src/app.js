const express = require("express");
const path = require("path");
const hbs = require("hbs");
const app = new express();

const getLocation = require("./utils/getlocation");
const getWeather = require("./utils/getweather");

let publicDirectoryPath = path.join(__dirname, "../public");
let viewsDirectory = path.join(__dirname,"../templates/views");
let partialsDirectory = path.join(__dirname,"../templates/partials");
//console.log("partials ---",partialsDirectory)


app.set("view engine","hbs");
app.set("views",viewsDirectory);
hbs.registerPartials(partialsDirectory);

app.use(express.static(publicDirectoryPath));

app.get("/weather", (req, res)=>{
    let address = req.query.search
  getLocation(address,(errorResponse, {lat,long}={})=>{
    if(errorResponse != null){
      console.log("ok",errorResponse);
    }else{
      console.log("checking",lat,long);
      getWeather(lat,long,(errorRes,successRes)=>{
        if(errorRes != null){
          console.log("Error persist");
          return res.status(500).send("").end();
        }else{
          return res.send(successRes).end();
          console.log("the response is",successRes);
        }
      })
    }
  });
});


app.get("", (req,res)=>{
  console.log("test file");
  res.render("index",{
    title : "Weather",
    name : "Andrew Mead"
  });
})

app.get("/help", (req, res)=>{
  console.log("test file");
  res.render("help",{
    title : "Help"
  });
});

app.get("/about", (req, res)=>{
  console.log("test file");
  res.render("about",{
    title : "About Me"
  });
});


app.get("/help/*", (req, res)=>{
  res.render(404, {
    title : "Page not found",
    errorMessage : "404 Help Article not found!"
  })
})

app.get("*", (req, res)=>{
  res.render("404",{
    title : "Page not found",
    errorMessage : "404 Page not found!"
  })
})

app.listen(3000, () => {
  console.log("I am running on port 3000");
})