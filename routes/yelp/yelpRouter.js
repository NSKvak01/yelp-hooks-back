const express = require("express")
const router = express.Router()
let passport = require('passport')
const {getAllYelps, addYelp, deleteYelp, getYelpFromAPI} = require("./controller/yelpController")
console.log(getAllYelps)


router.get("/get-all-yelps", passport.authenticate('jwt-user', {session:false}), getAllYelps)
router.get("/get-yelp-api", getYelpFromAPI)
router.post("/add-yelp", passport.authenticate('jwt-user', {session:false}), addYelp)
router.delete("/delete-yelp/:id",passport.authenticate('jwt-user', {session:false}),deleteYelp)

module.exports = router