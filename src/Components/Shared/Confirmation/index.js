import React from 'react';
import Button from '../Button';

function Confirmation({ message, handleDelete, handleShowModal }) {
  return (
    <div>
      <p>{message}</p>
      <Button
        type="confirm"
        onClick={() => {
          handleDelete();
          handleShowModal();
        }}
      >
        Yes
      </Button>
      <Button type="cancel" onClick={handleShowModal}>
        No
      </Button>
    </div>
  );
}

export default Confirmation;
