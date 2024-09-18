import { useEffect , useContext } from "react"
import {Route, useHistory , Redirect} from "react-router-dom";
import { UserContext } from "../context/UserContext";




const PrivateRoutes = (props) => {
    const {user} = useContext(UserContext)

    console.log("check context User" , user)
    let history = useHistory()

    useEffect(()=> {
//     let session = sessionStorage.getItem('account');
//     if(!session){
//         history.push("/login")
//         window.location.reload()
//     }
  } ,[])


  if(user && user.isAuthenticated ===true) {
    return (
        <>
            <Route path ={props.path} component = {props.component}/>
        </>
    )
  }
  else {
    return <Redirect to='/login'></Redirect>
  }

   
}

export default PrivateRoutes