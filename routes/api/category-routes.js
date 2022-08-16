const router = require('express').Router();
const { Category, Product } = require('../../models');

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

router.post('/', (req, res) => {
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

router.put('/:id', (req, res) => {
  // update a category by its `id` value
});

router.delete('/:id', (req, res) => {
  // delete a category by its `id` value
});

module.exports = router;
