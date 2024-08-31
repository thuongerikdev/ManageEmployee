import {Switch,Route,} from "react-router-dom";
import Login from "../components/login/login";
import User from "../components/ManageUsers/Users";
import Register from '../components/register/register';
import PrivateRoutes from "./PrivateRoutes";




const AppRoutes = (props) => {

    const Project = ()=>{
        return (
            <span> Project </span>
        )
    }
    return (

        <>
            <Switch>
                <PrivateRoutes path = "/users" component = {User} />
                <PrivateRoutes path = "/project" component= {Project}/>

                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/" exact>
                    home
                </Route>
                <Route path="*">
                    error 404
                </Route>

            </Switch>

        </>


    )

}
export default AppRoutes