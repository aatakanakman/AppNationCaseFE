import React, { useState } from 'react';
import styled from 'styled-components';
import ConfirmModal from './ConfirmModal/ConfirmModal';

const UserList = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState(null);

  const handleDeleteClick = (userId) => {
    setShowModal(true);
    setUserIdToDelete(userId);
  };

  const handleConfirmDelete = () => {
    setShowModal(false);
    props.onDelete(userIdToDelete);
  };

  const handleCancelDelete = () => {
    setShowModal(false);
    setUserIdToDelete(null);
  };
  return (
    <ListContainer>
      <TopContainer>
        <h2>User List</h2>
        <AddButton onClick={() => props.setAddUserModal(true)}>
          Add New User
        </AddButton>
      </TopContainer>
      <Table>
        <thead>
          <TableRow>
            <TableHeader>Username</TableHeader>
            <TableHeader>Role</TableHeader>
            <TableHeader>Actions</TableHeader>
          </TableRow>
        </thead>
        <tbody>
          {props.users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user?.username}</TableCell>
              <TableCell>{user?.role}</TableCell>
              <TableCell>
                <UpdateButton onClick={() => props.setShowUpdateModal(user.id)}>
                  Update
                </UpdateButton>
                <DeleteButton onClick={() => handleDeleteClick(user.id)}>
                  Delete
                </DeleteButton>
              </TableCell>
            </TableRow>
          ))}
        </tbody>
      </Table>
      {showModal && (
        <ConfirmModal
          message='Are you sure you want to delete this user?'
          onConfirm={handleConfirmDelete}
          onCancel={handleCancelDelete}
        />
      )}
    </ListContainer>
  );
};

export default UserList;

const DeleteButton = styled.button`
  background-color: #f44336;
  color: white;
  border: none;
  padding: 10px;
  margin: 5px;
  border-radius: 4px;
  cursor: pointer;
  border: none;
  &:hover {
    background-color: #d32f2f;
  }
`;

const UpdateButton = styled.button`
  background-color: #4caf50;
  color: white;
  border: none;
  padding: 10px;
  margin: 5px;
  border-radius: 4px;
  cursor: pointer;
  text-decoration: none;
  display: inline-block;
  border: none;
  &:hover {
    background-color: #388e3c;
  }
`;

const ListContainer = styled.div`
  width: 80%;
  margin-top: 40px;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const TableRow = styled.tr`
  border-bottom: 1px solid rgba(204, 204, 204, 0.5);
  tbody & {
    cursor: pointer;
    &:hover {
      background-color: rgba(0, 123, 255, 0.1);
    }
  }
`;

const TableHeader = styled.th`
  padding: 10px;
  text-align: left;
`;

const TableCell = styled.td`
  padding: 10px;
`;

const AddButton = styled.button`
  background-color: #007bff;
  color: white;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 20px;
  border: none;
`;

const TopContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #ccc;
  padding: 10px 0px;
  margin-bottom: 40px;
`;
