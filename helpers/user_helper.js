
var db = require('../config/connection')
var collection = require('../config/collections')

const bcrypt = require('bcrypt')



module.exports = {
    doSignup: (userData) => {
        console.log("userData")
        return new Promise(async (resolve, reject) => {
         userData.password = await bcrypt.hash(userData.password, 10)
            db.get().collection(collection.USER_COLLECTIONS).insertOne(userData).then((data)=>{
                console.log("--------------data------")
            resolve(data.ops[0])
            })



        }) 


    }
}