import React, { useState, useRef } from "react";
import { Grid, Image, Button, Form, Message } from "semantic-ui-react";

import noImage from "../assets/img/user/undefined.gif";

// Redux
import { connect } from "react-redux";
import {
  deleteUserImage,
  updateUser,
  uploadUserImage
} from "../redux/actions/profile";

// Validation
import {
  updatePasswordValidation,
  updateUserValidation
} from "../validation/profile";

const ProfileSettings = ({
  deleteUserImage,
  updateUser,
  uploadUserImage,
  user
}) => {
  const initialState = {
    avatarUpdate: "",
    avatarError: false,
    avatarSuccess: false,
    firstName: "",
    lastName: "",
    email: "",
    email2: "",
    userInfoError: false,
    userInfoSuccess: false,
    currentPassword: "",
    password: "",
    password2: "",
    passwordSuccess: false,
    passwordError: false
  };
  const [formData, setFormData] = useState(initialState);
  const {
    avatarUpdate,
    avatarError,
    avatarSuccess,
    firstName,
    lastName,
    email,
    email2,
    userInfoError,
    userInfoSuccess,
    currentPassword,
    password,
    password2,
    passwordSuccess,
    passwordError
  } = formData;

  const imageFile = useRef(null);
  const updateImageAction = useRef(null);

  const { _id, avatar } = user;

  const onChange = e => {
    let target = e.target.value;
    if (e.target.type === "file") {
      if (!!avatarUpdate) {
        target = "";
      } else {
        target = e.target.files[0];
      }
    }

    setFormData({ ...formData, [e.target.name]: target });
  };

  const handleUpdateImage = () => {
    if (updateImageAction.current.props.name === "delete") {
      deleteUserImage();
    } else if (updateImageAction.current.props.name === "save") {
      const imageData = new FormData();
      imageData.append("avatar", avatarUpdate);
      uploadUserImage(imageData).then(res =>
        setFormData({ ...formData, avatarUpdate: "", avatarSuccess: true })
      );
    }
  };

  const handleUpdateUser = () => {
    let update = {};

    const { errors, isValid } = updateUserValidation(
      firstName,
      lastName,
      email,
      email2
    );

    if (!isValid) {
      return setFormData({
        ...formData,
        userInfoError: errors,
        avatarSuccess: false,
        passwordSuccess: false,
        userInfoSuccess: false
      });
    }

    if (!!firstName) update.firstName = firstName;
    if (!!lastName) update.lastName = lastName;
    if (!!email) update.email = email;

    updateUser(update).then(res =>
      setFormData({ ...initialState, userInfoSuccess: true })
    );
  };

  const handleUpdatePassword = () => {
    let update = {};

    const { errors, isValid } = updatePasswordValidation(
      currentPassword,
      password,
      password2
    );

    if (!isValid) {
      return setFormData({
        ...formData,
        passwordError: errors
      });
    }

    update.currentPassword = currentPassword;
    update.password = password;

    updateUser(update).then(res =>
      setFormData({ ...initialState, passwordSuccess: true })
    );
  };

  return (
    <Grid divided="vertically">
      <Grid.Row>
        <Grid.Column width={4}>
          <Image src={avatar ? `/users/${_id}/avatar` : noImage} size="small" />
        </Grid.Column>
        <Grid.Column width={8}>
          {!!avatarUpdate && <p>Image selected: {avatarUpdate.name}</p>}
          <Button
            content={!!avatarUpdate ? "Cancel" : "Select image"}
            labelPosition="left"
            icon={!!avatarUpdate ? "delete" : "image"}
            onClick={() =>
              !!avatarUpdate
                ? setFormData({ ...formData, avatarUpdate: "" })
                : imageFile.current.click()
            }
          />
          {!!avatarUpdate && (
            <Button
              content={"Save"}
              name="save"
              ref={updateImageAction}
              onClick={handleUpdateImage}
              positive
            />
          )}
          {avatar && (
            <Button
              content={"Delete"}
              ref={updateImageAction}
              name="delete"
              onClick={handleUpdateImage}
              negative
            />
          )}

          <input
            ref={imageFile}
            type="file"
            name="avatarUpdate"
            hidden
            onChange={e => onChange(e)}
          />
        </Grid.Column>
        <Grid.Column width={12}>
          {!!avatarError && (
            <Message
              error
              header="Please review the following things"
              list={avatarError.length > 0 ? userInfoError : []}
            />
          )}
          {avatarSuccess && (
            <Message success header="Your avatar has been updated!" />
          )}
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Form
            onSubmit={handleUpdateUser}
            error={!!userInfoError}
            success={userInfoSuccess}
          >
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="First name"
                name="firstName"
                value={firstName}
                placeholder="Enter first name"
                onChange={e => onChange(e)}
              />
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
              <Form.Input
                fluid
                label="Confirm email"
                name="email2"
                type="email"
                value={email2}
                placeholder="Confirm email"
                onChange={e => onChange(e)}
              />
            </Form.Group>
            <Message
              error
              header="Please review the following things"
              list={userInfoError.length > 0 ? userInfoError : []}
            />
            <Message success header="Your profile has been updated!" />
            <Form.Button type="submit" positive>
              Update
            </Form.Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Form
            onSubmit={handleUpdatePassword}
            error={!!passwordError}
            success={passwordSuccess}
          >
            <Form.Group widths="equal">
              <Form.Input
                fluid
                label="Current password"
                name="currentPassword"
                value={currentPassword}
                type="password"
                placeholder="Enter current password"
                onChange={e => onChange(e)}
              />
              <Form.Input
                fluid
                label="Password"
                name="password"
                value={password}
                type="password"
                placeholder="Enter new password"
                onChange={e => onChange(e)}
              />
              <Form.Input
                fluid
                label="Confirm new password"
                name="password2"
                value={password2}
                type="password"
                placeholder="Enter password"
                onChange={e => onChange(e)}
              />
            </Form.Group>
            <Message
              error
              header="Please review the following things"
              list={passwordError.length > 0 ? passwordError : []}
            />
            <Message success header="Password has been updated!" />
            <Form.Button type="submit" positive>
              Update password
            </Form.Button>
          </Form>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(
  mapStateToProps,
  { deleteUserImage, updateUser, uploadUserImage }
)(ProfileSettings);
