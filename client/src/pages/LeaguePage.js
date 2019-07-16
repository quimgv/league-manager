import React, { Fragment, useEffect, useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { Dropdown, Grid, Image, Loader, Segment, Tab } from "semantic-ui-react";

// Components
import LeagueDetails from "../components/LeaguePage/LeagueDetails";
import LeagueSponsors from "../components/LeaguePage/LeagueSponsors";

// Redux
import { connect } from "react-redux";
import { getLeague, unmountLeague } from "../redux/actions/league";

const LeaguePage = ({
  getLeague,
  isLoading,
  league,
  match,
  unmountLeague,
  zones
}) => {
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
    const { _id, name, categories } = league;
    let categoriesDropDown = [];
    categories.forEach(category => {
      categoriesDropDown.push({
        key: category._id,
        text: category.name,
        value: category.name
      });
    });
    return (
      <Fragment>
        <LeagueDetails league={league} />

        <LeagueSponsors league={league} />

        <Grid columns="1" container>
          <Grid.Column>
            <Tab
              menu={{ pointing: true }}
              panes={[
                {
                  menuItem: "Equipos",
                  render: () => (
                    <Tab.Pane attached={false}>
                      <Fragment>
                        Filtrar:{" "}
                        <Dropdown
                          placeholder="Categorias"
                          multiple
                          selection
                          options={categoriesDropDown}
                          onChange={(e, { value }) => console.log(value)}
                        />
                        {league.registrations.map(registration => (
                          <div key={registration._id}>
                            <Link to={`/equipo/${registration.team._id}`}>
                              {registration.team.name}
                            </Link>
                          </div>
                        ))}
                      </Fragment>
                    </Tab.Pane>
                  )
                },
                {
                  menuItem: "Calendario",
                  render: () => (
                    <Tab.Pane attached={false}>
                      {league.zones.map(zone => (
                        <div key={zone._id}>{zone.name}</div>
                      ))}
                    </Tab.Pane>
                  )
                },
                {
                  menuItem: "Categorias",
                  render: () => (
                    <Tab.Pane attached={false}>
                      {league.categories.map(category => (
                        <div key={category._id}>{category.name}</div>
                      ))}
                    </Tab.Pane>
                  )
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
