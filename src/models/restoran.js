const mongoose = require("mongoose")
const validator = require("validator")
const bcryptjs = require("bcryptjs")

const restoranSchema = new mongoose.Schema({
    username : {
        type : String,
        unique : true,
        validate (value){
            if(!validator.isEmail(value)){
                throw new Error("Geçersiz bir email adresi kullandınız")
            }
        },
        trim : true,
        required : true,
    },
    password : {
        type : String,
        required : true,
        minlength : 6
    },
    tokens : [{
        token : {
            type : String
        }
    }]
})
restoranSchema.pre("save", async function(next){
    const restoran = this
    
    if(restoran.isModified("password")){
        restoran.password = await bcryptjs.hash(restoran.password,8)
    }
    next()
})

const Restoran = mongoose.model("Restoran", restoranSchema)


module.exports = Restoran