import React, { Fragment, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Dimmer, Loader } from "semantic-ui-react";

// Redux
import { connect } from "react-redux";
import { getLeague } from "../redux/actions/league";

const LeaguePage = ({ getLeague, isLoading, league, match }) => {
  useEffect(() => {
    getLeague(match.params.id);
  },[getLeague, match]);

  if (isLoading) {
    return (
      <Dimmer active>
        <Loader />
      </Dimmer>
    );
  } else if (league) {
    const { name } = league;
    return (
      <Fragment>
        <h1>{name}</h1>
      </Fragment>
    );
  }
};

const mapStateToProps = state => ({
  league: state.league.currentLeague,
  isLoading: state.league.isLoading
});

export default withRouter(
  connect(
    mapStateToProps,
    { getLeague }
  )(LeaguePage)
);
