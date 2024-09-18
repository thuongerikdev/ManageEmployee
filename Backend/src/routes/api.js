import express from "express"
import {checkUserJWT , checkUserPermission} from '../middleware/JWTAction'
const router = express.Router();
const apiController = require("../controller/apiController")
const userController = require('../controller/userController')
const GroupController = require('../controller/GroupController')
const roleController = require('../controller/roleController')




// const checkUser = (req , res  , next) =>{
//     const nonSecurePaths = ['/register' , '/login'] ; 
//     if(nonSecurePaths.includes(req.path)) return next () ; 
//     next ()
// }


const initAPIRouter = (app) => {

    router.all('*' , checkUserJWT ,checkUserPermission )

    router.post ('/register' , apiController.handleRegister)
    router.post ('/login', apiController.handleLogin)
    router.post ('/logout', apiController.handleLogout)
    

    router.get('/account' , userController.getUserAccount)

    //user route
    router.get ('/user/read' ,userController.readFunc)
    router.post ('/user/create' , userController.createFunc);
    router.put ('/user/update' , userController.updateFunc) ;
    router.delete('/user/delete' , userController.deleteFunc);
    
    //role route ReadFuncNotPage
    router.get ('/role/read' ,roleController.readFunc)
    router.get ('/role/by-group/:groupId' ,roleController.getRoleByGroup)
    router.get ('/role/readnotpage' ,roleController.ReadFuncNotPage)
    router.post ('/role/create' , roleController.createFunc);
    router.put ('/role/update' , roleController.updateFunc) ;
    router.delete('/role/delete' , roleController.deleteFunc);
    router.post ('/role/assign-to-group' , roleController.assignToGroup);


    //group route
    router.get ('/group/read' , GroupController.readFunc)


    return app.use ("/api/v1" , router);

}

module.exports =  initAPIRouter 