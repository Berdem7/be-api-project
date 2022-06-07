const Category = require("../models/Category");
const Foods = require("../models/Foods");

const search_foods = (req, res) => {
  Foods.find(
    { name: { $regex: /req.query.name/, $options: "i" } },
    function (err, data) {
      if (err) next;
      res.json(data);
    }
  );
  console.log(req.query);
};

const get_foods = (req, res) => {
  Foods.find({}, function (err, data) {
    if (err) next;
    res.json(data);
  });
};

const findById_foods = (req, res) => {
  Foods.findById(req.params.id, function (err, data) {
    if (err) next;
    res.json(data);
  });
};

const create_foods = async (req, res) => {
  const reqBody = req.body;
  const category = await Category.findById(ObjectId(reqBody.category_id));
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
      next;
    });

  res.send("Success");
};

const delete_foods = (req, res) => {
  console.log(req.params.id);
  Foods.findOneAndRemove({ _id: req.params.id }, function (err, data) {
    if (err) next;
    // res.json(data);
    res.send("deleted");
  });
  //   res.send({ data: "data" });
};

const update_foods = async (req, res) => {
  const reqBody = req.body;
  const category = await Category.findById(
    ObjectId(reqBody.category.category_id)
  );
  if (category) {
    console.log(reqBody.name);
    Foods.findByIdAndUpdate(
      reqBody._id,
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
        if (err) next;
        // res.json(data);
        res.send("updated");
      }
    );
  } else {
    res.send("False");
  }
};

module.exports = {
  create_foods,
  findById_foods,
  search_foods,
  update_foods,
  delete_foods,
  get_foods,
};
