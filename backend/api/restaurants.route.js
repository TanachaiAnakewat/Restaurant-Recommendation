import express from "express"
import RestaurantsCTRL  from "./restaurants.controller.js"
import ReviewsCTRL from "./reviews.controller.js"

const router = express.Router()

router.route("/").get(RestaurantsCTRL.apiGetRestaurants)
router.route("/id/:id").get(RestaurantsCTRL.apiGetRestaurantsById)
router.route("/cuisines").get(RestaurantsCTRL.apiGetRestaurantsCuisines)

router.route("/review")
    .post(ReviewsCTRL.apiPostReview)
    .put(ReviewsCTRL.apiUpdateReview) 
    .delete(ReviewsCTRL.apiDeleteReview) 

export default router