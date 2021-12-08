const router = require("express").Router();
const controller = require("./theaters.controller")
const methodNotAllowed = require("../errors/methodNotAllowed");
const knex = require("../db/connection");

router
    .route("/")
    .get(controller.list)

module.exports=router;