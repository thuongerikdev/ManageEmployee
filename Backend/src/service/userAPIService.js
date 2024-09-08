import { where } from 'sequelize'
import db from '../models/index'
import {hashUserPassWord  , checkEmail,checkPhone} from './loginRegisterService'
const getAllUser = async () => {
    try {
        let users = await db.User.findAll({
            include: {
                model: db.Group, attributes: ["name", "description"]
            },
            attributes: ["id", "email", "username", "phone", "sex"],
        })

        if (users) {
            // let data = users.get({ plain: true })
            return {
                EM: 'get data Success',
                EC: 0,
                DT: users
            }
        }
        else {
            return {
                EM: 'get data Success',
                EC: 0,
                DT: []
            }
        }


    } catch (error) {
        console.log(error)
        return {
            EM: 'something wrong with service',
            EC: -1,
            DT: []
        }

    }
}

const getUserPaginaton = async (page, limit) => {
    try {
        let offset = (page - 1) * limit
        let { count, rows } = await db.User.findAndCountAll({

            offset: offset,
            limit: limit,

            include: {
                model: db.Group, attributes: ["name", "description" , "id"]
            },
            attributes: ["id", "email", "username", "phone", "sex" ,"address"],
            order : [['id' , 'DESC']]
        })
        let totalPage = Math.ceil(count / limit)

        let data = {
            totalRows: count,
            totalPage: totalPage,
            users: rows
        }


        return {
            EM: 'page ok ',
            EC: 0,
            DT: data
        }

    } catch (error) {
        console.log(error)
        return {
            EM: 'something wrong with service',
            EC: -1,
            DT: []
        }
    }
}
const createNewUser = async (data) => {

    let isEmailExist = await checkEmail(data.email)
    console.log("check email", isEmailExist)
    if (isEmailExist === true) {
        return {
            EM: 'the email is already exist',
            EC: 1,
            DT : ["email"]
        }
    }
    let isPhoneExist = await checkPhone(data.phone)

    if (isPhoneExist === true) {
        return {
            EM: 'the phone number is already exist',
            EC: 1,
            DT : ["phone"]
        }
    }


    //hash userpassword
    let hashPass = hashUserPassWord(data.password)
    try {
        //check email /users
        await db.User.create({...data , password : hashPass})
        return {
            EM: 'create ok ',
            EC: 0,
            DT: []
        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'something wrong with service',
            EC: -1,
            DT: []
        }

    }
}
const updateUser = async (data) => {

    try {
        if(!data.groupId) {
            return {
                EM: 'Error with group Id',
                EC: 1,
                DT: "group"
            }

        }

        let users = await db.User.findOne({
            where: { id: data.id }
        })
        if (users) {
            if(users) {
                await users.update({
                    username : data.username ,
                    address : data.address , 
                    sex : data.sex,
                    groupId : data.groupId

                })
            }
            return {
                EM: 'Update User success',
                EC: 0,
                DT: ''
            }
        }
        else {
            return {
                EM: 'user not found',
                EC: 2,
                DT: []
            }

        }

    } catch (error) {
        console.log(error)
        return {
            EM: 'something wrong with service',
            EC: -1,
            DT: []
        }

    }
}
const deleteUser = async (id) => {
    try {
        let user = await db.User.findOne({
            where: { id: id }
        })
        if (user) {
            await user.destroy();
            return {
                EM: 'delete user Success',
                EC: 0,
                DT: []
            }

        }
        else {
            return {
                EM: 'user not exist',
                EC: -1,
                DT: []
            }

        }
    } catch (error) {
        console.log(error)
        return {
            EM: 'something wrong with service',
            EC: -1,
            DT: []
        }

    }
}



module.exports = { getAllUser, createNewUser, updateUser, deleteUser, getUserPaginaton }