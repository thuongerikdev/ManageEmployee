import express from "express"
const {handleHelloWorld , HellUser , handleCreateNewUer} = require ("../controller/homeController")
const router = express.Router();



const initWebRouter = (app) => {
    router.get ("/" , handleHelloWorld)
    
    router.get ("/user" , HellUser)

    router.post ("/user/create-user" ,handleCreateNewUer)

    





    // router.get ("/about" ,(req , res) => {
    //     return res.send ("Im thuong")
    // })



    return app.use ("/" , router);

}

module.exports =  initWebRouter