import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import {
  Dropdown,
  Icon,
  Menu,
  Grid
} from "semantic-ui-react";
import { isMobile } from "react-device-detect";

import { connect } from 'react-redux';

const AdminMenu = ({ admin, history, match }) => {

  return (
    <Fragment>
      {isMobile && (
        <Grid.Row>
          <Grid.Column>
            <Dropdown
              text="Menu"
              icon="settings"
              floating
              labeled
              button
              className="icon"
            >
              <Dropdown.Menu>
                <Dropdown.Item
                  icon="file alternate"
                  text="Detalles"
                  onClick={() =>
                    history.push(`/liga/${match.params.id}/editar`)
                  }
                />
                <Dropdown.Item
                  icon="world"
                  text="Zonas"
                  onClick={() =>
                    history.push(`/liga/${match.params.id}/editar/zonas`)
                  }
                  disabled={admin.details.zonesBool}
                />
                <Dropdown.Item
                  icon="sort numeric down"
                  text="Categorias"
                  onClick={() =>
                    history.push(`/liga/${match.params.id}/editar/categorias`)
                  }
                />
                <Dropdown.Item
                  icon="conversation"
                  text="Fases"
                  onClick={() =>
                    history.push(`/liga/${match.params.id}/editar/fases`)
                  }
                />
              </Dropdown.Menu>
            </Dropdown>
          </Grid.Column>
        </Grid.Row>
      )}

      {!isMobile && (
        <Grid.Column width={4}>
          <Menu vertical>
            <Menu.Item
              as="a"
              onClick={() => history.push(`/liga/${match.params.id}/editar`)}
            >
              <Icon name="file alternate" />
              Detalles
            </Menu.Item>
            {console.log('ZONES', admin.details.zonesBool)}
            <Menu.Item
              as="a"
              onClick={() =>
                history.push(`/liga/${match.params.id}/editar/zonas`)
              }
              disabled={!admin.details.zonesBool}
            >
              <Icon name="world" />
              Zonas
            </Menu.Item>
            <Menu.Item
              as="a"
              onClick={() =>
                history.push(`/liga/${match.params.id}/editar/categorias`)
              }
            >
              <Icon name="sort numeric down" />
              Categorias
            </Menu.Item>
            <Menu.Item
              as="a"
              onClick={() =>
                history.push(`/liga/${match.params.id}/editar/fases`)
              }
            >
              <Icon name="sort numeric down" />
              Fases
            </Menu.Item>
          </Menu>
        </Grid.Column>
      )}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  admin: state.admin
});

export default withRouter(connect(mapStateToProps)(AdminMenu));

// const AdminSidebar = ({ children, history, match }) => {
//   const [sidebar, setSidebar] = useState({
//     animation: "scale down",
//     direction: "left",
//     dimmed: false,
//     visible: true
//   });
//   return (
//     <Fragment>
//       <Checkbox
//         toggle
//         label={(sidebar.visible ? "Ocultar" : "Ver") + " menu"}
//         onChange={e => setSidebar({ ...sidebar, visible: !sidebar.visible })}
//       />
//       <Sidebar.Pushable>
//         <Sidebar
//           as={Menu}
//           animation={sidebar.animation}
//           vertical
//           visible={sidebar.visible}
//           width="thin"
//         >
//           <Menu.Item as="a" onClick={() => history.push(`/liga/${match.params.id}/editar`)}>
//             <Icon name="file alternate" />
//             Detalles
//           </Menu.Item>
//           <Menu.Item as="a" onClick={() => history.push(`/liga/${match.params.id}/editar/zonas`)}>
//             <Icon name="world" />
//             Zonas
//           </Menu.Item>
//           <Menu.Item as="a" onClick={() => history.push(`/liga/${match.params.id}/editar/categorias`)}>
//             <Icon name="sort numeric down" />
//             Categorias
//           </Menu.Item>
//           <Menu.Item as="a" onClick={() => history.push(`/liga/${match.params.id}/editar/fases`)}>
//             <Icon name="sort numeric down" />
//             Fases
//           </Menu.Item>
//         </Sidebar>

//         <Sidebar.Pusher>
//           <Segment basic>{children}</Segment>
//         </Sidebar.Pusher>
//       </Sidebar.Pushable>
//     </Fragment>
//   );
// };


