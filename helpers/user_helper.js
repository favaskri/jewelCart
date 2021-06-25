
var db = require('../config/connection')
var collection = require('../config/collections')
var objectId = require('mongodb').ObjectID
const CART_COLLECTIONS = require('../config/collections')
const PRODUCT_COLLECTIONS = require('../config/collections')

const bcrypt = require('bcrypt')



module.exports = {
    doSignup: (userData) => {
        console.log("userData")
        return new Promise(async (resolve, reject) => {
            userData.password = await bcrypt.hash(userData.password, 10)
            db.get().collection(collection.USER_COLLECTIONS).insertOne(userData).then((data) => {

                resolve(data.ops[0])
            })



        })


    },
    doLogin: (userData) => {
        let response = {}
        let loginStatus = false
        return new Promise(async (resolve, reject) => {
            let user = await db.get().collection(collection.USER_COLLECTIONS).findOne({ email: userData.email })
            console.log(user)
            if (user) {


                bcrypt.compare(userData.password, user.password).then((status) => {
                    if (status) {
                        response.user = user
                        response.status = true
                        console.log("this is in user_helpers" + " :" + response.status)
                        resolve(response)

                        console.log("Login Success")
                    } else {
                        console.log("Login Failed")
                        resolve({ status: false })
                        console.log("this is in user_helpers" + " :" + response.status)
                        console.log(status)
                    }



                })

            } else {
                console.log("login failed")
                resolve({ status: false })
                console.log("this is in user_helpers" + " :" + response.status)
            }
        })
    }, addToCart: (proId, userId) => {
        let proObj = {
            item: objectId(proId),
            quantity: 1

        }
        return new Promise(async (resolve, reject) => {
            let userCart = await db.get().collection(collection.CART_COLLECTIONS).findOne({ user: objectId(userId) })
            if (userCart) {
                let proExist = userCart.products.findIndex(product => product.item === proId)
                console.log(proExist)
                if (proExist !== -1) {
                    db.get().collection(collection.CART_COLLECTIONS).update({ user: objectId(userId), 'product': objectId(proId) }, {
                        $inc: { 'products.$.quantity': 1 }
                    }).then(() => {
                        resolve()

                    })
                } else {
                    db.get().collection(collection.CART_COLLECTIONS).updateOne({ user: objectId(userId) }, {
                        $push: {
                            products: proObj

                        }

                    }).then((response) => {
                        resolve()


                    })
                }
            } else {
                let carObj = {
                    user: objectId(userId),
                    products: [proObj]
                }

                db.get().collection(collection.CART_COLLECTIONS).insertOne(carObj).then((response) => {
                    resolve()
                })
            }


            console.log("addtocart"+proObj.item)

        })
        

    },
    getCartProduct: (userId) => {
        
        console.log("get cart product UID:"+userId)

        return new Promise(async (resolve, reject) => {
            let cartItems = await db.get().collection(collection.CART_COLLECTIONS).aggregate([
                {
                    $match: { user: objectId(userId) }
                },
                {
                    $unwind: '$products'


                }, {
                    $project: {
                        item: '$products.item',
                        quantity: '$products.quantity'

                    }
                }, {
                    $lookup: {
                        from: collection.PRODUCT_COLLECTIONS,
                        localField: 'item',
                        foreignField: '_id',
                        as: 'product'
                    }
                    
                    
                },
                {

                    $project: { item: 1, quantity: 1, products: { $arrayElemAt: ['$product', 0] } }

                }


            ]).toArray()
            resolve(cartItems)
            console.log(cartItems[0])
           
        })
    }
}