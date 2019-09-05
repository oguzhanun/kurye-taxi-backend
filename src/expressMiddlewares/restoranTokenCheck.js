const jwt = require("jsonwebtoken")
const Restoran = require("../models/restoran")


const restoranTokenCheck = async (req,res,next) => {

    try{
        const token = req.get("Authorization")
        //console.log(token)
        const decodedToken = jwt.verify(token,"MayGodBlessInnocents")
        const restoran = await Restoran.findOne({username:decodedToken.username, "tokens.token":token})
        //console.log(restoran)

        if(!restoran){
            throw new Error()
        }
        req.restoran = restoran
        req.restoranToken = token
        next()
    } 
    catch(e){
        res.status(401).send({error:"please authenticate!"})
    }

}

module.exports = restoranTokenCheck