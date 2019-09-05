const express = require("express")
require("./db/mongoose")
const restoranRoute = require("./routes/restoranRoute")
const adminRoute = require("./routes/adminRoute")
const cors = require("cors")
const socketio = require("socket.io")
const http = require("http")
const KuryeTalebi = require("./models/kuryeTalebi")
const kuryeRoute = require("./routes/kuryeRoute")

const app = express()

// İKİ AYRI ROUTE ÜST ÜSTE OLUNCA ALTTAKİ ROUTE U ÇALIŞTIRMADI. CORS HATASI VERDİ...
// DAHA SONRA İLK PARAMETRE OLARAK FARKLI FARKLI ROUTE LAR GİRİNCE SORUN ORTADAN KALKTI
// BU DEFA DA BURAYA GİRİLEN PARAMETRE GENEL ROUTE ENDPOINT İNE DE ETKİ EDİYOR. TÜM 
// ROUTE LAR BURADA YAZILAN ROUTE EKLENEREK BELİRLENİYOR...
app.use("/restorans", restoranRoute)
app.use("/admin", adminRoute)
app.use("/kurye", kuryeRoute)
app.use(cors())

const server = http.createServer(app)
const io = socketio(server)

io.on("connection",(socket)=>{
    console.log("connection established...")
    //console.log(socket.handshake.headers.referer)
    console.log("--Socket_id : ",socket.id)

    socket.emit("console","hello-socket",(msg)=>{
        console.log(msg)
    })

    socket.on("kuryeTalebi",(message, callback)=>{
        if(!message){
            callback("error")
        }

        //message.talepZamanı = new Date.now()
        /** kurye talebi veritabanına kaydediliyor. */
        const kuryeTalebi = new KuryeTalebi(message)

        kuryeTalebi.save()

        callback("TALEBİNİZ ALINMIŞTIR, HEMEN GELİYORUZ.")
        
        /** socket admin isimli odaya kurye istegi mesajını gönderiyor. */
        socket.to("admin").emit("kuryeIstegi",message)
    })

    socket.on("join", (credentials)=>{
        if(credentials.username === "admin"){  
            if(credentials.password ==="1234"){
                socket.join("admin")
                socket.emit("message", "Welcome Mr. Admin")
            }
        } 
        else {
            socket.join(credentials.username)
            socket.to(credentials.username).emit("message", `Welcome ${credentials.username}`)
        }
    })

    socket.on("atama", async (atamaMsg, callback)=>{
        console.log(atamaMsg)
        await KuryeTalebi.findOneAndUpdate({_id : atamaMsg._id},{
            atamaDurumu : atamaMsg.atamaDurumu,
            atananKurye : atamaMsg.atananKurye,
            atamaZamanı : atamaMsg.atamaZamanı
        } )
        socket.to(atamaMsg.atananKurye).emit("atama",{adres : atamaMsg.adres, restoran : atamaMsg.restoranName})
        callback("ok")
    })
})

const port = process.env.PORT || 8000;


server.listen(port,()=>{
    console.log("server is up and running on port " + port)
})
