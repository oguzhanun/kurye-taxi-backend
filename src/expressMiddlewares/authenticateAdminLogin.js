const jwt = require("jsonwebtoken")


const authenticateAdminLogin = (req, res, next) => {
    
    try {
        if(!req.body.username === "admin"){
            throw new Error()
        }
        if(!req.body.password === "1234"){
            throw new Error()
        }
    } catch(e){
        res.status(400).send("Yanlış kullanıcı adı veya şifre...")
    }

    try{
        const token = jwt.sign({username : "admin"}, "MayGodBlessInnocents",{expiresIn:"1 day"})
        req.token = token
        
    } catch(e){
        res.status(400).send("Bir hata oluştu...")
    }
    next()
}

module.exports = authenticateAdminLogin