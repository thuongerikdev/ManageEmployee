import {Switch,Route,} from "react-router-dom";
import Login from "../components/login/login";
import User from "../components/ManageUsers/Users";
import Register from '../components/register/register';
import PrivateRoutes from "./PrivateRoutes";
import Role from "../components/Role/Role";
import GroupRole from "../components/group-role/GroupRole";
import homePage from "../components/homePage/Home";
import Home from "../components/homePage/Home";




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
                <PrivateRoutes path = "/roles" component= {Role}/>
                <PrivateRoutes path = "/group-role" component= {GroupRole}/>

                <Route path="/login">
                    <Login />
                </Route>
                <Route path="/register">
                    <Register />
                </Route>
                <Route path="/" exact>
                    <Home/>
                </Route>
                <Route path="*">
                    error 404
                </Route>

            </Switch>

        </>


    )

}
export default AppRoutes