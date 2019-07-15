import React, { Fragment, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Button } from "semantic-ui-react";

// Redux
import { connect } from "react-redux";
import { getLeagues } from "../redux/actions/league";

const LeaguesPage = ({ getLeagues, history, leagues }) => {
  useEffect(() => {
    getLeagues();
  }, [getLeagues]);
  return (
    <Fragment>
      <h1>Ligas</h1>
      {leagues.map(league => {
        return (
          <div key={league._id}>
            <div>{league.name}</div>
            <Button onClick={() => history.push(`/liga/${league._id}`)}>
              Go
            </Button>
          </div>
        );
      })}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  leagues: state.league.leagues
});

export default withRouter(
  connect(
    mapStateToProps,
    { getLeagues }
  )(LeaguesPage)
);
