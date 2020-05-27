const express = require("express");
let RegistrationsController = require("../controllers/registrations");
let routes = express.Router();


routes.get("/signup", RegistrationsController.new);
routes.route("/users").post(RegistrationsController.create);

module.exports = routes;