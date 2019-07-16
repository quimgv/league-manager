import React from "react";
import { Segment } from "semantic-ui-react";

const LeagueDetails = ({ league }) => {
    const { name } = league;
  return (
    <Segment>
      <h1>{name}</h1>
    </Segment>
  );
};

export default LeagueDetails;
