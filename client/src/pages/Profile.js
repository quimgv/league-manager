import React from "react";
import { Grid, Header, Image } from "semantic-ui-react";

// Redux
import { connect } from "react-redux";

import noImage from '../assets/img/user/undefined.gif';

const Profile = ({ user }) => {
  const { _id, avatar, firstName, lastName, email } = user;
  return (
    <Grid centered columns={1}>
      <Grid.Row>
        <Grid.Column>
          <Image
            src={avatar ? `/users/${_id}/avatar` : noImage}
            size="small"
            circular
            centered
          />
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column>
          <Header as="h1" textAlign="center">
            {firstName + " " + lastName}
          </Header>
          <p style={{textAlign: "center"}}>{email}</p>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(Profile);
