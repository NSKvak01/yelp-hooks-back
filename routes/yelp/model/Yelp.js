const mongoose = require("mongoose")

let yelpSchema = new mongoose.Schema({
    name:{
        type:String
    },
    image:{
        type:String
    },
    url:{
        type:String
    },
    phone:{
        type:String
    },
    rating:{
        type:Number
    },
    price:{
        type:String
    },
    reviews:{
        type:Number
    },
    location:{
        type:String
    }
})

module.exports = mongoose.model("yelp", yelpSchema)