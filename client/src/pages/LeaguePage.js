import React, { Fragment, useEffect } from "react";
import { withRouter, Link } from "react-router-dom";
import {
  Card,
  Container,
  Grid,
  Image,
  Loader,
  Segment,
  Tab
} from "semantic-ui-react";

import defaultImage from "../assets/img/user/undefined.gif";

// Redux
import { connect } from "react-redux";
import { getLeague, unmountLeague } from "../redux/actions/league";

const LeaguePage = ({ getLeague, isLoading, league, match, unmountLeague }) => {
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
    const { _id, name } = league;
    return (
      <Fragment>
        <Grid columns="2" container>
          <Grid.Column mobile={16} tablet={4} computer={4}>
            <Image
              src={league.image ? `/league/${_id}/image` : defaultImage}
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
            <Tab
              menu={{ pointing: true }}
              panes={[
                {
                  menuItem: "Inscripciones",
                  render: () => (
                    <Tab.Pane attached={false}>
                      {league.registrations.map(registration => (
                        <div key={registration._id}><Link to={`/equipo/${registration.team._id}`}>{registration.team.name}</Link></div>
                      ))}
                    </Tab.Pane>
                  )
                },
                {
                  menuItem: "Horarios",
                  render: () => <Tab.Pane attached={false}>Horarios</Tab.Pane>
                }
              ]}
            />
          </Grid.Column>
        </Grid>
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
