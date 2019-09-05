const jwt = require("jsonwebtoken")
const Restoran = require("../models/restoran")
const bcryptjs = require("bcryptjs")


const authenticateRestoran = async (req, res, next) =>{

    const restoran = await Restoran.findOne({username : req.body.username})

    //console.log(restoran)

    try{
        if(!restoran){
            throw new Error("Kullanıcı adı veya şifre yanlış")
        }
        
        const isMatch = await bcryptjs.compare(req.body.password, restoran.password)

        if(!isMatch){
            throw new Error("Kullanıcı adı veya şifre yanlış")
        }
        // JWT İLE TOKEN ÜRETİLECEK VE KULLANICIYA GERİ DÖNDÜRÜLECEK.
        // AYNI ZAMANDA BU TOKEN VERİ TABANINA DA YAZILACAK. 
        // SONRAKİ TÜM İŞLEMLERDE TOKEN VAR MI YOK MU SORGULANACAK...
        
        const RestoranToken = jwt.sign({username : req.body.username},"MayGodBlessInnocents",{expiresIn:"1 day"})
        
        req.RestoranToken = RestoranToken
        
        //console.log(RestoranToken)
        
        /*********** concat array leri merge ediyor. */
        restoran.tokens = restoran.tokens.concat({token:RestoranToken})
        
        /********* push metodu geriye dizinin uzunluğunu döndürüyor. yeni oluşturduğu array i değil
         * ve array i değiştirdiğini de unutmamak gerekiyor...
          */
        //restoran.tokens = restoran.tokens.push({token:RestoranToken})

        //console.log(restoran)
        
        /********** bu şekilde önceki tokenlar silinip yerine sadece bir tane token yazılıyor. dizi içindeki
        diğer tokenlar iptal ediliyor ***********/
        //await Restoran.findOneAndUpdate({username:req.body.username},{tokens:[{token:RestoranToken}]})
        
        
        await restoran.save()
        //await restoran.updateOne({tokens:{"$push":{"token" : RestoranToken}}})

    } catch(e){
        console.log(e)
        res.status(404).send("Kullanıcı adı veya şifre yanlış")
    }
    next()
}


module.exports = authenticateRestoran