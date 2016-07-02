import React from 'react';
import { Button, Modal } from 'react-bootstrap';

class DeleteConfirmationForm extends React.Component {
  constructor(props) {
    super(props);

    this.onConfirm = this.onConfirm.bind(this);
  }

  onConfirm() {
    this.props.onConfirm();
  }

  render() {
    return (
      <Modal show={this.props.visible} onHide={this.props.onHide}>
        <Modal.Header closeButton>
          Confirmation required
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete the selected signatures? Deleted data cannot be restored.
        </Modal.Body>
        <Modal.Footer>
          <Button bsStyle='danger' onClick={this.onConfirm}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

export default DeleteConfirmationForm;