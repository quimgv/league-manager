import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import { Dropdown, Grid, Tab } from "semantic-ui-react";

// Components
import Calendar from './Calendar';

const LeagueMain = ({ league }) => {
  const { categories } = league;
  return (
    <Grid columns="1" container>
      <Grid.Column>
        <Tab
          menu={{ pointing: true }}
          panes={[
            {
              menuItem: "Calendario",
              render: () => (
                <Tab.Pane attached={false}>
                  <Calendar />
                </Tab.Pane>
              )
            },
            {
              menuItem: "Equipos",
              render: () => <Tab.Pane attached={false}>Equipos</Tab.Pane>
            }
          ]}
        />
      </Grid.Column>
    </Grid>
  );
};

export default LeagueMain;
