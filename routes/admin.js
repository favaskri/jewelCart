var express = require('express');
var router = express.Router();
var productHelper = require('../helpers/product_helpers')


/* GET users listing. */
router.get('/', function (req, res, next) {

  productHelper.getAllProducts().then((products)=>{
    console.log(products)
    res.render('admin/view_products', { products, admin: true })
  })
  

 
});
router.get("/add_product", function (req, res) {
  res.render('admin/add_product')
})
router.post("/add_product", (req, res) => {
  console.log(req.body)
  console.log(req.files.image)
  
  productHelper.addProduct(req.body, (id) => {
    let image= req.files.image
    image.mv("./public/product_images/"+id+".jpg" ,(err, done) => {
      if(!err){
        res.render("admin/add_product")

      }else{
        console.log(err)
      }

    })
    
  })
  
  
})
router.get('/deleat_item/:id',(req, res)=>{
  let proId=req.params.id
  productHelper.deleatProducts(proId).then((response)=>{
    res.redirect("/admin")
  })
  
  console.log(proId)

})



module.exports = router;
