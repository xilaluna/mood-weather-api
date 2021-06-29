import dotenv from "dotenv"
import express from "express"
import exphbs from "express-handlebars"
import axios from "axios"

dotenv.config()

const app = express()

app.engine("handlebars", exphbs())
app.set("view engine", "handlebars")

app.get("/", (req, res) => {
  res.render("home")
})

app.get("/weather", (req, res) => {
  if (req.query.location) {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${req.query.location}&units=imperial&appid=${process.env.API_KEY}`
      )
      .then((response) => {
        let weatherAspects = response.data
        let name = weatherAspects.name
        let weather = weatherAspects.weather[0].main
        let temp = weatherAspects.main.temp
        res.render("results", { name, weather, temp })
      })
      .catch(console.error)
  }
})

app.listen(3000, function () {
  console.log("Example app listening on port 3000!")
})
