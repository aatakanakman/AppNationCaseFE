import React, { useState } from 'react';
import styled from 'styled-components';
import customFetch from '../utils/customFetch';
import LoadingComponent from './Loading';

const LoginTitle = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;
const Login = ({ setLoggedIn }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    customFetch('users/auth', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
          localStorage.setItem('userRole', data.role);
          setLoggedIn(true);
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      })
      .finally(() => setLoading(false));
  };

  if (loading) {
    return <LoadingComponent />;
  }

  return (
    <LoginWrapper>
      <LoginForm onSubmit={handleSubmit}>
        <LoginTitle>Login</LoginTitle>
        <LoginInput
          type='text'
          placeholder='Username'
          onChange={(e) => setUsername(e.target.value)}
        />
        <LoginInput
          type='password'
          placeholder='Password'
          onChange={(e) => setPassword(e.target.value)}
        />
        <LoginButton type='submit'>Login</LoginButton>
      </LoginForm>
    </LoginWrapper>
  );
};

export default Login;

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f2f2f2;
  padding: 20px;
`;

const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 40px;
  background-color: #fff;
  width: 30%;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
`;

const LoginInput = styled.input`
  display: block;
  width: 80%;
  margin-bottom: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const LoginButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  width: 40%;
  margin: auto;
  display: block;
  border: none;
  &:hover {
    background-color: #0056b3;
  }
`;
