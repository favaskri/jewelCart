
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
        return new Promise(async (resolve, reject) => {
            let userCart = await db.get().collection(collection.CART_COLLECTIONS).findOne({ user: objectId(userId) })
            if (userCart) {
                db.get().collection(collection.CART_COLLECTIONS).updateOne({ user: objectId(userId) }, {
                    $push: {
                        product: objectId(proId)
                    }
                }).then(() => {
                    resolve()
                })

            } else {
                let carObj = {
                    user: objectId(userId),
                    product: [objectId(proId)]
                }
                db.get().collection(collection.CART_COLLECTIONS).insertOne(carObj).then((response) => {
                    resolve()
                })
            }





        })
    },
    getCartProduct: (userId) => {
        // console.log("user Id in gerCartProduct:"+userId)

        return new Promise(async (resolve, reject) => {
            let cartItems = await db.get().collection(collection.CART_COLLECTIONS).aggregate([
                {
                    $match: { user: objectId(userId) }
                },
                {
                    $lookup: {
                        from: collection.PRODUCT_COLLECTIONS,
                        let: { prodList: '$product' },
                        pipeline: [
                            {
                                $match: {
                                    $expr: {
                                        $in: ['$_id', '$$prodList']
                                    }
                                }
                            }
                        ], as: 'cartItem'



                    }
                }
            ]).toArray()
            resolve(cartItems)
            console.log("Cartitem console user:" + userId)
            //    console.log(cartItems)
        })
    }
}