const express = require("express")
require("./db/mongoose")
const restoranRoute = require("./routes/restoranRoute")
const adminRoute = require("./routes/adminRoute")
const cors = require("cors")


const app = express()

// İKİ AYRI ROUTE ÜST ÜSTE OLUNCA ALTTAKİ ROUTE U ÇALIŞTIRMADI. CORS HATASI VERDİ...
// DAHA SONRA İLK PARAMETRE OLARAK FARKLI FARKLI ROUTE LAR GİRİNCE SORUN ORTADAN KALKTI
// BU DEFA DA BURAYA GİRİLEN PARAMETRE GENEL ROUTE ENDPOINT İNE DE ETKİ EDİYOR. TÜM 
// ROUTE LAR BURADA YAZILAN ROUTE EKLENEREK BELİRLENİYOR...
app.use("/restorans", restoranRoute)
app.use("/admin", adminRoute)
app.use(cors())

const port = process.env.PORT || 8000;


app.listen(port,()=>{
    console.log("server is up and running on port " + port)
})
