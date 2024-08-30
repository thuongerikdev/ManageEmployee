import express from "express"

const router = express.Router();
const apiController = require("../controller/apiController")


const initAPIRouter = (app) => {

    router.get("/test-api" , apiController.testAPI)
    router.post ('/register' , apiController.handleRegister)

    router.post ('/login' , apiController.handleLogin)


    





    // router.get ("/about" ,(req , res) => {
    //     return res.send ("Im thuong")
    // })



    return app.use ("/api/v1" , router);

}

module.exports =  initAPIRouter