require('dotenv').config()
const bcrypt = require('bcryptjs')
const db = require('../models/index')
import { Op } from 'sequelize'
import { Json } from 'sequelize/lib/utils'
import {getGroupWithRoles} from './JWTService'
import {createJWT} from '../middleware/JWTAction'
const salt = bcrypt.genSaltSync(10)

const hashUserPassWord = (userPassword) => {

    let hashPassWord = bcrypt.hashSync(userPassword, salt);
    return hashPassWord;
}
const checkPassword = (inputPassword, hashPassWord) => {
    return bcrypt.compare(inputPassword, hashPassWord)
}

const checkEmail = async (userEmail) => {
    let user = await db.User.findOne({
        where: { email: userEmail }
    })
    if (user) {
        return true
    }
    return false;
}

const checkPhone = async (userPhone) => {

    let user = await db.User.findOne({
        where: { phone: userPhone }
    })
    if (user) {
        return true
    }
    return false;
}

const handleUserLogin = async (rawData) => {

    try {
        let user = await db.User.findOne({
            where: {
                [Op.or]: [
                    { email: rawData.valueLogin },
                    { phone: rawData.valueLogin },
                ]
            }
        })
        if (user) {

            let isCorrectPassword = await checkPassword(rawData.password, user.password)
            if (isCorrectPassword === true) {

                //test role
                let groupWithRole = await getGroupWithRoles(user);
                let payload ={
                    email : user.email,
                    groupWithRole,
                    username : user.username
                }
                let token = createJWT(payload)

                return {
                    EM: 'ok',
                    EC: 0,
                    DT: {
                        access_token : token,
                         groupWithRole ,
                         email : user.email,
                         username : user.username
                    }
                }
            }
           
        }
    
        return {
            EM: 'your email/phone number or password is incorrect',
            EC: 1,
            DT: ''
        }

      


        // if (isPhoneExist === true) {
        //     return {
        //         EM: 'the phone number is already exist',
        //         EC: 1,
        //         DT : ''
        //     }
        // }

    } catch (e) {
        console.log(e)
        return {
            EM: 'something worng with service',
            EC: -2
        }
    }
}

const registerNewUSer = async (rawUserData) => {
    try {
        let isEmailExist = await checkEmail(rawUserData.email)
        console.log("check email", isEmailExist)
        if (isEmailExist === true) {
            return {
                EM: 'the email is already exist',
                EC: 1
            }
        }
        let isPhoneExist = await checkPhone(rawUserData.phone)

        if (isPhoneExist === true) {
            return {
                EM: 'the phone number is already exist',
                EC: 1
            }
        }


        //hash userpassword
        let hashPass = hashUserPassWord(rawUserData.password)

        //create new user
        await db.User.create({
            email: rawUserData.email,
            username: rawUserData.username,
            password: hashPass,
            phone: rawUserData.phone,
            groupId : 4

        })

        return {
            EM: 'a user is create successfully',
            EC: 0
        }
    } catch (e) {
        console.log(e)
        return {
            EM: 'something worng with service',
            EC: -2
        }
    }
    //check email , phonenumber already exist

}


module.exports = { registerNewUSer, handleUserLogin , hashUserPassWord  , checkEmail,checkPhone}