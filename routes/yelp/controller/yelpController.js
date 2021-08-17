const Yelp = require("../model/Yelp")
const axios =require("axios")
const User = require("../../user/model/User")
const NodeGeocoder = require('node-geocoder');


const getYelpFromAPI = async(req,res)=>{
    try {
        const options = {
            provider: 'google',
            apiKey:"AIzaSyCdAXrSUCttrQfvOqe64AL0OKoe5vVshvg"
          };
           
          const geocoder = NodeGeocoder(options);
           
          // Using callback
          const coordinates = await geocoder.geocode(`${req.query.address}`);
          console.log(coordinates[0].latitude)
        let payload = await axios.get(`https://api.yelp.com/v3/businesses/search?term=${req.query.term}&latitude=${coordinates[0].latitude}&longitude=${coordinates[0].longitude}`, {
            headers: {
                'Authorization': `Bearer ${process.env.YELP_API_KEY}` 
            }
          })
          console.log(payload.data)
        res.json(payload.data)
    } catch (error) {
        console.log(error)
        res.status(500).json({error:error, message:error.message})
    }
}

const getAllYelps = async(req,res)=>{
    try {
        let payload = await User.findOne({username:decodedJwt.username})
            .populate({
                path:"yelp",
                model:Yelp,
                select:"-__v"
            })
            .select ("-email -password -firstName -lastName -__v -_id -username")
        res.json(payload)
    } catch (error) {
        res.status(500).json({error:error, message:error.message})
    }
}

const addYelp = async(req,res)=>{
    try {
        const {name, image, url, phone, rating, price, reviews} = req.body
        const newYelp = new Yelp({
            name, 
            image,
            url, 
            phone, 
            rating, 
            price, 
            reviews
        })
        const savedYelp = await newYelp.save()
        const foundUser = await User.findOne({username:decodedJwt.username})
        foundUser.yelp.push(savedYelp._id)
        await foundUser.save()
        res.json(savedYelp)
    } catch (error) {
        console.log(error)
        res.status(500).json({error:error, message:error.message})

    }
}

const deleteYelp = async (req,res)=>{
    try {
        let deletedYelp = await Yelp.findByIdAndDelete(req.params.id)
        let foundUser = await User.findOne({username:decodedJwt.username})
        filteredYelp = foundUser.yelp.filter((item)=>{
            if(item._id.toString()!== req.params.id){
                return item
            }
        })
        foundUser.yelp = filteredYelp
        await foundUser.save()
        res.json(deletedYelp)
    } catch (error) {
        res.status(500).json({error:error, message:error.message})
        
    }
}

module.exports = {
    getAllYelps,
    addYelp,
    deleteYelp,
    getYelpFromAPI
}