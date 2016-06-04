import React from 'react';
import { Button, Modal } from 'react-bootstrap';
import {Fieldset, Field, createValue} from 'react-forms'


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
  }

  render() {
    return (
      <Fieldset formValue={this.state.formValue}>
        <Field select="firstName" label="First name" />
        <Field select="lastName" label="Last name" />
        <Field select="email" label="Email"/>
        <Field select="country" label="Country"/>
        <Field select="postCode" label="Post Code"/>
        <Field select="phone" label="Phone"/>
      </Fieldset>
      // Location, url, created are auto added
    )
  }
}

//UserForm.propTypes = {};
//UserForm.defaultProps = {};

export default UserForm;
