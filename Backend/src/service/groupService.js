const db = require("../models")



const getGroups = async () => {
    try {
        let data = await db.Group.findAll({
            order : [['name' , 'ASC']]
        })
        return {
            EM: 'get group Success',
            EC: 0,
            DT: data
        }
        
    } catch (error) {
        console.log(error)
        return {
            EM: 'error from service',
            EC: -1,
            DT: []
        }
    }
}

module.exports = {
    getGroups
}