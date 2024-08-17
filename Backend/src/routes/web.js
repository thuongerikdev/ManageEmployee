import express from "express"
const {handleHelloWorld ,handleUpdateUser, handleUserPage , handleCreateNewUer ,handleDeleteUser ,getUpdateUserPage} = require ("../controller/homeController")
const router = express.Router();



const initWebRouter = (app) => {
    router.get ("/" , handleHelloWorld)
    
    router.get ("/user" , handleUserPage)

    router.post ("/user/create-user" ,handleCreateNewUer)

    router.post("/delete-user/:id", handleDeleteUser )

    router.get ("/update-user/:id" , getUpdateUserPage)

    router.post ("/user/update-user" , handleUpdateUser)

    





    // router.get ("/about" ,(req , res) => {
    //     return res.send ("Im thuong")
    // })



    return app.use ("/" , router);

}

module.exports =  initWebRouter