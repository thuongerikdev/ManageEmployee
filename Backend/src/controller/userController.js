import userApiService from "../service/userAPIService"

const readFunc = async (req, res) => {

    try {
        
        console.log(req.user)
        if (req.query.page && req.query.limit) {
            let page = req.query.page;
            let limit = req.query.limit
       

            let data = await userApiService.getUserPaginaton(+page , +limit)
            return res.status(200).json({
                EM: data.EM, //error mesage
                EC: data.EC, //error code
                DT: data.DT //data
            })

            console.log("page = " , page ,"limit  = " , limit)
        }
        else {
            let data = await userApiService.getAllUser()

            return res.status(200).json({
                EM: data.EM, //error mesage
                EC: data.EC, //error code
                DT: data.DT //data 
            })
        }




    } catch (error) {
        console.log(error)
        return res.status(500).json({
            EM: 'error', //error mesage
            EC: '-1', //error code
            DT: '' //date
        })
    }
}
const createFunc = async(req, res) => {

    try {
        let data = await userApiService.createNewUser(req.body)
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
const deleteFunc =  async (req, res) => {
    try {
        // console.log(req.body.id)
        let data = await userApiService.deleteUser(req.body.id)
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

const getUserAccount = async(req ,res) => {
    return res.status(200).json({
        EM: 'ok', //error mesage
        EC: 0, //error code
        DT: {
            access_token : req.token,
             groupWithRole  :req.user.groupWithRole,
             email : req.user.email,
             username : req.user.username
        }
    })
}

module.exports = { readFunc, createFunc, updateFunc, deleteFunc  , getUserAccount}