var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  let products=[
    {
      name:"Finger Ring",
      design:"Casting",
      price:"35000",
      discount:"25%",
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9kwA2SbRu3LsOawfm8UEULPmM9rMCXMSVA8Wi5JOLniLRcejLOJo8bukeK28fzkLXl8cAQZ5OZg&usqp=CAc"


    },
    {
      name:"Finger Ring",
      design:"Casting",
      price:"35060",
      discount:"25%",
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9kwA2SbRu3LsOawfm8UEULPmM9rMCXMSVA8Wi5JOLniLRcejLOJo8bukeK28fzkLXl8cAQZ5OZg&usqp=CAc"


    },
    {
      name:"Finger Ring",
      design:"Casting",
      price:"35800",
      discount:"25%",
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9kwA2SbRu3LsOawfm8UEULPmM9rMCXMSVA8Wi5JOLniLRcejLOJo8bukeK28fzkLXl8cAQZ5OZg&usqp=CAc"


    },
    {
      name:"Finger Ring",
      design:"Casting",
      price:"95000",
      discount:"25%",
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9kwA2SbRu3LsOawfm8UEULPmM9rMCXMSVA8Wi5JOLniLRcejLOJo8bukeK28fzkLXl8cAQZ5OZg&usqp=CAc"


    },
    {
      name:"Finger Ring",
      design:"Casting",
      price:"3500",
      discount:"25%",
      img:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT9kwA2SbRu3LsOawfm8UEULPmM9rMCXMSVA8Wi5JOLniLRcejLOJo8bukeK28fzkLXl8cAQZ5OZg&usqp=CAc"


    },
    {
      name:"Finger Ring",
      design:"Casting",
      price:"3000",
      discount:"25%",
      img:"https://images.melorra.com/image/upload/fl_progressive,h_350,w_350,c_limit,f_auto,q_auto/v1595527037/live-melorra/dev/catalogue/images/DB/OPT/580/W20CDB37F_C_580.jpg"


    }
  ]

  res.render('admin/view_products',{products,admin: true})
});

module.exports = router;
