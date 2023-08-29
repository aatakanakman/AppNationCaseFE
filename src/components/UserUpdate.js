import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import customFetch from '../utils/customFetch';

const UpdateModal = styled.div`
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
  width: 30%;
`;

const UpdateButton = styled.button`
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  border: none;
`;
const StyledInput = styled.input`
  width: 80%;
  padding: 10px;
  margin: 15px 0;
  border: 1px solid #ccc;
  border-radius: 4px;
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

const UserUpdate = ({ onClose, getAllUsers, id }) => {
  const [username, setUsername] = useState('');

  useEffect(() => {
    customFetch(`users/${id}`, {
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        setUsername(data.username);
      })
      .catch((error) => {
        console.error('Error fetching user data:', error);
      });
  }, [id]);

  const handleUpdate = () => {
    customFetch(`users/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert('User updated successfully');
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
      <UpdateModal>
        <h2>Update User</h2>
        <StyledInput
          type='text'
          value={username}
          placeholder='New Username'
          onChange={(e) => setUsername(e.target.value)}
        />
        <UpdateButton onClick={handleUpdate}>Update</UpdateButton>
      </UpdateModal>
    </>
  );
};

export default UserUpdate;
