import roleApiService from "../service/roleApiService"

const readFunc = async (req, res) => {
    try {
        console.log(req.user)
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit
            let data = await roleApiService.getRolePaginaton(+page, +limit)
            return res.status(200).json({
                EM: data.EM, //error mesage
                EC: data.EC, //error code
                DT: data.DT //data
            })

            console.log("page = ", page, "limit  = ", limit)

        }
        // else {
        //     // let data = await userApiService.getAllRole()
        //     return res.status(200).json({
        //         EM: data.EM, //error mesage
        //         EC: data.EC, //error code
        //         DT: data.DT //data
        //     })
        // }




    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error', //error mesage
            EC: '-1', //error code
            DT: '' //date
        })
    }
}
const ReadFuncNotPage = async (req, res) => {
    try {
        let data = await roleApiService.getAllRole()
        return res.status(200).json({
            EM: data.EM, //error mesage
            EC: data.EC, //error code
            DT: data.DT //data
        })

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error', //error mesage
            EC: '-1', //error code
            DT: '' //date
        })
    }
}
const createFunc = async (req, res) => {

    try {
        let data = await roleApiService.createNewRole(req.body)
        return res.status(200).json({
            EM: data.EM, //error mesage
            EC: data.EC, //error code
            DT: data.DT //data
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error', //error mesage
            EC: '-1', //error code
            DT: '' //date
        })
    }
}
const updateFunc = async (req, res) => {
    try {
        let data = await userApiService.updateUser(req.body)
        return res.status(200).json({
            EM: data.EM, //error mesage
            EC: data.EC, //error code
            DT: data.DT //data
        })


    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error', //error mesage
            EC: '-1', //error code
            DT: '' //date
        })
    }

}
const deleteFunc = async (req, res) => {
    try {
        // console.log(req.body.id)
        let data = await roleApiService.deleteRole(req.body.id)
        return res.status(200).json({
            EM: data.EM, //error mesage
            EC: data.EC, //error code
            DT: data.DT //data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error', //error mesage
            EC: '-1', //error code
            DT: '' //date
        })
    }

}

const getRoleByGroup = async (req, res) => {
    try {
       let id = req.params.groupId
        let data = await roleApiService.getRolebyGroup(id)
        return res.status(200).json({
            EM: data.EM, //error mesage
            EC: data.EC, //error code
            DT: data.DT //data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error', //error mesage
            EC: '-1', //error code
            DT: '' //date
        })
    }
}
const assignToGroup = async (req, res) => {
    try {
   
        // console.log(req.body.data) 
        let data = await roleApiService.assignToGroup(req.body.data)
        return res.status(200).json({
            EM: data.EM, //error mesage
            EC: data.EC, //error code
            DT: data.DT //data
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error', //error mesage
            EC: '-1', //error code
            DT: '' //date
        })
    }
}

module.exports = {assignToGroup, readFunc, ReadFuncNotPage, createFunc, updateFunc, deleteFunc, getRoleByGroup }