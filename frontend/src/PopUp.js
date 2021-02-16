import React from 'react';
import Modal from "react-bootstrap/Modal";
import { Link } from 'react-router-dom';
import Button from './Button';

function PopUp({ body, sentSuccessfully, setSent, path }) {
  return (
    <Modal show={true}>
      <Modal.Body>{body}</Modal.Body>
      <Modal.Footer>
        <Link to={sentSuccessfully ? '/employees' : `/employees/${path}`}>
          <Button onClick={() => setSent(false)} moreClassName='h-auto' text='OK' />
        </Link>
      </Modal.Footer>
    </Modal>
  );
}

export default PopUp;
