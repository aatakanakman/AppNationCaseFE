import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import UserList from './UserList';
import UserForm from './UserForm';
import UserUpdate from './UserUpdate';
import customFetch from '../utils/customFetch';

const Panel = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
  border-radius: 8px;
`;

const UserPanel = () => {
  const [users, setUsers] = useState([]);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');
  useEffect(() => {
    getAllUsers();
  }, []);

  const handleUpdateModal = (id) => {
    setSelectedUserId(id);
    setShowUpdateModal(true);
  };

  const getAllUsers = () => {
    customFetch('users', { headers: { 'Content-Type': 'application/json' } })
      .then((res) => res.json())
      .then((data) => setUsers(data));
  };

  const handleDelete = (userId) => {
    customFetch(`users/${userId}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          alert('User deleted successfully');
          getAllUsers();
        } else {
          alert(data.message);
        }
      })
      .catch((error) => {
        console.error('Error updating user:', error);
      });
  };

  return (
    <Panel>
      <UserList
        users={users}
        onDelete={handleDelete}
        setAddUserModal={setShowCreateModal}
        setShowUpdateModal={handleUpdateModal}
      />
      {showCreateModal && (
        <UserForm
          onClose={() => setShowCreateModal(false)}
          getAllUsers={getAllUsers}
        />
      )}
      {showUpdateModal && (
        <UserUpdate
          id={selectedUserId}
          onClose={() => setShowUpdateModal(false)}
          getAllUsers={getAllUsers}
        />
      )}
    </Panel>
  );
};

export default UserPanel;
