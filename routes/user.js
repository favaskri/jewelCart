var express = require('express');
var router = express.Router();
const productHelper = require('../helpers/product_helpers')
const usersHelpers = require('../helpers/user_helper')

/* GET home page. */
router.get('/', function (req, res, next) {
  productHelper.getAllProducts().then((products) => {
    console.log(products)
    res.render('./user/view_products', { products });

  })



});

router.get('/login', (req, res) => {

  res.render('user/login')
})
router.get("/signup", (req, res) => {
  res.render('user/signup')
})
router.post('/signup', (req, res) => {


  usersHelpers.doSignup(req.body).then((response) => {
    console.log(response)

  })
})
router.post('/login', (req, res) => {

  usersHelpers.doLogin(req.body).then((response) => {

    if (response.status) {
      
      res.redirect('/')
    }
    else {
      res.redirect('/login')
    }
    console.log(req.body)
  })
})

module.exports = router;