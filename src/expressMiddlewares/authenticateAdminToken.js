const jwt = require("jsonwebtoken")
const restoran = require("../models/restoran")

const autheticateAdminToken = (req, res, next) =>{

    console.log("authentication içindeyiz...")
    try{
        if(!req.header("Authorization")){
            console.log("header yok")
            throw new Error("Lütfen şifre ve kullanıcı adınız ile giriş yapın...")
        }
        
        // TOKEN I AÇDIK. DECODED OLARAK KULLANICI ADINI ALACAĞIZ.SONRA VERİTABANINDA 
        // KULLANICI ADIYLA BİRLİKTE TOKEN IN DA VARLIĞINI KONTROL EDEREK DEVAM EDECEĞİZ.
        const decoded = jwt.verify(req.header("Authorization"),"MayGodBlessInnocents")
        
        if(!decoded.username === "admin"){
            console.log("token sorunu")
            throw new Error("Lütfen giriş yapınız.")
        }
        
        next()

    } catch(e){
        console.log(e)
        res.status(400).send(e)
    }
}


module.exports = autheticateAdminToken