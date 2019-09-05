const mongoose = require("mongoose")
const validator = require("validator")
const bcryptjs = require("bcryptjs")


const KuryeSchema = new mongoose.Schema({
    kuryeAdi :{
        type : String,
        required : true
    },
    kullaniciAdi : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    dogumTarihi : {
        type : Date
    },
    cinsiyet : {
        type : String
    },
    telefonNumarasi : {
        type : String
    },
    tokens : [{
        token : {
            type : String
        }
    }]
})

KuryeSchema.pre("save", async function(next){
    const kurye = this
    
    if(kurye.isModified("password")){
        kurye.password = await bcryptjs.hash(kurye.password,8)
    }
    next()
})

const Kurye = mongoose.model("Kurye", KuryeSchema)

module.exports = Kurye