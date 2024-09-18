import axios from "../setup/axios"

const createRole = (roles) => {
    return axios.post('/api/v1/role/create', [...roles])
}
const fetchAllRole = (page , limit)=> {
    return axios.get(`/api/v1/role/read?page=${page}&limit=${limit}`)
}
const deleteRole = (role) => {
    return axios.delete('/api/v1/role/delete' , {
        data : {id : role.id}
    })
}
const fetchNotPageRole = (page , limit)=> {
    return axios.get(`/api/v1/role/readnotpage`)
}
const fetchRolebyGrop = (groupId) => {
    return axios.get(`/api/v1/role/by-group/${groupId}`)
}
const assignRoleToGroup = (data) => {
    return axios.post('/api/v1/role/assign-to-group', {data})
}
//readnotpage
export{assignRoleToGroup ,createRole , fetchRolebyGrop,fetchAllRole , deleteRole , fetchNotPageRole}