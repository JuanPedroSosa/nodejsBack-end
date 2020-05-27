const express = require("express");
let SessionsController = require("../controllers/sessions");
let routes = express.Router();


routes.route("/sessions").get(SessionsController.new).post(SessionsController.create).delete(SessionsController.destroy);

module.exports = routes;