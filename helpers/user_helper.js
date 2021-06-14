
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


    },
    doLogin:(userData)=>{
        let response= {}
        let loginStatus=false
        return new Promise (async (resolve, reject) => {
            let user = await db.get().collection(collection.USER_COLLECTIONS).findOne({email:userData.email})
            console.log(user)
            if(user) {

                
                bcrypt.compare(userData.password, user.password).then((status)=>{
                    if(status) {
                        response.user=user
                        response.status=true
                        console.log("this is in user_helpers"+" :"+response.status)
                        resolve(response)

                        console.log("Login Success")
                    }else{
                        console.log("Login Failed")
                        resolve({status:false})
                        console.log("this is in user_helpers"+" :"+response.status)
                        console.log(status)
                    }
                   
                  

                })
            
            }else {
            console.log("login failed")
            resolve({status:false})
            console.log("this is in user_helpers"+ " :"+response.status)
            }
        })
    }
}