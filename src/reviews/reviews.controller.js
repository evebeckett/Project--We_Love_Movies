const reviewsService = require("./reviews.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


async function read (req, res, next) {
    
    res.json({ data: res.locals.review }) 

}


async function reviewExists(req, res, next) {
    const review = await reviewsService.read(req.params.reviewId);
    
    if (review) {
      res.locals.review = review;
      return next();
    }
   
    return next({ status: 404, message: "Review cannot be found."})
  }

async function destroy(req, res, next) {
    const { review } = res.locals
    await reviewsService.delete(review.review_id);
    res.sendStatus(204);

}

async function update(req, res,next) {
    const updatedReview = {
        ...req.body.data,
        review_id: res.locals.review.review_id,
    };

    const data = await reviewsService.update(updatedReview);
    console.log(data);
    const criticInfo =  await reviewsService.readCritic(data.critic_id)
    data.critic = criticInfo[0]
    res.json({data});
}


  module.exports = {
    delete: [
        asyncErrorBoundary(reviewExists), 
        asyncErrorBoundary(destroy)
    ],
    read: asyncErrorBoundary(read),
    update: [
        asyncErrorBoundary(reviewExists),asyncErrorBoundary(update),
    ]
  } 