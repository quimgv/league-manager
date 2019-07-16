import React, { Fragment, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Loader } from "semantic-ui-react";

// Components
import LeagueDetails from "../components/LeaguePage/LeagueDetails";
import LeagueSponsors from "../components/LeaguePage/LeagueSponsors";
import LeagueMain from "../components/LeaguePage/LeagueMain/.LeagueMain";

// Redux
import { connect } from "react-redux";
import { getLeague, unmountLeague } from "../redux/actions/league";

const LeaguePage = ({
  getLeague,
  isLoading,
  league,
  match,
  unmountLeague,
  zones
}) => {
  useEffect(() => {
    getLeague(match.params.id);
    return () => {
      unmountLeague();
    };
  }, []);

  if (isLoading) {
    return <Loader active />;
  } else if (league === null) {
    return <div />;
  } else {
    return (
      <Fragment>
        <LeagueDetails league={league} />
        <LeagueSponsors league={league} />
        <LeagueMain league={league} />
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
    { getLeague, unmountLeague }
  )(LeaguePage)
);
