
import './App.scss';
import AppRoutes from './routes/AppRoutes';
import Nav from './components/navigation/nav';
import 'bootstrap/dist/css/bootstrap.min.css'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BrowserRouter as Router, } from "react-router-dom";
import { useEffect, useState } from 'react';

function App() {
  const [account, setAccount] = useState('')

  useEffect(() => {
    let session = sessionStorage.getItem('account');
    if (session) {
      setAccount(JSON.parse(session))
    }
  }, [])

  return (
    <>
      <Router>
        <div className='app-header'>
          <Nav />
        </div>
        <div className="app-container">
          <AppRoutes />
        </div>


      </Router>
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
    </>
  );
}

export default App;




{/* {
          account && !_.isEmpty(account) && account.isAuthenticated
          &&     <Nav />
        } */}