require("dotenv").config()
import express from "express"
import handlebars from "express-handlebars"

const app = express()

app.set('view engine')