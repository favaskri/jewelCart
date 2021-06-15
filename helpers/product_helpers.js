var db = require('../config/connection')
var collection = require('../config/collections')
var objectId = require('mongodb').ObjectID
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
    },
    deleatProducts: (proId)=>{
        return new Promise ((resolve, reject) => {
            db.get().collection(collection.PRODUCT_COLLECTIONS).removeOne({_id:objectId(proId)}).then((response) =>{
                resolve(response)
                console.log(response)

            })
        })
    }

}