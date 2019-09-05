const mongoose = require("mongoose")
const ObjectID = require("mongodb").ObjectID

const kuryeTalebiSchema = new mongoose.Schema({
    restoranName:{
        type: String,
        required : true,
    },
    adres:{
        type : String,
        required : true
    },
    atamaDurumu : {
        type : Boolean,
        default : false
    },
    atananKurye : {
        type : String,
        default : ""
    },
    talepZamanı : {
        type : String,
        default : new ObjectID(new Date().getTime()/1000).getTimestamp().toString()
    },
    atamaZamanı : {
        type : Date
    }
})

const kuryeTalebi = mongoose.model("KuryeTalebi", kuryeTalebiSchema)

module.exports = kuryeTalebi