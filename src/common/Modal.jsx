import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const ModalError = ({ body, show, handleClose }) => {
  return (
    <Modal show={show}>
      <Modal.Header closeButton>
        <Modal.Title>SuperHero App</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <p>{body}</p>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalError;
