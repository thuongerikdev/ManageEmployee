import { where } from "sequelize"
import db from "../models"

const createNewRole = async (roles) => {
    try {

        let currentRoles = await db.Role.findAll({
            attributes: ['url', 'description'],
            raw: true
        })
        const persist = roles.filter(({ url: url1 }) => !
            currentRoles.some(({ url: url2 }) => url1 === url2))

        if (persist.length === 0) {
            return {
                EM: 'nothing tho create',
                EC: 0,
                DT: []
            }
        }

        console.log(currentRoles)


        await db.Role.bulkCreate(persist);
        return {
            EM: `create  ${persist.length} roles success`,
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
const getAllRole = async () => {
    try {
        let data = await db.Role.findAll()
        return {
            EM: `get all role success `,
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
const getRolePaginaton = async (page, limit) => {
    try {
        let offset = (page - 1) * limit
        let { count, rows } = await db.Role.findAndCountAll({

            offset: offset,
            limit: limit,

            attributes: ["id", "url", "description"],
            order: [['id', 'DESC']]
        })
        let totalPage = Math.ceil(count / limit)

        let data = {
            totalRows: count,
            totalPage: totalPage,
            roles: rows
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
const deleteRole = async (id) => {
    try {
        let role = await db.Role.findOne({
            where: { id: id }
        })
        await role.destroy()
        return {
            EM: 'delete Role success',
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
const getRolebyGroup = async (id) => {
    try {
        if (!id) {
            return {
                EM: 'not found any role',
                EC: 0,
                DT: []
            }
        }

        let roles = await db.Group.findOne({
            where: { id: id },
            attributes: ['id', 'name', 'description'],
            include: {
                model: db.Role,
                attributes: ['id', 'url', 'description'],
                through: { attributes: [], }

            },
        })
        return {
            EM: 'get Role by Group success',
            EC: 0,
            DT: roles
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

const assignToGroup = async (data) => {
    try {
        // console.log(data)

        await db.Group_Role.destroy({
            where:{ groupId : +data.groupId}
        })
        await db.Group_Role.bulkCreate(data.GroupRoles)
        return {
            EM: 'Assign role to group success',
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

module.exports = { assignToGroup ,  createNewRole, getAllRole, getRolePaginaton, deleteRole, getRolebyGroup }