const express = require("express")
const cors = require("cors")


const restoranRoute = new express.Router()

restoranRoute.use(cors({origin : ["http://127.0.0.1:3000", "http://127.0.0.1:3030"]}))
restoranRoute.use(express.json())











module.exports = restoranRoute