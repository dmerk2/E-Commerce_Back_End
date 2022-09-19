const router = require("express").Router();
const { Category, Product } = require("../../models");

// The `/api/categories` endpoint

router.get("/", (req, res) => {
  // find all categories
  // be sure to include its associated Products
  Category.findAll({
    include:[Product]  // acts like an SQL JOIN command
  })
  
  /*Category.findAll({
    include: [
      {
        Model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
  */
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
      id: req.params.id
    },
    include: [Product]
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
      console.log(category);
    /*  if (req.body.categoryIds.length) {
        const productCategoryIdArr = req.body.categoryIds.map((category_id) => {
          return {
            category_id: category_id,
            category_id,
          };
        });
        return Category.bulkCreate(productCategoryIdArr);
      }
      */
      res.status(200).json(category);
    })
    .then((categoryIds) => res.status(200).json(categoryIds))
    .catch((err) => {
      console.log(err);
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

  /*
    .then((catgeory) => {
      return Category.findAll({ where: { category: req.params.id } });
    })
    .then((categoryId) => {
      const categoryTagIds = productCategories.map(
        ({ category_id }) => category_id
      );
      // create filtered list of new category_ids
      const newCategoryIds = req.body.categoryIds
        .filter((category_id) => !categoryTagIds.includes(category_id))
        .map((category_id) => {
          return {
            product_id: req.params.id,
            category_id,
          };
        });
      const categoriesToRemove = productCategories
        .filter(
          ({ category_id }) => !req.body.categoryIds.includes(category_id)
        )
        .map(({ id }) => id);

      // run both actions
      return Promise.all([
        CategoryId.destroy({ where: { id: categoriesToRemove } }),
        CategoryId.bulkCreate(newCategories),
      ]);
    })

    */
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
      id: req.params.id
    }
  }).then(data => {
    console.log(data);
    res.status(200).json(data);
  }).catch(err => {
    if (err) throw err;
    res.status(500).json(err);
  });
});

module.exports = router;
