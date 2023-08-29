import React from 'react';
import styled from 'styled-components';

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000; // Z-index değerini yükselttik
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  text-align: center; // İçeriği ortalıyoruz
`;

const ModalButton = styled.button`
  padding: 10px 20px;
  margin: 5px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  border: none;
`;

const ConfirmButton = styled(ModalButton)`
  background-color: #007bff;
  color: white;
  border: none;
  &:hover {
    background-color: #0056b3;
  }
`;

const CancelButton = styled(ModalButton)`
  background-color: #ccc;
  color: black;
  border: none;
  &:hover {
    background-color: #aaa;
  }
`;

const ConfirmModal = ({ message, onConfirm, onCancel }) => (
  <ModalWrapper>
    <ModalContent>
      <p>{message}</p>
      <ConfirmButton onClick={onConfirm}>Yes</ConfirmButton>
      <CancelButton onClick={onCancel}>No</CancelButton>
    </ModalContent>
  </ModalWrapper>
);

export default ConfirmModal;
