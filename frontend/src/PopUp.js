import React from 'react';
import Modal from "react-bootstrap/Modal";
import { Link } from 'react-router-dom';

function PopUp({ body }) {
  return (
    <Modal show={true}>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Link to='/employees'>
          <button>OK</button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
}

export default PopUp;
