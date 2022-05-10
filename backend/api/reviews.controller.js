import ReviewsDAO from "../dao/reviewsDAO.js"

export default class ReviewsCTRL{
    static async apiPostReview(req, res, next) {
        try {
          const restaurantId = req.body.restaurant_id
          const review = req.body.text
          const userInfo = {
            name: req.body.name,
            _id: req.body.user_id
          }
          const date = new Date()
    
          const ReviewResponse = await ReviewsDAO.addReview(
            restaurantId,
            userInfo,
            review,
            date,
          )
          res.json({ status: "success" })
        } catch (e) {
          res.status(500).json({ error: e.message })
        }
      }

    static async apiUpdateReview(req,res, next){
        try{
            const reviewID = req.body.review_id
            const text = req.body.text
            const date = new Date()

            const reviewResponse = ReviewsDAO.updateReview(
                reviewID,
                req.body.user_id,
                text,
                date,
            )

            var {error} = reviewResponse
            if(error){
                res.status(400).json({error})
            }

            if(reviewResponse.modifiedCOunt === 0){
                throw new Error(
                    "unable to update review - user may not be original poster",
                )
            }
            res.json({ status: "success" })
        }catch (err){
            res.status(500),json({error: err.message})
        }
    }

    static async apiDeleteReview(req,res,next){
        try{
            const reviewID = req.query.id
            const userID = req.body.user_id /*more auth protocol in real world */
            console.log(reviewID)
            const reviewResponse = await ReviewsDAO.deleteReview(
                reviewID,
                userID,
            )
            res.json({status:"success"})
        } catch(err){
            res.status(500).json({error: err.message})
        }
    }
}