const express = require('express')
const mongoose = require("mongoose")
const URL = require('./schema')
require('dotenv').config()
const server = express()
const port = process.env.PORT || 5000
const mongoDbURI = process.env.MONGO_DB_URI
console.log(process.env.MONGO_DB_URI)
mongoose.connect(mongoDbURI,{ useNewUrlParser: true,useUnifiedTopology: true }, ()=>{console.log('connected')})


server.use(express.json())

server.get('/', (req, res)=>{
    res.send('home')
})

server.post('/shortify', async (req, res)=>{
    try{
        let doc = await URL.findOne({fullurl:req.body.url})
        if(doc){
            res.send(`shortened version already exists localhost:5000/${doc.shorturl}`)
        }else{
            let doc = await URL.create({fullurl:req.body.url})
            res.send(`localhost:5000/${doc.shorturl}`)
        }
    }catch(err){
        console.log(err)
    }
})
server.get('/:shorturl', async (req, res)=>{
    try{
        let doc = await URL.findOne({shorturl:req.params.shorturl})
        console.log(doc.count)
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

