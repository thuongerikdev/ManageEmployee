const groupService = require('../service/groupService')
const readFunc = async(req ,res) => {
    try {
        let data = await groupService.getGroups()

        return res.status(200).json({
            EM: data.EM, //error mesage
            EC: data.EC, //error code
            DT: data.DT //data
        })
    } catch (error) {
        console.log(error)

        return res.status(500).json({
            EM: "error from service", //error mesage
            EC: -1, //error code
            DT: '' //data
        })
        
    }
}

module.exports = {readFunc}