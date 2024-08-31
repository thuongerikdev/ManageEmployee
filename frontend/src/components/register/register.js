import {  useState } from 'react';
import './register.scss'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';

import { registerNewUser } from '../../services/userService';
const Register = (props) => {

    let history = useHistory();


    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPass, setConfirmPass] = useState('')
    const defaultValidInput = {
        isValidEmail: true,
        isValidPhone: true,
        isValidUsername: true,
        isValidPassword: true,
        isValidCondirmPass: true
    }



    const [objCheckValid, setobjCheckValid] = useState(defaultValidInput)


    const isValid = () => {
        setobjCheckValid(defaultValidInput)

        if (!email) {
            toast.error("email is require")
            setobjCheckValid({ ...defaultValidInput, isValidEmail: false })
            return false
        }
        let regix = /\S+@\S+\.\S+/;
        if (!regix.test(email)) {
            toast.error("please ennter a  lalid email")
            setobjCheckValid({ ...defaultValidInput, isValidEmail: false })
            return false
        }

        if (!phone) {
            toast.error("phone is require")
            setobjCheckValid({ ...defaultValidInput, isValidPhone: false })
            return false;
        }
        if (!username) {
            toast.error("username is require")
            setobjCheckValid({ ...defaultValidInput, isValidUsername: false })
            return false;
        }
        if (!password) {
            toast.error("password is require")
            setobjCheckValid({ ...defaultValidInput, isValidPassword: false })
            return false
        }
        if (password !== confirmPass) {
            toast.error("your password is not the same")
            setobjCheckValid({ ...defaultValidInput, isValidCondirmPass: false })
            return false
        }
        return true;

    }


    const handleLogin = () => {

        history.push('/login')
    }



    const handleRegister = async () => {
        let check = isValid()
        if (check === true) {
            let response = await registerNewUser(email , phone , username , password)
            let serverData =  response.data
            if(+serverData.EC === 0){
                toast.success(serverData.EM)
                history.push("/login")
            }
            else {
                toast.error(serverData.EM)
            }
        }

    }

    return (
        <div className="register-container ">
            <div className="container">
                <div className="row px-3 px-sm-0"  >
                    <div className="content-left col-12  d-none col-sm-7 d-sm-block ">
                        <div className='brand'>
                            thuongerikdev
                        </div>
                        <div className='detail'>
                            thuong dep trai
                        </div>
                    </div>

                    <div className="content-right col-sm-5  col-12 d-flex flex-column gap-3 py-3  ">
                        <div className='brand d-sm-none'>
                            thuongerikdev
                        </div>
                        <div className='form-group'>
                            <label>Email</label>
                            <input type='text' className={objCheckValid.isValidEmail ? 'form-control' : ' form-control is-invalid'} value={email} onChange={(event) => { setEmail(event.target.value) }} placeholder='email or your phone number' />
                        </div>

                        <div className='form-group'>
                            <label>Phone Number</label>
                            <input type='text' className={objCheckValid.isValidPhone ? 'form-control' : ' form-control is-invalid'} value={phone} onChange={(event) => { setPhone(event.target.value) }} placeholder='Phone Number or your phone number' />
                        </div>

                        <div className='form-group'>
                            <label>Username </label>
                            <input type='text' className={objCheckValid.isValidUsername ? 'form-control' : ' form-control is-invalid'} value={username} onChange={(event) => { setUsername(event.target.value) }} placeholder='Username Number or your phone number' />
                        </div>

                        <div className='form-group'>
                            <label>Password</label>
                            <input type='password' className={objCheckValid.isValidPassword ? 'form-control' : ' form-control is-invalid'} value={password} onChange={(event) => { setPassword(event.target.value) }} placeholder='password' />
                        </div>

                        <div className='form-group'>
                            <label>Re-enter password</label>
                            <input type='password' className={objCheckValid.isValidCondirmPass ? 'form-control' : ' form-control is-invalid'} value={confirmPass} onChange={(event) => { setConfirmPass(event.target.value) }} placeholder='re-enter' />
                        </div>

                        <button className='btn btn-primary' onClick={() => handleRegister()}> Register</button>

                        <hr></hr>
                        <div className='text-center'>
                            <button className=' btn btn-success' onClick={() => handleLogin()}>

                                Already have account

                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register