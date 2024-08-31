import { where } from 'sequelize'
import db from '../models/index'

const getAllUser = async () => {
    try {
        let users = await db.User.findAll({
            include: {
                model: db.Group,
            },
            attributes: ["id", "email", "username"],
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
const getUserPaginaton =  async (page , limit)=> {
    try {
        let offset = (page -1) * limit
        let {count , rows } = await db.User.findAndCountAll ({
            offset : offset ,
            limit : limit, 
        })
        let totalPage = Math.ceil(count/limit)

        let data = {
            totalRows : count  , 
            totalPage : totalPage , 
            users : rows 
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
    try {
        await db.User.create({

        })
    } catch (error) {
        console.log(error)
        
    }
}
const updateUser = async(data) => {
    try {
        let users = await db.USer.findOne({
            where: {id : data.id}
        })
        if(users){
            
        }
        else {

        }
       
    } catch (error) {
        console.log(error)
        
    }
}
const deleteUser = async(id) => {
    try {
        await db.User.delete({
            where :{id : id}
        })
    } catch (error) {
        console.log(error)
        
    }
}



module.exports = { getAllUser, createNewUser, updateUser, deleteUser  , getUserPaginaton}