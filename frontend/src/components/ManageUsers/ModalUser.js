import { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { fetchGroup } from '../../services/userService';
import { toast } from 'react-toastify';
import _ from "lodash"
import { createNewUser , UpdateCUrrentUser } from '../../services/userService';
import User from './Users';
//not merge state

const ModalUser = (props) => {
    const [UserGroup, setUserGroup] = useState([])
    const { action, dataModalUser } = props

    const defaultUserData = {
        email: '',
        phone: '',
        username: '',
        password: '',
        address: '',
        sex: '',
        group: ''
    }
    const ValidInputsDefault = {
        email: true,
        phone: true,
        username: true,
        password: true,
        address: true,
        sex: true,
        group: true
    }
    const [userData, setUserData] = useState(defaultUserData)
    const [ValidInputs, setValidInputs] = useState(ValidInputsDefault)


    const handleOnchageInput = (value, name) => {
        let _userData = _.cloneDeep(userData)
        _userData[name] = value
        setUserData(_userData)
    }



    useEffect(() => {
        getGroup()
    }, [])

    useEffect(() => {
        if (action === 'EDIT') {
            setUserData({...dataModalUser , group : dataModalUser.Group ? dataModalUser.Group.id : ''})
        }
    }, [dataModalUser])

    useEffect(() => {
        if(action ==='CREATE'){
            if(UserGroup && UserGroup.length>0){
                setUserData({ ...defaultUserData, group: UserGroup[0].id })
            }
        }
    } , [action])

    const getGroup = async () => {
        let res = await fetchGroup();
       

        if (res && res.EC === 0) {
            setUserGroup(res.DT)
            if (res.DT && res.DT.length > 0) {
                let groups = res.DT
                setUserData({ ...defaultUserData, group: groups[0].id })
            }
        }
        else {
            toast.error(res.EM)
        }
    }
    const checkValidateInputs = () => {
        //create user
        if(action==="EDIT") return true

        setValidInputs(ValidInputsDefault)

        let arr = ["email", "phone", "password", "group"]
        let check = true
        for (let i = 0; i < arr.length; i++) {
            if (!userData[arr[i]]) {
                let _validInputs = _.cloneDeep(ValidInputsDefault)
                _validInputs[arr[i]] = false

                setValidInputs(_validInputs)
                toast.error(`empty input ${arr[i]}`)
                check = false;
                break;
            }
            return check
        }
    }
    const handleConfirmUser = async () => {
        let check = checkValidateInputs()
        if (check === true) {
            
            let res = action ==='CREATE' ? 
            await createNewUser({ ...userData, groupId: userData['group'] })
            : await UpdateCUrrentUser({...userData, groupId: userData['group'] })
            

            if (res && res.EC == 0) {
                props.onHide()
                setUserData({
                     ...defaultUserData,
                    group: UserGroup&& UserGroup.length >0 ?  UserGroup[0].id : '' })

            }
            if (res && res.EC != 0) {
                toast.error(res.EM);
                let _validInputs = _.cloneDeep(ValidInputsDefault)
                _validInputs[res.DT] = false

                setValidInputs(_validInputs)
            }
        }



    }
    const handleCLoseModalUser= () => {
        props.onHide ()
        setUserData(defaultUserData)
        setValidInputs(ValidInputsDefault)
    }
   

    return (
        <>
            <Modal
                size="lg" show={props.show}
                className="modal-user"
                centered
                onHide={() => handleCLoseModalUser()}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <span> {props.action == 'CREATE' ? 'Create new user' : 'Edit user'}</span>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className='content-body row'>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Email (<span className="red">*</span>):</label>
                            <input disabled={action ==='CREATE' ? false : true} className={ValidInputs.email ? 'form-control ' : 'form-control is-invalid'} type="email" value={userData.email}
                                onChange={(event) => handleOnchageInput(event.target.value, "email")}
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Phone Number (<span className="red">*</span>):</label>
                            <input disabled={action ==='CREATE' ? false : true} className={ValidInputs.phone ? 'form-control ' : 'form-control is-invalid'} type="text" value={userData.phone}
                                onChange={(event) => handleOnchageInput(event.target.value, "phone")}
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Username :</label>
                            <input className="form-control" type="text" value={userData.username}
                                onChange={(event) => handleOnchageInput(event.target.value, "username")}
                            />
                        </div>

                        <div className="col-12 col-sm-6 form-group">
                            {action === 'CREATE' &&
                                <>
                                    <label>Password (<span className="red">*</span>):</label>
                                    <input className={ValidInputs.password ? 'form-control ' : 'form-control is-invalid'} type="pasword" value={userData.password}
                                        onChange={(event) => handleOnchageInput(event.target.value, "password")}
                                    />
                                </>
                            }

                        </div>

                        <div className="col-12 col-sm-12 form-group">
                            <label>Address :</label>
                            <input className="form-control" type="text" value={userData.address}
                                onChange={(event) => handleOnchageInput(event.target.value, "address")}
                            />
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Gender :</label>
                            <select className="form-select"
                                onChange={(event) => handleOnchageInput(event.target.value, "sex")}
                            >
                                <option defaultValue> Male</option>
                                <option> Female</option>
                                <option> Other</option>
                            </select>
                        </div>
                        <div className="col-12 col-sm-6 form-group">
                            <label>Group (<span className="red">*</span>):</label>
                            <select className={ValidInputs.group ? 'form-select ' : 'form-select is-invalid'}
                                value={userData.group} onChange={(event) => handleOnchageInput(event.target.value, "group")}
                            >
                                {UserGroup.length > 0 &&
                                    UserGroup.map((item, index) => {
                                        return (
                                            <option key={`group ${index} `} value={item.id}>{item.name}</option>
                                        )
                                    })
                                }

                            </select>
                        </div>

                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={props.onHide}>Close</Button>
                    <Button variant="primary" onClick={() => handleConfirmUser()}>
                       {action === 'CREATE' ? 'Save' : 'Update'}
                    </Button>
                </Modal.Footer>
            </Modal>

        </>
    )
}
export default ModalUser