const express = require("express");
const mongoose = require("mongoose");

const router = express.Router();
const bodyParser = require("body-parser");
const jsonParser = bodyParser.json();
const Category = require("../models/Category");
const Foods = require("../models/Foods");
const { ObjectId } = require("mongodb");
const { append } = require("express/lib/response");

router.get("/category", (req, res) => {
  Category.find({}, function (err, data) {
    if (err) throw err;
    res.json(data);
  });
});

router.post("/category", jsonParser, (req, res) => {
  const reqBody = req.body;
  let newCategory = new Category({
    _id: mongoose.Types.ObjectId(),
    name: reqBody.name,
    color: reqBody.color,
  });
  newCategory
    .save()
    .then((data) => {
      console.log(data);
    })
    .catch((err) => {
      console.log(err);
    });
  res.send("Success");
});

router.delete("/category/:id", (req, res) => {
  console.log(req.params.id);
  Category.findOneAndRemove({ _id: req.params.id }, function (err, data) {
    if (err) throw err;
    // res.json(data);
    res.send("deleted");
  });
  //   res.send({ data: "data" });
});

router.put("/category", jsonParser, (req, res) => {
  // console.log(req.body);
  Category.findByIdAndUpdate(
    req.body.id,
    {
      name: req.body.name,
      color: req.body.color,
    },
    function (err, data) {
      if (err) throw err;
      // res.json(data);
      res.send("updated");
    }
  );
  // res.send({ data: "data" });
});

router.get("/foods", (req, res) => {
  Foods.find({}, function (err, data) {
    if (err) throw err;
    res.json(data);
  });
});

router.post("/foods", jsonParser, async (req, res) => {
  const foods = req.body.data;
  for (let i = 0; i < foods.length; i++) {
    const reqBody = foods[i];
    const category = await Category.findById(ObjectId(reqBody.category_id));
    if (category) {
      let newFood = new Foods({
        _id: mongoose.Types.ObjectId(),
        name: reqBody.name,
        sales: reqBody.sales,
        price: reqBody.price,
        portion: reqBody.portion,
        stock: reqBody.stock,
        image: reqBody.image,
        tumb_img: reqBody.tumb_img,
        ingredients: reqBody.ingredients,
        discount: reqBody.discount,
        category: {
          category_id: category._id,
          category_name: category.name,
          category_color: category.color,
        },
      });
      newFood
        .save()
        .then((data) => {
          console.log(data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    //   const reqBody = req.body;
    //   const category = await Category.findById(ObjectId(reqBody.category_id));
    //   console.log(category);
    //   if (category) {
    //     let newFood = new Foods({
    //       _id: mongoose.Types.ObjectId(),
    //       name: reqBody.name,
    //       sales: reqBody.sales,
    //       price: reqBody.price,
    //       portion: reqBody.portion,
    //       stock: reqBody.stock,
    //       image: reqBody.image,
    //       tumb_img: reqBody.tumb_img,
    //       ingredients: reqBody.ingredients,
    //       discount: reqBody.discount,
    //       category: {
    //         category_id: category._id,
    //         category_name: category.name,
    //         category_color: category.color,
    //       },
    //     });
    //     newFood
    //       .save()
    //       .then((data) => {
    //         console.log(data);
    //       })
    //       .catch((err) => {
    //         console.log(err);
    //       });
    res.send("Success");
  }
});

router.delete("/foods/:id", (req, res) => {
  console.log(req.params.id);
  Foods.findOneAndRemove({ _id: req.params.id }, function (err, data) {
    if (err) throw err;
    // res.json(data);
    res.send("deleted");
  });
  //   res.send({ data: "data" });
});

router.put("/foods", jsonParser, async (req, res) => {
  const reqBody = req.body;
  const category = await Category.findById(ObjectId(reqBody.category_id));
  console.log(category.color);
  if (category) {
    console.log(reqBody.name);
    Foods.findByIdAndUpdate(
      reqBody.id,
      {
        name: reqBody.name,
        price: reqBody.price,
        portion: reqBody.portion,
        sales: reqBody.sales,
        stock: reqBody.stock,
        image: reqBody.image,
        tumb_img: reqBody.tumb_img,
        ingredients: reqBody.ingredients,
        discount: reqBody.discount,
        category: {
          category_id: category._id,
          category_name: category.name,
          category_color: category.color,
        },
      },

      function (err, data) {
        if (err) throw err;
        // res.json(data);
        res.send("updated");
      }
    );
  } else {
    res.send("False");
  }
});

module.exports = router;
