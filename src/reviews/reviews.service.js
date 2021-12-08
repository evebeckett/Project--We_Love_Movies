const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties")

function read(review_id) {
    return knex("reviews as r")
      .select("*")
      .where({ "r.review_id": review_id })
      .first()
  }

function destroy(review_id) {
    return knex("reviews").where({review_id}).del();
}


function update(updatedReview){
    return knex("reviews as r")
        .update(updatedReview,"*")
        .where({"r.review_id": updatedReview.review_id})
        .then(() => read(updatedReview.review_id))
}

function readCritic(critic_id) {
    return knex("critics")
        .select("*")
        .where({critic_id})
}

module.exports = {
    read,
    delete: destroy,
    update,
    readCritic,
}