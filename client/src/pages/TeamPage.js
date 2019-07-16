import React, { Fragment, useEffect } from "react";
import { withRouter } from "react-router-dom";
import {
  Grid,
  Image,
  Loader,
  Segment
} from "semantic-ui-react";

import defaultImage from "../assets/img/user/undefined.gif";

// Redux
import { connect } from "react-redux";
import { getTeam, unmountTeam } from "../redux/actions/team";

const TeamPage = ({ getTeam, isLoading, team, match, unmountTeam }) => {
  useEffect(() => {
    getTeam(match.params.id);
    return () => {
      unmountTeam();
    };
  }, []);

  if (isLoading) {
    return <Loader active />;
  } else if (team === null) {
    return <div />;
  } else {
    const { _id, name, players } = team;
    return (
      <Fragment>
        <Grid columns="2" container>
          <Grid.Column mobile={16} tablet={4} computer={4}>
            <Image
              src={team.image ? `/team/${_id}/image` : defaultImage}
              size="small"
              centered
            />
          </Grid.Column>
          <Grid.Column mobile={16} tablet={12} computer={12}>
            <Segment>
              <h1>{name}</h1>
            </Segment>
          </Grid.Column>
        </Grid>
        <Grid columns="1" container>
          <Grid.Column>
            {players.map(player => {
              return <div key={player._id}>{player.firstName}</div>;
            })}
          </Grid.Column>
        </Grid>
      </Fragment>
    );
  }
};

const mapStateToProps = state => ({
  team: state.team.currentTeam,
  isLoading: state.team.isLoading
});

export default withRouter(
  connect(
    mapStateToProps,
    { getTeam, unmountTeam }
  )(TeamPage)
);
