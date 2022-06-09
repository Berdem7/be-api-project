const express = require("express");

const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const CategoryController = require("../controller/CategoryController");
const FoodController = require("../controller/FoodController");
const UserController = require("../controller/UserController");
const Authentication = require("../controller/Authentication");
const auth = require("../middleware/Auth");

//Categories
router.get("/category", CategoryController.get_categories);
router.post("/category", jsonParser, CategoryController.create_categories);
router.delete("/category/:id", CategoryController.delete_categories);
router.put("/category", jsonParser, CategoryController.update_categories);

//Foods
router.get("/category/search", CategoryController.find_categories);
router.get("/foods/search", FoodController.search_foods);
router.get("/foods", FoodController.get_foods);
router.get("/foods/:id", FoodController.findById_foods);
router.post("/foods", jsonParser, FoodController.create_foods);
router.delete("/foods/:id", FoodController.delete_foods);
router.put("/foods", jsonParser, FoodController.update_foods);

//Users
router.get("/users/:name", auth, UserController.find_users);
router.get("/users", auth, UserController.get_users);
router.post("/users", auth, jsonParser, UserController.create_users);
router.delete("/users/:id", auth, UserController.delete_users);
router.put("/users", auth, jsonParser, UserController.update_users);
router.post("/users/register", Authentication.register);
router.post("/users/login", Authentication.login);

module.exports = router;
