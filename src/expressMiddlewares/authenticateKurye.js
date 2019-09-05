const jwt = require("jsonwebtoken")
const Kurye = require("../models/kurye")
const bcryptjs = require("bcryptjs")


const authenticateKurye = async (req, res, next) =>{

    const kurye = await Kurye.findOne({kullaniciAdi : req.body.username})

    try{
        if(!kurye){
            throw new Error("Kullanıcı adı veya şifre yanlış")
        }
        
        const isMatch = await bcryptjs.compare(req.body.password, kurye.password)

        if(!isMatch){
            throw new Error("Kullanıcı adı veya şifre yanlış")
        }
        const kuryeToken = jwt.sign({username : req.body.username},"MayGodBlessInnocents",{expiresIn:"1 day"})
        req.kuryeToken = kuryeToken
        kurye.tokens = kurye.tokens.concat({token:kuryeToken})
        await kurye.save()
        
    } catch(e){
        console.log(e)
        res.status(404).send("Kullanıcı adı veya şifre yanlış")
    }
    next()
}


module.exports = authenticateKurye