import React from 'react';
import Modal from "react-bootstrap/Modal";
import Button from './Button';

function PopUp({ body, handleClick }) {
  return (
    <Modal show={true}>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Button moreClassName='h-auto' text='OK' onClick={handleClick} />
      </Modal.Footer>
    </Modal>
  )
}

export default PopUp
