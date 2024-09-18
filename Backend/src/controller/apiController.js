
const loginRegisterService = require('../service/loginRegisterService')

const testAPI = (req, res) => {
    res.status(200).json({
        message: "ok",
        data: "datavip"
    });
};

const handleRegister = async (req, res) => {
  
    try {
        if (!req.body.email || !req.body.phone || !req.body.password) {
            return res.status(200).json({
                EM: 'Missing required paramenter', //error mesage
                EC: '0', //error code
                DT: '' //data
            })

        }
        if (req.body.password && req.body.password.length < 3) {
            return res.status(200).json({
                EM: 'your password must have more than 3 character', //error mesage
                EC: '0', //error code
                DT: '' //data
            })
        }

        let data = await loginRegisterService.registerNewUSer(req.body)

        return res.status(200).json({
            EM: data.EM, //error mesage
            EC: data.EC, //error code
            DT: '' //data
        })

    }
    catch (e) { 
        return res.status(500).json({
            EM: 'error', //error mesage
            EC: '-1', //error code
            DT: '' //date
        })
    }
}
const handleLogin = async (req, res) => {

   
    try {
     
        let data = await loginRegisterService.handleUserLogin(req.body)

        if(data && data.DT.access_token){
            res.cookie("jwt" , data.DT.access_token , {httpOnly : true ,maxSge : 60*60*1000})
        }

        
        return res.status(200).json({
            EM: data.EM, //error mesage
            EC: data.EC, //error code
            DT: data.DT //data
        })
    } catch (error) {
        return res.status(500).json({
            EM: 'error', //error mesage
            EC: '-1', //error code
            DT: '' //date
        })
    }


}
const handleLogout = async (req, res) => {
    try {
        
        res.clearCookie("jwt")
        return res.status(200).json({
            EM: 'clear cookie done', //error mesage
            EC: 0, //error code
            DT: '' //data
        })
    } catch (error) {
        return res.status(500).json({
            EM: 'error', //error mesage
            EC: '-1', //error code
            DT: '' //date
        })
    }

}

module.exports = {
    testAPI,
    handleRegister,
    handleLogin,
    handleLogout
}