import { useState } from 'react';
import './login.scss'
import { useHistory } from 'react-router-dom'
import { toast } from 'react-toastify';
import {loginUSer} from '../../services/userService'


const Login = (props) => {
    let history = useHistory();

    const [valueLogin, setValueLogin] = useState('')
    const [password, setPassword] = useState('')
    const defaultObjValid = {
        isValidValueLogin : true ,
        isValidPassword  : true
    }

    const [objValidInput , setObjValidInput] = useState(defaultObjValid)

    const handleLogin =  async () => {
        setObjValidInput(defaultObjValid)

        if(!valueLogin){
            setObjValidInput({...defaultObjValid, isValidValueLogin : false})
            toast.error('please enter your email or your phone number')
            return false
        }
        if(!password){
            setObjValidInput({...defaultObjValid , isValidPassword: false})
            toast.error('please enter your password')
            return false
        }
        console.log(valueLogin , password)
        
        let respone = await loginUSer(valueLogin , password);

      

        if (respone && respone.data && +respone.data.EC === 0){
            let data = {
                isAuthenticated : true ,
                token : 'faketoken'
            }
            sessionStorage.setItem('account' , JSON.stringify (data));
            history.push('/users')
        }
        if(respone && respone.data && +respone.data.EC !== 0){
            toast.error(respone.data.EM)
        }

        console.log("check respone" ,respone.data)

     
    }
    

    const handleCreateNewAccount = () => {

        history.push('/register')
    }

    

    return (
        <div className="login-container ">
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
                        <input
                            type='text'
                            className={objValidInput.isValidValueLogin ? 'form-control' : 'is-invalid form-control'}
                            placeholder='email or your phone number'
                            value={valueLogin}
                            onChange={(event) => {setValueLogin(event.target.value)}}
                        />
                        <input
                            type='password'
                            className={objValidInput.isValidPassword ? 'form-control' : 'is-invalid form-control'}
                            placeholder='password'
                           value={password}
                           onChange={(event) => {setPassword(event.target.value)}}
                        />
                        <button className='btn btn-primary' onClick={()=> handleLogin()}> Login</button>
                        <span className='text-center'>
                            <a className='forgot-password' href='#'>Forgot your password</a>
                        </span>
                        <hr></hr>
                        <div className='text-center'>
                            <button className=' btn btn-success' onClick={() => handleCreateNewAccount()}>

                                Create new account

                            </button>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login