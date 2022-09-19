const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  Tag.findall({
    include: [
      {
        Model: ProductTag,
        attributes: ["id", "product_id", "tag_id"],
      },
      {
        Model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"]
      }
    ],
  })
    .then((dbTagData) => {
      if (!dbTagData) {
        res
          .status(400)
          .json({ message: "No tag associated with this product" });
        return;
      }
      res.json(dbTagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.find({
    include: [
      {
        Model: ProductTag,
        attributes: ["id", "product_id", "tag_id"],
      },
      {
        Model: Product,
        attributes: ["id", "product_name", "price", "stock", "category_id"],
      },
    ],
  })
    .then((dbTagData) => {
      if (!dbTagData) {
        res
          .status(400)
          .json({ message: "No tag associated with this product" });
        return;
      }
      res.json(dbTagData);
    })
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.post("/", (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((tag) => {
      if (req.body.tagIds.length) {
        const tagIdArr = req.body.tagIds.map((tag_id) => {
          return {
            tag_id: tag_id,
            tag_id,
          };
        });
        return Tag.bulkCreate(tagIdArr);
      }
      res.status(200).json(tag);
    })
    .then((tagIds) => res.status(200).json(tagIds))
    .catch((err) => {
      console.log(err);
      res.status(400).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
});

module.exports = router;
