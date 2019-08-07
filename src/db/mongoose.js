const mongoose = require("mongoose")

// ./mongod --dbpath ~/mongo-data

mongoose.connect("mongodb://127.0.0.1:27017/Kurye-Taxi-DB",{
    useNewUrlParser : true,
    useCreateIndex : true,
    useFindAndModify : false    
})