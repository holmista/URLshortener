const express = require('express')
const mongoose = require("mongoose")
const cors = require('cors')
const URL = require('./schema')
require('dotenv').config()
const server = express()
const port = process.env.PORT || 5000
const mongoDbURI = process.env.MONGO_DB_URI
console.log(process.env.MONGO_DB_URI)
mongoose.connect(mongoDbURI,{ useNewUrlParser: true,useUnifiedTopology: true }, ()=>{console.log('connected')})

server.use(cors())
server.use(express.json())
server.set('view engine', 'ejs')
server.get('/', (req, res)=>{
    res.render('app')
})

server.post('/shortify', async (req, res)=>{
    try{
        let doc = await URL.findOne({fullurl:req.body.url})
        if(doc){
            res.send(`https://url-shorteneru.herokuapp.com/${doc.shorturl}`)
        }else{
            let doc = await URL.create({fullurl:req.body.url})
            res.send(`https://url-shorteneru.herokuapp.com/${doc.shorturl}`)
        }
    }catch(err){
        console.log(err)
    }
})
server.get('/:shorturl', async (req, res)=>{
    try{
        let doc = await URL.findOne({shorturl:req.params.shorturl})
        if(doc){
            await URL.updateOne({shorturl:req.params.shorturl}, {count:doc.count+1})
            res.redirect(doc.fullurl)
        }else{
            res.status(404).send('nonexistant')
        }
    }catch(err){
        console.log(err)
    }
    
})

server.listen(port, ()=>{
    console.log(`listening on port ${port}`)
})

