import React from "react";
import { withRouter } from 'react-router-dom';
import { Button, Grid, Image, Segment } from "semantic-ui-react";

import defaultImage from "../../assets/img/user/undefined.gif";

// Redux
import { connect } from 'react-redux';

const LeagueDetails = ({ history, league, user }) => {
  const { _id, image, name } = league;

  return (
    <Grid columns="2" container>
      <Grid.Column mobile={16} tablet={4} computer={4}>
        <Image
          src={image ? `/league/${_id}/image` : defaultImage}
          size="small"
          centered
        />
      </Grid.Column>
      <Grid.Column stretched mobile={16} tablet={12} computer={12}>
        <Segment>
          <h1>{name}</h1>
          {user.role.includes('admin') && <Button onClick={() => history.push(`/liga/${_id}/editar`)}>Admin</Button>}
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

const mapStateToProps = state => ({
  user: state.auth.user,
  league: state.league.currentLeague
});

export default withRouter(connect(mapStateToProps)(LeagueDetails));
