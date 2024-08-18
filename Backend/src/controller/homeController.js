
const { render } = require("ejs");
const {createNewUser , getUserList, updateUserInfor ,DeleteUser , getIdbyUser} = require("../service/userService")



  
const handleHelloWorld = (req, res) => {
    return res.render("home.ejs")
}

const  handleUserPage = async(req, res) => {
    let userList = await getUserList() ; 


 

    return res.render("user.ejs", {userList})
}
const handleCreateNewUer = (req, res) => {
    let email = req.body.emailname ;
    let password = req.body.password
    let username = req.body.username

    createNewUser(email , password , username)


//    let check =   bcript.compareSync(password , hashPassWord )


    return res.redirect("/user")


}
const handleDeleteUser = async (req,res)=> {
    await DeleteUser(req.params.id)
    return res.redirect("/user")
}
const getUpdateUserPage = async (req , res) => {

    let user = await(getIdbyUser(req.params.id))
    let userData = {}
    userData = user
    return res.render('userUpdate.ejs' , {userData})
    
}
const handleUpdateUser = async(req , res) => {
    let email = req.body.emailname ;
    let username = req.body.username
    let id = req.body.id
    await updateUserInfor (email , username , id)

    return res.redirect("/user")
}

module.exports = { handleUpdateUser,handleHelloWorld, getUpdateUserPage,handleUserPage, handleCreateNewUer ,handleDeleteUser}