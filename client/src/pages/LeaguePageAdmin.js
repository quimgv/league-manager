import React, { Fragment, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Grid } from "semantic-ui-react";

// Components
import AdminMenu from "../components/Admin/AdminMenu";
import LeagueDetails from "../components/Admin/LeagueDetails";
import LeagueZones from "../components/Admin/LeagueZones";
import LeagueCategories from "../components/Admin/LeagueCategories";
import LeaguePhases from "../components/Admin/LeaguePhases";

// Redux
import { connect } from "react-redux";
import { getDetails, unmountAdmin } from '../redux/actions/admin';

const LeaguePageEdit = ({ admin: { details, zones, categories, phases }, getDetails, location, match, unmountAdmin }) => {
  useEffect(() => {
    getDetails(match.params.id);
    return () => {
      unmountAdmin();
    };
  }, []);

  console.log(details, zones, categories, phases);

  const sectionPath = /([^/]+)\/?$/g;

  if (details === null) {
    return <div />;
  } else {
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
  }
};

const mapStateToProps = state => ({
  admin: state.admin
});

export default withRouter(
  connect(
    mapStateToProps,
    { getDetails, unmountAdmin }
  )(LeaguePageEdit)
);
