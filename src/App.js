import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Logout from './components/Logout';
import UserPanel from './components/UserPanel';
import LoadingComponent from './components/Loading';

function App() {
  const [loggedIn, setLoggedIn] = useState(null);

  useEffect(() => {
    setTimeout(() => {
      const token = localStorage.getItem('jwt');
      if (token) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    }, 1000);
  }, []);

  if (loggedIn === null) {
    return <LoadingComponent />;
  }

  return (
    <Router>
      <div className='App'>
        {loggedIn ? (
          <>
            <Logout setLoggedIn={setLoggedIn} />
            <Routes>
              <Route path='/' element={<UserPanel />} />
            </Routes>
          </>
        ) : (
          <Login setLoggedIn={setLoggedIn} />
        )}
      </div>
    </Router>
  );
}

export default App;
