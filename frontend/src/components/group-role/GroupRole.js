import './GroupRole.scss'
import { useEffect, useState } from 'react'
import { fetchGroup } from '../../services/userService'
import { toast } from 'react-toastify'
import { assignRoleToGroup, fetchNotPageRole, fetchRolebyGrop } from '../../services/roleService'
import _, { assign } from 'lodash'

const GroupRole = () => {
    const [userGroup, setUserGroup] = useState([])
    const [selectGroup, setSelectGroup] = useState('')
    const [ListRoles, setListRole] = useState([])
    const [assignRoleByGroup, setAssignRoleByGroup] = useState([])

    useEffect(() => {
        getGroup()
        fetchAllRole()
    }, [])
    const getGroup = async () => {
        let res = await fetchGroup();

        if (res && res.EC === 0) {
            setUserGroup(res.DT)
        }
        else {
            toast.error(res.EM)
        }
    }
    const handleOnchangeSelect = () => {

    }
    const fetchAllRole = async (page) => {
        let respone = await fetchNotPageRole()
        // console.log('check resonpone' , respone)
        if (respone && respone.EC === 0) {
            setListRole(respone.DT)
        }
    }

    const handleOnchangeGroup = async (value) => {
        setSelectGroup(value)
        if (value) {
            let data = await fetchRolebyGrop(value)
            if (data && +data.EC === 0) {
                let result = buildDataRolesByGroup(data.DT.Roles, ListRoles)
                setAssignRoleByGroup(result)
            }
        }

    }
    const buildDataRolesByGroup = (groupRoles, allRoles) => {
        let result = []
        if (allRoles && allRoles.length > 0) {
            allRoles.map(role => {
                let object = {};
                object.url = role.url
                object.id = role.id
                object.description = role.description;
                object.isAssigned = false;
                if (groupRoles && groupRoles.length > 0) {
                    object.isAssigned = groupRoles.some(item => item.url === object.url)
                }
                result.push(object)
            })
        }
        return result
    }
    const handleSelectRole = (value) => {
    
        const _assignRoleByGroup = _.cloneDeep(assignRoleByGroup)
        let foundIndex = assignRoleByGroup.findIndex(item => +item.id === +value)
        // console.log("index" , foundIndex)
        if(foundIndex > -1) {
            _assignRoleByGroup[foundIndex].isAssigned =!_assignRoleByGroup[foundIndex].isAssigned 
        }
        setAssignRoleByGroup(_assignRoleByGroup)
        // 
    }
    const buldDataToSave = () => {
        const _assignRoleByGroup = _.cloneDeep(assignRoleByGroup); 
        let result = {} ;
        result.groupId = selectGroup
        let groupRoles = _assignRoleByGroup.filter(item => item.isAssigned ===true)
        let finalGroupRole = groupRoles.map (item => {
            let data = {groupId  :+selectGroup , roleId: +item.id}
            return data
        })
        console.log(finalGroupRole)
        result.GroupRoles = finalGroupRole
  

        return result
    }
    const handleSave = async() => {
        let data = buldDataToSave()
        console.log(data)
        let res = await assignRoleToGroup(data)
        if(res && res.EC ===0) {
            toast.success(res.EM)
        }
    }


    return (
        <div className="group-role-container">
            <div className='container'>
                <div className='container mt-3'>
                    <h4> Group Role</h4>
                    <div>
                        Select Group :
                        <div className='assign-group-role'>
                            <div className="col-12 col-sm-6 form-group">
                                <label>Group (<span className="red">*</span>):</label>
                                <select className='form-select '
                                    onChange={(event) => handleOnchangeGroup(event.target.value)}
                                >
                                    <option value="">Please select your group</option>
                                    {userGroup.length > 0 &&
                                        userGroup.map((item, index) => {
                                            return (
                                                <option key={`group ${index} `} value={item.id}>{item.name}</option>
                                            )
                                        })
                                    }

                                </select>
                            </div>
                            <hr />
                            {selectGroup &&
                                <div className='roles'>
                                    <h5>Assign Role</h5>
                                    {
                                        assignRoleByGroup && ListRoles.length > 0
                                        && assignRoleByGroup.map((item, index) => {
                                            return (
                                                <div className="form-check" key={`list-role ${index}`}>
                                                    <input
                                                        className="form-check-input"
                                                        type="checkbox"
                                                        value={item.id}
                                                        checked={item.isAssigned}
                                                        id={`list-role-${index}`}
                                                        onChange={(event) => handleSelectRole(event.target.value)}
                                                    />
                                                    <label className="form-check-label" htmlFor={`list-role-${index}`}>
                                                        {item.url}
                                                    </label>
                                                </div>

                                            )
                                        })
                                    }

                                    <div className='mt-3'>
                                    <button className='btn btn-warning' onClick={()=> handleSave()}>Save</button>
                                    </div>
                                </div>
                            }
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}
export default GroupRole