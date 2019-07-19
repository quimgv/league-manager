import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { Grid } from "semantic-ui-react";

// Components
import AdminMenu from "../components/Admin/AdminMenu";
import LeagueDetails from "../components/Admin/LeagueDetails";
import LeagueZones from "../components/Admin/LeagueZones";
import LeagueCategories from "../components/Admin/LeagueCategories";
import LeaguePhases from "../components/Admin/LeaguePhases";

const LeaguePageEdit = ({ match, location }) => {
  const sectionPath = /([^/]+)\/?$/g;
  return (
    <Fragment>
      <Grid columns="equal">
        <AdminMenu />
        <Grid.Column>
          {location.pathname.match(sectionPath)[0] === "editar" && (
            <LeagueDetails />
          )}
          {location.pathname.match(sectionPath)[0] === "zonas" && (
            <LeagueZones />
          )}
          {location.pathname.match(sectionPath)[0] === "categorias" && (
            <LeagueCategories />
          )}
          {location.pathname.match(sectionPath)[0] === "fases" && (
            <LeaguePhases />
          )}
        </Grid.Column>
      </Grid>
    </Fragment>
  );
};

export default withRouter(LeaguePageEdit);
