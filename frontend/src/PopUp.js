import React from 'react';
import Modal from "react-bootstrap/Modal";
import "bootstrap/dist/css/bootstrap.min.css";

function PopUp({ body }) {
  return (
    <Modal show={true}>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <button>OK</button>
      </Modal.Footer>
    </Modal>
  );
}

export default PopUp;
