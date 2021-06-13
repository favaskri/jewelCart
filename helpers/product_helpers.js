var db = require('../config/connection')
var collection = require('../config/collections')
const { PRODUCT_COLLECTIONS } = require('../config/collections')
module.exports ={
    addProduct: (product ,callback)=>{
        console.log(product)
        db.get().collection('product').insertOne(product).then((data)=>{
            callback(data.ops[0]._id)

        })
    },
    getAllProducts: ()=>{
        return new Promise (async(resolve, reject)=>{
            let products =await db.get().collection(collection.PRODUCT_COLLECTIONS).find().toArray();
            resolve(products)
        })
    }

}