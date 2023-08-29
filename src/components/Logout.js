import React from 'react';
import styled from 'styled-components';

const LogoutButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: #dc3545;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const Logout = ({ setLoggedIn }) => {
  const handleLogout = () => {
    localStorage.removeItem('jwt');
    setLoggedIn(false);
  };

  return <LogoutButton onClick={handleLogout}>Logout</LogoutButton>;
};

export default Logout;
