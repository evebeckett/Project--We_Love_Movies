const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties")

function list() {
    return knex("movies").select("*");
}

function listShowing() {
    return knex("movies as m")
        .join("movies_theaters as mt", "m.movie_id", "mt.movie_id")
        .distinct("m.*")
        .where({"mt.is_showing": true});
}


function read(movie_id) {
    return knex("movies as m")
      .select("*")
      .where({ "m.movie_id": movie_id })
      .first()
  }

function listTheatersWhereMovieIsPlaying(movie_id) {
    return knex("movies as m")
        .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
        .join("theaters as t","t.theater_id", "mt.theater_id")
        .select("t.*")
        .where({"m.movie_id": movie_id})
}

const addCritic = mapProperties({
    critic_id: "critic.critic_id",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    organization_name: "critic.organization_name",
    created_at: "critic.created_at",
    updated_at: "critic.updated_at",
})

function listReviews(movie_id){
    return knex("reviews as r")
        .join("critics as c", "c.critic_id", "r.critic_id")
        .select("c.*", "r.*")
        .where({"r.movie_id": movie_id})
        .then(reviews => reviews.map(addCritic))
}

module.exports = {
    list,
    listShowing,
    read,
    listTheatersWhereMovieIsPlaying,
    listReviews,
}