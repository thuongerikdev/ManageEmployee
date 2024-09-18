
import './App.scss';
import AppRoutes from './routes/AppRoutes';
import NavHeader from './components/navigation/NavHeader';
import 'bootstrap/dist/css/bootstrap.min.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, } from "react-router-dom";
import { useContext, useEffect, useState } from 'react';
import { Rings } from 'react-loader-spinner'
import { UserContext } from './context/UserContext';
import { Scrollbars } from 'react-custom-scrollbars';

function App() {
  const { user } = useContext(UserContext)
  const [scrollHeight , setScrollHeight] = useState(0)

  useEffect(()=> {
    let windowHeight = window.innerHeight ;
    setScrollHeight(windowHeight)
  }, [user]);

  return (
    <Scrollbars autoHide style = {{height : scrollHeight}} >
      <Router>
        {user && user.isLoading === true ?
          <div className='loading_container'>
            <Rings
              height="80"
              width="80"
              radius="9"
              color="green"
              ariaLabel="loading"
              wrapperStyle

            />
            <div>
              loading data container
            </div>
          </div>
          :
          <>
            <div className='app-header'>
              <NavHeader />
            </div>
            <div className="app-container">
              <AppRoutes />
            </div>
          </>


        }



      </Router>
      <ToastContainer
        position="bottom-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover

      />
      </Scrollbars>
      );
}

      export default App;




      {/* {
          account && !_.isEmpty(account) && account.isAuthenticated
          &&     <Nav />
        } */}