import React, { Fragment, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import { Grid } from 'semantic-ui-react';

// Components
import AdminMenu from '../components/Admin/AdminMenu';
import LeagueDetails from '../components/Admin/LeagueDetails';
import LeagueZones from '../components/Admin/LeagueZones';
import LeagueCategories from '../components/Admin/LeagueCategories';
import LeaguePhases from '../components/Admin/LeaguePhases';

// Redux
import { connect } from 'react-redux';
import {
  getDetails,
  getPhases,
  getZones,
  unmountAdmin
} from '../redux/actions/admin';

import { getCategories } from '../redux/actions/category';

const LeaguePageEdit = ({
  admin: { details, zones, categories, phases },
  getCategories,
  getDetails,
  getPhases,
  getZones,
  location,
  match,
  unmountAdmin
}) => {
  const leagueId = match.params.id;
  useEffect(() => {
    async function fetchAdminData() {
      await getDetails(leagueId);
      await getZones(leagueId);
      await getCategories(leagueId);
      await getPhases();
    }
    fetchAdminData();

    return () => {
      unmountAdmin();
    };
  }, []);

  const sectionPath = /([^/]+)\/?$/g;

  if (details === null) {
    return <div />;
  } else {
    return (
      <Fragment>
        <Grid columns="equal">
          <AdminMenu />
          <Grid.Column>
            {location.pathname.match(sectionPath)[0] === 'editar' && (
              <LeagueDetails />
            )}
            {location.pathname.match(sectionPath)[0] === 'zonas' && (
              <LeagueZones />
            )}
            {location.pathname.match(sectionPath)[0] === 'categorias' && (
              <LeagueCategories />
            )}
            {location.pathname.match(sectionPath)[0] === 'fases' && (
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
    { getCategories, getDetails, getPhases, getZones, unmountAdmin }
  )(LeaguePageEdit)
);
