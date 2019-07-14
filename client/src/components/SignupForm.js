import React, { useState } from "react";
import { Form } from "semantic-ui-react";

// Redux
import { connect } from 'react-redux';
import { register } from '../redux/actions/auth';

const SignupForm = ({ register }) => {
  const [ formData, setFormData ] = useState({ firstName: "", lastName: "", email: "", password: "", password2: "" });

  const { firstName, lastName, email, password, password2 } = formData;

  const onChange = e => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = e => {
    e.preventDefault();

    // const { errors } = loginValidation(email, password);

    // // Check validation
    // if (errors.length > 0) {
    //   return errors.forEach(error => setAlert(error.msg, "danger", 20000));
    // }

    register(firstName, lastName, email, password, password2);

    console.log(firstName, lastName, email, password);
  };
  return (
    <Form onSubmit={onSubmit}>
    <Form.Group widths="equal">
        <Form.Input
          fluid
          label="First name"
          name="firstName"
          value={firstName}
          placeholder="Enter first name"
          onChange={e => onChange(e)}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          fluid
          label="Last name"
          name="lastName"
          value={lastName}
          placeholder="Enter last name"
          onChange={e => onChange(e)}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          fluid
          label="Email"
          name="email"
          value={email}
          placeholder="Enter email"
          onChange={e => onChange(e)}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          fluid
          label="Password"
          name="password"
          value={password}
          type="password"
          placeholder="Enter password"
          onChange={e => onChange(e)}
        />
      </Form.Group>
      <Form.Group widths="equal">
        <Form.Input
          fluid
          label="Confirm password"
          name="password2"
          value={password2}
          type="password"
          placeholder="Enter password"
          onChange={e => onChange(e)}
        />
      </Form.Group>
      <Form.Button type="submit">Sign up</Form.Button>
    </Form>
  );
};

export default connect(null, { register })(SignupForm);
