const router = require('express').Router();
const { Category, Product } = require('../../models');
const { update } = require('../../models/Product');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findAll({
      include: [
        {
          model: Product,
        }
      ]
    });
    if (!categoryData) {
      res.status(404).json({ message: "No Categories found!" });
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  try {
    const categoryData = await Category.findByPk(
      req.params.id,
      {
        include: [
          {
            model: Product,
          }
        ]
      }
    );
    if (!categoryData) {
      res.status(404).json({ message: "No Categories of the Specified ID Found!" });
    }
    res.status(200).json(categoryData);
  } catch (err) {
    res.status(404).json(err);
  }
});

router.post('/', async (req, res) => {
  // create a new category
  /* req.body should look like this:
    {
      category_name: "name"
    }
  */
  try {
    //check if the category already exists in the database
    const checkData = await Category.findOne({
      where: {
        category_name: req.body.category_name
      }
    });

    if (checkData) {
      res.status(404).json({ message: "Category already exists in the database!" });
      return;
    }

    // Create the new category
    const categoryData = await Category.create(req.body);

    // Send success data back to user
    res.status(200).json({ message: "Category Created Successfully" });
  } catch (err) {
    res.status(400).json(err);
  }

})

router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  try {
    //Check if the ID exists in the table
    const categoryData = await Category.findByPk(
      req.params.id,
      {
        include: [
          {
            model: Product
          }
        ]
      }
    );
    if (!categoryData) {
      res.status(404).json({ message: "No Category found that matches ID." });
      return;
    }

    // Update the row
    const updateData = await Category.update(
      req.body,
      {
        where: {
          id: req.params.id
        }
      }
    );
    res.status(200).json(updateData);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const categoryData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!categoryData) {
      res.status(404).json({ message: "No Category with the specified ID found!" });
      return;
    } else {
      res.status(200).json(categoryData);
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
