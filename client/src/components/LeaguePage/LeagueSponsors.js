import React from "react";
import { Grid, Segment } from "semantic-ui-react";

const LeagueSponsors = ({ league }) => {
  const { sponsors } = league;
  if (sponsors.length > 0) {
    return (
      <Grid columns="1" container>
        <Grid.Column width={16}>
          <Segment>Sponsors</Segment>
        </Grid.Column>
      </Grid>
    );
  } else {
    return <div />;
  }
};

export default LeagueSponsors;
