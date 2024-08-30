import { useEffect } from "react"
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";


const User  = (props) => {
    let history = useHistory()
    useEffect(()=> {
    let session = sessionStorage.getItem('account');
    if(!session){
        history.push("/login")
    }
  } ,[])

    return (
        <div>
            Users components
        </div>
    )
}
export default User