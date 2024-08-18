const bcript = require("bcryptjs");
const Bluebird = require("bluebird");
const salt = bcript.genSaltSync(10)
const mysql = require("mysql2/promise")
const db = require('../models/index');
const { where } = require("sequelize");
// Create the connection to database

const hashUserPassWord = (userPassword) => {
    let hashPassWord = bcript.hashSync(userPassword, salt);
    return hashPassWord
}

const createNewUser = async (email, password, username) => {
    let hashPass = hashUserPassWord(password)

    try {
        await db.User.create({
            username: username,
            email: email,
            password: hashPass
        })
    } catch (err) {
        console.log(err)
    }



}
const getUserList = async () => {
    // test realationship

    let newUser =  await db.User.findOne({
        where : {id :1} , 
        include  : {
            model : db.Group, 
           
        },
        attributes : ["id" , "email" , "username"],
        nest : true ,
        raw :true,

    })

    // let roles = await db.Role.findAll({
    //     include: {
    //         model: db.Group,
    //         where: { id: 1 },
    //         attibute: ["id" ]
    //     },
    //     raw: true,
    //     nest: true
    // })



    console.log("check new user" , newUser)
    // console.log("check new Role", roles)


    let user = []
    user = await db.User.findAll()
    return user

    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'management',
    //     Promise: Bluebird
    // });
    // try {
    //     const [rows, fields] = await connection.execute('select * from user')
    //     return rows
    // }
    // catch (err) {
    //     console.log(err)




    //     // let user = [] ;
    //     // connection.query(`select * from user`,
    //     //     function (err, results, fields) {
    //     //         if (err) {
    //     //             console.log(err);
    //     //             return user
    //     //         }
    //     //         user= results
    //     //         console.log(results); 
    //     //         return user

    //     //     }

    //     // );

    // }
}
const DeleteUser = async (userId) => {
    await db.User.destroy({
        where: { id: userId }
    })

    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'management',
    //     Promise: Bluebird
    // });
    // try {
    //     const [rows, fields] = await connection.execute('delete from user where id=?'
    //         , [id]
    //     )
    //     return rows
    // }
    // catch (err) {
    //     console.log(err)
    // }

}
const getIdbyUser = async (id) => {

    let user = []
    user = await db.User.findOne({
        where: { id: id }
    })
    return user

    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'management',
    //     Promise: Bluebird
    // });
    // try {
    //     const [rows, fields] = await connection.execute('select * from user where id=?'
    //         , [id]
    //     )
    //     return rows
    // }
    // catch (err) {
    //     console.log(err)
    // }
}
const updateUserInfor = async (email, username, id) => {
    await db.User.update(
        {
            email: email,
            username: username
        },
        {
            where: { id: id }
        }
    )

    // const connection = await mysql.createConnection({
    //     host: 'localhost',
    //     user: 'root',
    //     database: 'management',
    //     Promise: Bluebird
    // });
    // try {
    //     const [rows, fields] = await connection.execute(
    //         'UPDATE user SET email = ?, username = ? WHERE id = ?',
    //         [email, username, id]
    //     );
    //     return rows;
    // } catch (err) {
    //     console.log(err);
    // } finally {
    //     await connection.end(); // Ensure the connection is closed
    // }
};

module.exports = { updateUserInfor, createNewUser, getUserList, DeleteUser, getIdbyUser }