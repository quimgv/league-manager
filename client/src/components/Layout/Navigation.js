import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Button, Dropdown, Image, Menu } from "semantic-ui-react";
import { isMobileOnly } from "react-device-detect";

// Components
import LoginForm from "../LoginForm";
import SignupForm from "../SignupForm";

// Redux
import { connect } from "react-redux";
import { logout } from "../../redux/actions/auth";
import { handleModal } from "../../redux/actions/modal";

import userImage from '../../assets/img/user/undefined.gif';

const Navigation = ({
  auth: { isAuthenticated, isLoading, user },
  handleModal,
  logout,
  history
}) => {
  if (isLoading) {
    return <div />;
  } else {
    const trigger = (
      <span>
        <Image
          avatar
          src={user && user.avatar ? `/users/${user._id}/avatar` : userImage}
        />{" "}
        {!isMobileOnly && user && user.firstName + " " + user.lastName}
      </span>
    );
    return (
      <Menu size="large">
        <Menu.Item header name="Boil" onClick={() => history.push("/app")} />
        <Menu.Menu position="right">
          {isAuthenticated ? (
            <Dropdown item trigger={trigger}>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => history.push("/profile")}>
                  Profile
                </Dropdown.Item>
                <Dropdown.Item onClick={() => history.push("/edit-profile")}>Settings</Dropdown.Item>
                <Dropdown.Item onClick={() => logout()}>Log out</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          ) : (
            <Fragment>
              <Menu.Item
                name="Log in"
                onClick={() => {
                  handleModal({
                    body: <LoginForm />,
                    header: "Log in",
                    dimmer: "blurring"
                  });
                }}
              />
              <Menu.Item>
                <Button
                  primary
                  onClick={() => {
                    handleModal({
                      body: <SignupForm />,
                      header: "Sign up",
                      dimmer: "blurring"
                    });
                  }}
                >
                  Sign Up
                </Button>
              </Menu.Item>
            </Fragment>
          )}
        </Menu.Menu>
      </Menu>
    );
  }
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default withRouter(
  connect(
    mapStateToProps,
    { handleModal, logout }
  )(Navigation)
);
