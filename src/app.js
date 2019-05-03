const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

// Dfine path for express congiguration
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebar engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

// setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  return res.render("index", {
    title: "Weather app",
    name: "Arun Pratap"
  });
});

app.get("/about", (req, res) => {
  return res.render("about", {
    title: "About us page",
    name: "Arun Pratap"
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({ error: "please provide addresss" });
  }

  const address = req.query.address;

  geocode(address, (error, { latitude, longitude, location } = {}) => {
    if (error) {
      return res.send({ error });
    }
    forecast(latitude, longitude, (error, { summary, temprature, rain }) => {
      if (error) {
        return res.send({ error });
      }
      // console.log(location);
      //console.log({ summary: summary, temprature: temprature, rain: rain });
      res.send({
        location: location,
        summary: summary,
        temprature: temprature,
        rain: rain
      });
    });
  });
});

app.get("*", (req, res) => {
  return res.render("404", {
    title: "Page not found",
    name: "Arun Pratap"
  });
});

app.listen(3000, () => {
  console.log("server is up on port 3000");
});
