import React from 'react';
import { Modal, Button } from 'react-bootstrap';

function JobDescriptionModal({ show, handleClose, job }) {
  return (
    <Modal show={show} onHide={handleClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>{job?.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <pre>{job?.description}</pre>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default JobDescriptionModal;
