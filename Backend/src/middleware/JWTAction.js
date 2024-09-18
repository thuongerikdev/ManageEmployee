import jwt, { decode } from 'jsonwebtoken'
require ('dotenv').config()

const nonSecurePaths = [ '/', '/logout', '/register' , '/login'] ; 



const createJWT = (payload) => {

    let key = process.env.JWT_SECRET
    let token = null
    try {
         token = jwt.sign( payload, key,{expiresIn : process.env.JWT_EXPIRES_IN,})

    } catch (error) {
        console.log(error)
    } 
    return token
}
const verifyToken = (token) => {
    let key = process.env.JWT_SECRET;

    let decoded = null 
    try {
         decoded = jwt.verify(token , key)
     
    } catch (error) {
        console.log(error)
        
    }
    return decoded

}


function extractToken (req) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        return req.headers.authorization.split(' ')[1];
    } 
    return null;
}

const checkUserJWT = (req , res , next) => {

    if(nonSecurePaths.includes(req.path)) return next () ; 

    let cookies = req.cookies;

    const tokenFromHeader = extractToken(req)
    if(cookies && cookies.jwt||tokenFromHeader ) {
       
        let token = cookies && cookies.jwt  ? cookies.jwt : tokenFromHeader
        let decoded = verifyToken(token);
        console.log('cookies : ' , cookies)
        if(decoded){
    
            req.user = decoded
   
            next()
        }
        else{
            return res.status(401).json(
                {
                    EC : -1,
                    DT : '',
                    EM:'Not authenticate User'
                }
            )
        }

       
    }
    else {
        return res.status(401).json(
            {
                EC : -1,
                DT : '',
                EM:'Not authenticate User'
            }
        )
    }
  
    
}
const checkUserPermission = (req , res , next) => {

    if(nonSecurePaths.includes(req.path)||req.path ==='/account') return next () ; 

    if(req.user) {
        let email = req.user.email
        let roles = req.user.groupWithRole.Roles
        let currentUrl = req.path ; 

        let canAccess = roles.some(item => item.url == currentUrl || currentUrl.includes(item.url))

        if(!roles||roles.length==0) {
            return res.status(403).json(
            {
                EC : -1,
                DT : '',
                EM:`you dont have  permission to access this  resourse ....`
            }
        )
        }
        if (canAccess == true) {
            next()
        }
        else {
             return res.status(403).json(
            {
                EC : -1,
                DT : '',
                EM:`you dont have  permission to access this  resourse ....`
            }
        )
        }
    }
    else {
        return res.status(401).json(
            {
                EC : -1,
                DT : '',
                EM:'Not authenticate User'
            }
        )
    }
}
module.exports = {createJWT , verifyToken , checkUserJWT , checkUserPermission}



