const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include: [Product], // acts like an SQL JOIN command
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res.status(400).json({ message: "No category found with this id" });
        return;
      }
      console.log(dbCategoryData);
      res.json(dbCategoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.get("/:id", (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  Category.findOne({
    where: {
      id: req.params.id,
    },
    include: [Product],
  })
    .then((dbCategoryData) => {
      if (!dbCategoryData) {
        res.status(400).json({ message: "No category found with this id" });
        return;
      }
      res.json(dbCategoryData);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.post("/", (req, res) => {
  console.log(req.body);
  // create a new category
  Category.create(req.body)
    .then((category) => {
      res.status(200).json(category);
    })
    .then((categoryIds) => res.status(200).json(categoryIds))
    .catch((err) => {
      console.log(err)
      res.status(400).json(err);
    });
});

// update a category by its `id` value
router.put("/:id", (req, res) => {
  Category.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedObject) => res.json(updatedObject))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete a category by its `id` value
  Category.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
