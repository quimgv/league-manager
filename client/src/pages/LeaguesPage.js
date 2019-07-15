import React, { Fragment, useEffect } from "react";
import {} from "semantic-ui-react";

// Redux
import { connect } from "react-redux";
import { getLeagues } from "../redux/actions/league";

const LeaguesPage = ({ getLeagues, leagues }) => {
  useEffect(() => {
    getLeagues();
  }, []);
  return (
    <Fragment>
      <h1>Ligas</h1>
      {console.log("Leagues", leagues)}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  leagues: state.league.leagues
});

export default connect(
  mapStateToProps,
  { getLeagues }
)(LeaguesPage);
