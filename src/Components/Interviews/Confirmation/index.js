import React from 'react';
import Button from '../../Shared/Button';

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
      ></Button>
      <Button type="cancel" onClick={handleShowModal}></Button>
    </div>
  );
}

export default Confirmation;
