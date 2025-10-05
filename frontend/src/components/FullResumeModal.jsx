import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function FullResumeModal({ show, handleClose, resumeText }) {
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Full Resume</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <pre>{resumeText}</pre>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default FullResumeModal;
