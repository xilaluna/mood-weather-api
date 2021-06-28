import dotenv from "dotenv"
import express, { response } from 'express'
import exphbs from 'express-handlebars'
import axios from 'axios'

dotenv.config()

const app = express()

app.engine('handlebars', exphbs())
app.set('view engine', 'handlebars')

app.get('/', (req, res) => {
  res.render('home')
})

app.get('/weather', (req, res) => {
  if(req.query.location) {
    axios.get(`api.openweathermap.org/data/2.5/weather?q=${req.query.location}&units=imperial&appid=${process.env.API_KEY}`)
    .then((response) => {
      let weatherAspects = response
      console.log('hello')
      res.render("results", {weatherAspects})
    })
    .catch(console.error)
  }
}) 

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
})