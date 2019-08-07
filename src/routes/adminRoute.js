const express = require("express")

const authenticateAdminLogin = require("../expressMiddlewares/authenticateAdminLogin")
const authenticateAdminToken = require("../expressMiddlewares/authenticateAdminToken")
const Restoran = require("../models/restoran")
const cors = require("cors")

const adminRoute = new express.Router()


adminRoute.use(cors({origin : "http://localhost:3000"}))
adminRoute.use(express.json())


// ADMIN LOGIN ENDPOINT
adminRoute.post("/Login", authenticateAdminLogin, (req, res)=>{

    // GERİ DÖNDÜRÜLEN TOKEN SONRAKİ TÜM REQUEST LER İÇİN KULLANICAK
    res.status(200).send(req.token)
})

// ADMIN RESTORAN KAYIT ENDPOINT
adminRoute.post("/restorans", authenticateAdminToken, async (req, res)=>{
 
    console.log(req.body);
    
    // XHR İÇİNDE RESTORAN ADLI OBJE DE KULLANICI ADI VE ŞİFRE OLACAK
    const restoran = new Restoran(req.body.restoran)
    try{
        const kaydedilen = await restoran.save();    
        res.status(201).send(kaydedilen)
    } catch(e){
        res.status(404).send(e)
    }
})






module.exports = adminRoute