import axios from "axios"

const registerNewUser = (email, phone, username, password) => {
    return axios.post('http://localhost:8082/api/v1/register', {
        email, phone, username, password
    })
}
const loginUSer = (valueLogin, password) => {
    return axios.post('http://localhost:8082/api/v1/login', {
        valueLogin, password
    })
}


export { registerNewUser, loginUSer } 