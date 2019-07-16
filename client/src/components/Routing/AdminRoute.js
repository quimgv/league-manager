import React, { Fragment } from "react";
import { Route, Redirect } from "react-router-dom";
import PropTypes from "prop-types";
import { Container, Loader } from "semantic-ui-react";

// Redux
import { connect } from "react-redux";

// Components
import Navigation from "../Layout/Navigation";
import Modal from '../Common/Modal';

const PrivateRoute = ({
  component: Component,
  auth: { isAuthenticated, isLoading, user },
  ...rest
}) => {
  return (
    <Fragment>
      <Navigation />
      <Container>
      <Modal />
        <Route
          {...rest}
          render={props => {
            if (isLoading) {
              return <Loader />;
            } else if (!isAuthenticated && !isLoading || !user.role.includes('admin') ) {
              return <Redirect to="/" />;
            } else {
              return <Component {...props} />;
            }
          }}
        />
      </Container>
    </Fragment>
  );
};

PrivateRoute.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(mapStateToProps)(PrivateRoute);
