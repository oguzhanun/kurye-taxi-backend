const express = require("express")
const cors = require("cors")
const authenticateRestoran = require("../expressMiddlewares/authenticateRestoran")
const restoranTokenCheck = require("../expressMiddlewares/restoranTokenCheck")



const restoranRoute = new express.Router()

restoranRoute.use(cors({origin : "http://localhost:3000"}))
restoranRoute.use(express.json())


restoranRoute.post("/login",authenticateRestoran, (req, res)=>{

    res.send(req.RestoranToken)
})

restoranRoute.post("/kuryeCagrisi", restoranTokenCheck, (req,res)=>{

    //console.log("-----restoran : ",req.restoran, " -----token :",req.restoranToken)
    res.send("ok")
})


module.exports = restoranRoute









module.exports = restoranRoute