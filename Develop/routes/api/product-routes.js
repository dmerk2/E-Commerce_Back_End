const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// The `/api/products` endpoint

// get all products
router.get("/", (req, res) => {
  // find all products
  // be sure to include its associated Category and Tag data
  Product.findAll({
    include: [Category, {model: Tag, through: ProductTag}],
  })
    .then((dbProductData) => {
      if (!dbProductData) {
        res.status(400).json({ message: "No Product found in this category" });
        return;
      }
      res.json(dbProductData);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// get one product
router.get("/:id", (req, res) => {
  // find a single product by its `id`
  // be sure to include its associated Category and Tag data
  Product.findOne({
    where: {
      id: req.params.id,
    },
    include: [Category, Tag, ProductTag],
  })
    .then((dbProductData) => {
      if (!dbProductData) {
        res.status(400).json({ message: "No Product found in this category" });
        return;
      }
      res.json(dbProductData);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// create new product
router.post("/", (req, res) => {
  Product.create(req.body)
    .then((product) => {
      // if no product tags, just respond
      res.status(200).json(product);
    })
    .then((productTagIds) => res.status(200).json(productTagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

// update product
router.put("/:id", (req, res) => {
  Product.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedProductTags) => res.json(updatedProductTags))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.delete("/:id", (req, res) => {
  Product.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});
module.exports = router;
