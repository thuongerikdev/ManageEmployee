import { useEffect, useRef, useState } from 'react'
import './Role.scss'
import _ from 'lodash'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-toastify'
import { createRole } from '../../services/roleService'
import TableRole from './TableRole'

const Role = (props) => {
    const childref = useRef()
    const dataChilddefault = { url: '', description: '', isValidUrl: true }
    const [listChild, setListChild] = useState({
        child1: dataChilddefault,

    })

    const handleOnchangeInput = (name, value, key) => {
        let _lissChild = _.cloneDeep(listChild)

        _lissChild[key][name] = value

        if (value && name === 'url') {
            _lissChild[key]['isValidUrl'] = true
        }
        setListChild(_lissChild)
    }
    const handleAddnewInput = () => {
        let _lissChild = _.cloneDeep(listChild)
        _lissChild[`child-${uuidv4()}`] = dataChilddefault
        setListChild(_lissChild)

    }


    const handleDeleteInput = (key) => {
        let _lissChild = _.cloneDeep(listChild)
        delete _lissChild[key];
        setListChild(_lissChild)
        console.log(key)
    }
    const handleSave = async () => {

        let invalidObj = Object.entries(listChild).find(([key, child], index) => {
            return child && !child.url
        })
        if (!invalidObj) {
            //call api
            let data = buildDatatoPersis()
            let res = await createRole(data)
            if (res && res.EC === 0) {
                toast.success(res.EM)
                childref.current.fetchListRoleAgain()
            }
        }
        else {
            //error
            toast.error('imput url must not be emty....')

            let _lissChild = _.cloneDeep(listChild)
            const key = invalidObj[0]
            _lissChild[key]['isValidUrl'] = false

            setListChild(_lissChild)
        }
    }
    // console.log(listChild)

    const buildDatatoPersis = () => {
        let _lissChild = _.cloneDeep(listChild);
        let result = []
        Object.entries(listChild).find(([key, child], index) => {
            result.push({
                url: child.url,
                description: child.description
            })
        })
        return result
    }



    return (
        <div className='role-container'>
            <div className='container'>
                <div className='adding-roles row mt-3'>
                    <div className='title-row'>
                        <h4> Add a new role</h4>
                    </div>
                    <div className=' role-parent'>
                        {
                            Object.entries(listChild).map(([key, child], index) => {
                                return (
                                    <div className=' row role-child' key={`child ${key}`}>
                                        <div className={`col-5 form-group ${key}`} >
                                            <label>
                                                URL :
                                            </label>
                                            <input type='text'
                                                className={child.isValidUrl ? 'form-control ' : 'form-control is-invalid'}
                                                value={child.url}
                                                onChange={(event) => handleOnchangeInput('url', event.target.value, key)}
                                            ></input>
                                        </div>
                                        <div className='col-5 form-group'>
                                            <label>
                                                Description :
                                            </label>
                                            <input type='text' className='form-control'
                                                value={child.description}
                                                onChange={(event) => { handleOnchangeInput('description', event.target.value, key) }}

                                            ></input>
                                        </div>
                                        <div className='col-2 mt-4 actions'>
                                            <i className="fa fa-plus-circle add" onClick={() => handleAddnewInput()} />
                                            {index >= 1 && <i className="fa fa-trash-o delete"
                                                onClick={() => handleDeleteInput(key)}
                                            />
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                        <div>
                            <button className='btn btn-warning mt-3' onClick={() => handleSave()}> Save</button>
                        </div>

                    </div>
                </div>
                <hr></hr>
                <div className='mt-3 table-role'>
                    <h4>List Current Role : </h4>
                    <TableRole ref = {childref}></TableRole>
                </div>
                
            </div>

        </div>
    )

}
export default Role