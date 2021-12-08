const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../errors/asyncErrorBoundary");


async function list(req, res, next) {
    const isShowing = req.query.is_showing;
    if(isShowing == "true") {
        res.json({data: await moviesService.listShowing()})
    } 
    const data = await moviesService.list();
    res.json({data});
    
}

async function movieExists(req, res, next) {
    const movie = await moviesService.read(req.params.movieId);
    
    if (movie) {
      res.locals.movie = movie;
      return next();
    }
   
    return next({ status: 404, message: "Movie cannot be found."})
  }


async function read (req, res, next) {
    
    res.json({ data: res.locals.movie }) 

}

async function listTheatersWhereMovieIsPlaying(req, res, next){
    
    res.json({ data: await moviesService.listTheatersWhereMovieIsPlaying(res.locals.movie.movie_id)})
}

async function listReviews(req, res, next) {
    const {movie_id} = res.locals.movie
    const data = await moviesService.listReviews(movie_id)
   
    res.json({data})

}

module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieExists),read],
    listTheatersWhereMovieIsPlaying:[asyncErrorBoundary(movieExists), asyncErrorBoundary(listTheatersWhereMovieIsPlaying)],
    listReviews:[asyncErrorBoundary(movieExists), asyncErrorBoundary(listReviews)]
}