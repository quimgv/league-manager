import React, { useState } from "react";
import { Form } from "semantic-ui-react";

// Redux
import { connect } from 'react-redux';
import { login } from '../redux/actions/auth';
import { handleModal } from '../redux/actions/modal';

const LoginForm = ({ handleModal, login }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });

  const { email, password } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    console.log('login', email, password)

    // const { errors } = loginValidation(email, password);

    // // Check validation
    // if (errors.length > 0) {
    //   return errors.forEach(error => setAlert(error.msg, "danger", 20000));
    // }

    login(email, password);

  };
  return (
    <Form onSubmit={onSubmit}>
      <Form.Group widths="equal">
        <Form.Input
          fluid
          label="Email"
          name="email"
          placeholder="Enter email"
          onChange={e => onChange(e)}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          fluid
          label="Password"
          name="password"
          type="password"
          placeholder="Enter password"
          onChange={e => onChange(e)}
        />
      </Form.Group>
      <Form.Button type="submit">Log in</Form.Button>
    </Form>
  );
};

export default connect(null, { handleModal, login })(LoginForm);
