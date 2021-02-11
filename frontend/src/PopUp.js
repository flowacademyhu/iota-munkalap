import React from 'react';
import Modal from "react-bootstrap/Modal";
import { Link } from 'react-router-dom';

function PopUp({ body, sentSuccessfully, setSent, path }) {
  return (
    <Modal show={true}>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Link to={sentSuccessfully ? '/employees' : `/employees/${path}`}>
          <button onClick={() => setSent(false)}>OK</button>
        </Link>
      </Modal.Footer>
    </Modal>
  );
}

export default PopUp;
