const express = require("express")
const cors = require("cors")
const authenticateKurye = require("../expressMiddlewares/authenticateKurye")
const kuryeTokenCheck = require("../expressMiddlewares/kuryeTokenCheck")
const KuryeTalepleri = require("../models/kuryeTalebi")


const kuryeRoute = new express.Router()

kuryeRoute.use(cors({origin : "http://localhost:3000"}))
kuryeRoute.use(express.json())


kuryeRoute.post("/login",authenticateKurye, (req, res)=>{

    res.send(req.kuryeToken)
})

kuryeRoute.post("/kuryeCagrisi", kuryeTokenCheck, (req,res)=>{

    res.send("ok")
})

/* kendi sayfasına giren kurye için yapılan talepleri gönderiyoruz */
kuryeRoute.post("/kuryeTalepleri/:kuryeAdi", kuryeTokenCheck, async (req,res)=>{
    console.log("talepleri veritabanından çek...")

    const talepler = await KuryeTalepleri.find({atananKurye : req.params.kuryeAdi }).sort({atamaZamanı:-1})
    res.send(talepler)
})

module.exports = kuryeRoute