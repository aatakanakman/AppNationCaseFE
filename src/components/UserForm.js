import React, { useState } from 'react';
import styled from 'styled-components';
import customFetch from '../utils/customFetch';

const Modal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: white;
  border: 1px solid #ccc;
  padding: 20px;
  border-radius: 8px;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 1000;
  width: 40%;
`;
const Form = styled.form`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Label = styled.label`
  font-weight: bold;
  margin: 10px 0;
  width: 80%;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin: 5px 0 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  border: none;
`;

const TopContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 999;
`;
const UserForm = ({ onClose, getAllUsers }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('member');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (username.length < 3 || password.length < 5) {
      alert(
        'Username must be at least 3 characters and password must be at least 5 characters.'
      );
      return;
    }

    customFetch('users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        username,
        password,
        role,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert(data.message);
          getAllUsers();
          onClose();
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  };

  return (
    <>
      <Backdrop onClick={onClose} />
      <Modal>
        <TopContainer>
          <h1>Add User</h1>
          <Button onClick={onClose}>X</Button>
        </TopContainer>
        <Form onSubmit={handleSubmit}>
          <Label>
            Username
            <Input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </Label>
          <Label>
            Password
            <Input
              type='password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Label>
          <Label>
            Role
            <Select value={role} onChange={(e) => setRole(e.target.value)}>
              <option value='MEMBER'>Member</option>
              <option value='ADMIN'>Admin</option>
            </Select>
          </Label>
          <Button type='submit'>Add User</Button>
        </Form>
      </Modal>
    </>
  );
};

export default UserForm;
