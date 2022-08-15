const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findAll({
      include: [
        {
          model: Product,
        }
      ]
    });
    if (!tagData) {
      res.status(404).json({ message: "No Tags found!" });
      return;
    } else {
      res.status(200).json(tagData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tagData = await Tag.findByPk(
      req.params.id,
      {
        include: [
          {
            model: Product,
          },
        ]
      }
    );
    if (!tagData) {
      res.status(404).json({ message: `No Tag found with the specified ID!` });
    } else {
      res.status(200).json(tagData);
    }
  } catch (err) {
    res.status(404).json({ message: `No Tag found with the specified ID!` });
  }
});

router.post('/', async (req, res) => {
  // create a new tag
  /* req.body should look like this:
    {
      tag_name: "some name"
    }
  */
  try {
    const newTag = await Tag.create(req.body);
    res.status(200).json(newTag);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  try {
    // retrieve the tag with the requested ID
    const tagData = await Tag.findByPk(
      req.params.id,
      {
        include: [
          {
            model: Product,
          },
        ]
      }
    );
    if (!tagData) {
      res.status(404).json({ message: `No Tag found with the specified ID!` });
    } else {
      const updateData = await Tag.update(
        req.body,
        {
          where: {
            id: req.params.id,
          },
        }
      );
      if (!updateData) {
        res.status(404).json({ message: "No tag with the specified ID found!" });
        return;
      } else {
        res.status(200).json({ message: "Successfully updated!" });
      }
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value

  // TODO: NOT ID NOT BEING AUTO RESET AFTER DELETION!
  try {
    const tagData = await Tag.destroy({
      where: {
        id: req.params.id,
      }
    });
    if (!tagData) {
      res.status(404).json({ message: "No Tag with the specified ID found!" });
      return;
    } else {
      res.status(200).json({ message: "Tag deleted!" });
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
