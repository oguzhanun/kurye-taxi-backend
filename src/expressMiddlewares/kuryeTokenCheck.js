const jwt = require("jsonwebtoken")
const Kurye = require("../models/kurye")


const kuryeTokenCheck = async (req,res,next) => {

    try{
        const token = req.get("Authorization")
        
        const decodedToken = jwt.verify(token,"MayGodBlessInnocents")
        const kurye = await Kurye.findOne({kullaniciAdi:decodedToken.username, "tokens.token":token})
        
        if(!kurye){
            throw new Error()
        }
        req.kurye = kurye
        req.kuryeToken = token
        next()
    } 
    catch(e){
        res.status(401).send({error:"please authenticate!"})
    }

}

module.exports = kuryeTokenCheck