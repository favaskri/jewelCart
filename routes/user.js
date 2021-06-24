var express = require('express');
var router = express.Router();
const productHelper = require('../helpers/product_helpers')
const usersHelpers = require('../helpers/user_helper')
const verifyLogin= (req, res, next) =>{
  if(req.session.LoggedIn){
    next()
  }else{
    res.redirect("/login")
  }
}


/* GET home page. */
router.get('/', function (req, res, next) {
  let user=req.session.user
  productHelper.getAllProducts().then((products) => {
    // console.log(products)
    res.render('./user/view_products', { products ,user});

  })



});

router.get('/login', (req, res) => {
  if(req.session.LoggedIn){
    res.redirect('/')
  }else{
  
    res.render('user/login',{"loginErr":req.session.loginErr})
    
    req.session.loginErr=false

  }
  
  
})
router.get("/signup", (req, res) => {
  res.render('user/signup')
})
router.post('/signup', (req, res) => {


  usersHelpers.doSignup(req.body).then((response) => {
    req.session.LoggedIn= true
    req.session.user=response
    res.redirect('/')
    console.log(response)

  })
})
router.post('/login', (req, res) => {

  usersHelpers.doLogin(req.body).then((response) => {

    if (response.status) {
      req.session.user= response.user
      req.session.LoggedIn= true
      
      res.redirect('/')
    }
    else {

      req.session.loginErr = "Invalid email id or password"
     
      res.redirect('/login')
      
    }
    console.log(req.body)
  })
})
router.get('/logOut', (req, res)=>{
  req.session.destroy()
  res.redirect('/')
})
router.get('/cart',verifyLogin, async(req, res)=>{
  let products =await usersHelpers.getCartProduct(req.session.user._id)
  

  console.log(products)
  res.render("user/cart",{products})
})
router.get('/addToCart/:id',verifyLogin, (req, res)=>{
  usersHelpers.addToCart(req.params.id,req.session.user._id).then(()=>{
    
    res.redirect('/')
  })
})
module.exports = router;