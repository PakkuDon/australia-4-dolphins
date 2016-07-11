import React from 'react';
import { Row, Col } from 'react-bootstrap';
import { Fieldset, Field, createValue } from 'react-forms'
var contactImg = require('../../images/contact-form-image.jpg');

class UserForm extends React.Component {
  constructor(props) {
    super(props)
    let formValue = createValue({
      value: props.value,
      onChange: this.onChange.bind(this)
    })
    this.state = {formValue}
  }

  onChange(formValue) {
    this.setState({formValue})
    this.props.dataCb(formValue);
  }

  render() {
    return (
      <Row>
        <Col sm={6}>
          <Fieldset formValue={this.state.formValue}>
            <Field select="firstName" label="First name" />
            <Field select="lastName" label="Last name" />
            <Field select="email" label="Email"/>
            <Field select="country" label="Country"/>
            <Field select="postCode" label="Post code"/>
            <Field select="phone" label="Phone"/>
          </Fieldset>
        </Col>
        <Col xsHidden sm={6}>
          <img width='100%' src={contactImg} />
        </Col>
      </Row>
      // Location, url, created are auto added
    )
  }
}

//UserForm.propTypes = {};
//UserForm.defaultProps = {};

export default UserForm;
