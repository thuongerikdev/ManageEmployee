import React, { useEffect, useState } from "react";
import { getUserAccount } from "../services/userService";


const UserContext = React.createContext(null);


const UserProvider = ({ children }) => {

    const userDefault = {
        isLoading : true ,
        isAuthenticated: false,
        token: "",
        account: {}
    }
    const [user, setUser] = useState(userDefault)

    // Login updates the user data with a name parameter
    const loginContext = (userData) => {
        setUser({...userData , isLoading : false})
    };

    // Logout updates the user data to default
    const logoutContext = () => {
        setUser({...userDefault , isLoading : false})

    };
    const fetchUser = async () => {
        let respone = await getUserAccount()
        if (respone && respone.EC === 0) {
            let groupWithRole = respone.DT.groupWithRole
            let email = respone.DT.email
            let username = respone.DT.username
            let token = respone.DT.access_token

            let data = {
                isAuthenticated: true,
                token,
                account: { groupWithRole, email, username },
                isLoading : false
            }
            
                setUser(data)
        }
        else{
            setUser({...userDefault , isLoading : false})
        }
        
    }
    useEffect(() => {
        if (window.location.pathname!=='/' && window.pathname !== '/') {
            fetchUser()
        }
        else{
            setUser({...user , isLoading : false})
        }

    }, [])

    return (
        <UserContext.Provider value={{ user, loginContext, logoutContext }}>
            {children}
        </UserContext.Provider>
    );
}
export { UserProvider, UserContext }