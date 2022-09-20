const router = require("express").Router();
const { Tag, Product, ProductTag } = require("../../models");

// The `/api/tags` endpoint

router.get("/", (req, res) => {
  // find all tags
  Tag.findAll({
    include: [Product, ProductTag],
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
      if (err) throw err;
      res.status(400).json(err);
    });
});

router.get("/:id", (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  Tag.findOne({
    where: {
      id: req.params.id,
    },
    include: [Product, ProductTag],
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
      if (err) throw err;
      res.status(400).json(err);
    });
});

router.post("/", (req, res) => {
  // create a new tag
  Tag.create(req.body)
    .then((tag) => {
      res.status(200).json(tag);
    })
    .then((tagIds) => res.status(200).json(tagIds))
    .catch((err) => {
      if (err) throw err;
      res.status(400).json(err);
    });
});

router.put("/:id", (req, res) => {
  // update a tag's name by its `id` value
  Tag.update(req.body, {
    where: {
      id: req.params.id,
    },
  })
    .then((updatedObject) => res.json(updatedObject))
    .catch((err) => {
      if (err) throw err;
      res.status(400).json(err);
    });
});

router.delete("/:id", (req, res) => {
  // delete on tag by its `id` value
  Tag.destroy({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      console.log(data);
      res.status(200).json(data);
    })
    .catch((err) => {
      if (err) throw err;
      res.status(400).json(err);
    });
});

module.exports = router;
