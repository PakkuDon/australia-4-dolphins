import React from 'react';
import { Button } from 'react-bootstrap';

class WizardPage extends React.Component {
  render() {
    var confirmBtn;
    var cancelBtn;

    if (this.props.onConfirm) {
      confirmBtn = (
        <Button bsStyle='primary'
          onClick={this.props.onConfirm.handler}>
            {this.props.onConfirm.text}
        </Button>
      );
    }
    if (this.props.onCancel) {
      cancelBtn = (
        <Button bsStyle='danger'
          onClick={this.props.onCancel.handler}>
          {this.props.onCancel.text}
        </Button>
      );
    }

    return (
      <div>
        {this.props.children}
        <footer>
          {cancelBtn} {confirmBtn}
        </footer>
      </div>
    );
  }
}

export default WizardPage;