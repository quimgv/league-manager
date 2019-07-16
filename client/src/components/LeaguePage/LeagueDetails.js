import React from "react";
import { Grid, Image, Segment } from "semantic-ui-react";

import defaultImage from "../../assets/img/user/undefined.gif";

const LeagueDetails = ({ league }) => {
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
        </Segment>
      </Grid.Column>
    </Grid>
  );
};

export default LeagueDetails;
