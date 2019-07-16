import React, { Fragment, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { Button, Container, Icon, Item } from "semantic-ui-react";

// Redux
import { connect } from "react-redux";
import { getLeagues } from "../redux/actions/league";

import defaultImage from "../assets/img/user/undefined.gif";

const LeaguesPage = ({ getLeagues, history, leagues }) => {
  useEffect(() => {
    getLeagues();
  }, [getLeagues]);
  return (
    <Fragment>
      <Container>
        <h1>Ligas</h1>
        <Item.Group divided unstackable>
          {leagues.map(league => {
            return (
              <Item key={league._id}>
                <Item.Image
                  src={
                    league.image ? `/league/${league._id}/image` : defaultImage
                  }
                  size="tiny"
                />

                <Item.Content>
                  <Item.Header>{league.name}</Item.Header>
                  <Item.Meta>
                    <span className="cinema">Temporada 2018 - 2019</span>
                  </Item.Meta>
                  <Item.Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut ut tempus ex. Phasellus vulputate vitae ex ut vulputate. Donec in vulputate enim.</Item.Description>
                  <Item.Extra>
                    <Button
                      primary
                      floated="right"
                      onClick={() => history.push(`/liga/${league._id}`)}
                    >
                      Ver liga
                      <Icon name="right chevron" />
                    </Button>
                  </Item.Extra>
                </Item.Content>
              </Item>
            );
          })}
        </Item.Group>
      </Container>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  leagues: state.league.leagues
});

export default withRouter(
  connect(
    mapStateToProps,
    { getLeagues }
  )(LeaguesPage)
);
