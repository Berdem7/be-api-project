const Category = require("../models/Category");
const Foods = require("../models/Foods");

const find_categories = (req, res, next) => {
  Foods.find(
    { "category.category_name": { $regex: `${req.query.search}` } },
    function (err, data) {
      if (err) next;
      res.json(data);
    }
  );
};

const get_categories = (req, res) => {
  Category.find({}, function (err, data) {
    if (err) next;
    res.json(data);
  });
};

const create_categories = (req, res) => {
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
    .catch(next);
  res.send("Success");
};

const delete_categories = (req, res) => {
  console.log(req.params.id);
  Category.findOneAndRemove({ _id: req.params.id }, function (err, data) {
    if (err) next;
    // res.json(data);
    res.send("deleted");
  });
  //   res.send({ data: "data" });
};

const update_categories = (req, res) => {
  // console.log(req.body);
  Category.findByIdAndUpdate(
    req.body._id,
    {
      name: req.body.name,
      color: req.body.color,
    },
    function (err, data) {
      if (err) next;
      // res.json(data);
      res.send("updated");
    }
  );
  // res.send({ data: "data" });
};

module.exports = {
  get_categories,
  create_categories,
  delete_categories,
  update_categories,
  find_categories,
};
