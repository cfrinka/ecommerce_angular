const { Product } = require('../models/product')
const express = require('express');
const router = express.Router();

router.get(`/`, async (req, res) => {
  let filter = {};
  if (req.query.categories) {
    filter = { category: req.query.categories.split(',') }
  }
  const productList = await Product.find(filter)

  if (!productList) {
    res.status(500).json({ sucess: false })
  }
  res.send(productList)
})

router.get('/:id', async (req, res) => {
  const product = await Product.findById(req.params.id)
  if (!product) {
    res.status(500).json({ sucess: false })
  }
  res.send(product)
})

router.get('/select/:id', async (req, res) => {
  const product = await Product.findById(req.params.id).select('name image')
  if (!product) {
    res.status(500).json({ sucess: false })
  }
  res.send(product)
})

router.get('/featured/:count', async (req, res) => {
  const count = req.params.count ? req.params.count : 0
  const product = await Product.find({
    isFeatured: true
  }).limit(+count)
  if (!product) {
    res.status(500).json({ sucess: false })
  }
  res.send(product)
})

router.post('/', async (req, res) => {

  let product = new Product({
    name: req.body.name,
    description: req.body.description,
    richDescription: req.body.richDescription,
    image: req.body.image,
    brand: req.body.brand,
    price: req.body.price,
    category: req.body.category,
    countInStock: req.body.countInStock,
    rating: req.body.rating,
    numReviews: req.body.numReviews,
    isFeatured: req.body.isFeatured
  })

  product = await product.save();

  if (!product) {
    return res.status(404).send('The product cannot be created.')
  }

  res.send(product)
})

router.put('/:id', async (req, res) => {
  const product = await Product.findByIdAndUpdate(
    req.params.id,
    {
      name: req.body.name,
      description: req.body.description,
      richDescription: req.body.richDescription,
      image: req.body.image,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured
    },
    { new: true }
  )
  if (!product) {
    return res.status(404).send('The product cannot be updated.')
  }

  res.send(product)
})

router.delete('/:productId', (req, res) => {
  Product.findByIdAndRemove(req.params.productId).then(product => {
    if (product) {
      return res.status(200).json({
        sucess: true,
        message: "The product has been deleted"
      })
    } else {
      return res.status(404).json({
        sucess: false,
        message: "product not found"
      })
    }
  }).catch(err => {
    return res.status(400).json({
      sucess: false,
      error: err
    })
  })
})

module.exports = router;