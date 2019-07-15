import React from "react";
import { Link } from "react-router-dom";
import { Grid } from "semantic-ui-react";

const FourHandedFourError = () => {
  return (
    <Grid centered columns={2}>
      <Grid.Row>
        <Grid.Column>
          <h1>404</h1>
          <h4>Page not found</h4>
          <p>
            The page you are looking for was moved, removed, renamed or might
            never exist!
          </p>
          <Link to="/ligas">Back to Home Page</Link>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );
};

export default FourHandedFourError;
