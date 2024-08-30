
import './App.scss';
import Login from './components/login/login';
import Nav from './components/navigation/nav';
import Register from './components/register/register';
import 'bootstrap/dist/css/bootstrap.min.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import User from './components/ManageUsers/Users';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import _ from 'lodash'

import { useEffect, useState } from 'react';

function App() {
  const [account , setAccount] = useState('')

  useEffect(()=> {
    let session = sessionStorage.getItem('account');
    if(session){
        setAccount(JSON.parse(session))
    }
  } ,[])

  return (
    <Router>
      <div className="app-container">
        {
          account && !_.isEmpty(account) && account.isAuthenticated
          &&     <Nav />
        }
   
        <Switch>
          <Route path="/about">
            about
          </Route>
          <Route path="/news">
            news
          </Route>
          <Route path="/contact">
            contact
          </Route>
   
          <Route path="/" exact>
            home
          </Route>


          <Route path="/login">
            <Login />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/users">
            <User />
          </Route>


          <Route path="*">
            error 404
          </Route>

        </Switch>
      </div>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
    
/>

    </Router>
  );
}

export default App;
