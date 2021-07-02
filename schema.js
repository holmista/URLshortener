const mongoose = require("mongoose")
const shortid = require("shortid")

const URLschema = new mongoose.Schema({
    fullurl:{
        type:String,
        required:true
    },
    shorturl:{
        type:String,
        required:true,
        default:shortid.generate
    },
    count:{
        type:Number,
        required:true,
        default:0
    }
})
const URL = mongoose.model('URLs', URLschema)


module.exports = URL