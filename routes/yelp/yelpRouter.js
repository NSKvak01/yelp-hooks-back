const express = require("express")
const router = express.Router()
const {getAllYelps, addYelp, deleteYelp, getYelpFromAPI} = require("./controller/yelpController")
console.log(getAllYelps)


router.get("/get-all-yelps", getAllYelps)
router.get("/get-yelp-api",getYelpFromAPI)
router.post("/add-yelp", addYelp)
router.delete("/delete-yelp/:id",deleteYelp)

module.exports = router