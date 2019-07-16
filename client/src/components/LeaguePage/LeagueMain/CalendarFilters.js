import React, { Fragment, useEffect, useState } from "react";
import { Dropdown } from "semantic-ui-react";

// Redux
import { connect } from "react-redux";

const CalendarFilters = ({ league }) => {
  const [filters, setFilters] = useState({
    zones: [],
    categories: [],
    phases: [],
    groups: []
  });

  const { categories, zones } = league;

  let zonesDropDown = [];
  zones.forEach(zone => {
    zonesDropDown.push({
      key: zone._id,
      text: zone.name,
      value: zone.name
    });
  });

  let categoriesDropDown = [];
  categories.forEach(category => {
    categoriesDropDown.push({
      key: category._id,
      text: category.name,
      value: category.name
    });
  });

  let filtersDropdown = {
    zones: null,
    categories: null,
    phases: null,
    groups: null
  };

  if (league.zones.length > 0) {
    filtersDropdown.zones = {
      placeholder: "Zonas",
      options: zonesDropDown,
      onChange: "zones"
    };
  }
  if (league.zones.length === 0 || filters.zones.length > 0) {
    filtersDropdown.categories = {
      placeholder: "Categorias",
      options: categoriesDropDown,
      onChange: "categories"
    };
  }
  if (filters.categories.length > 0) {
    filtersDropdown.phases = {
      placeholder: "Fases",
      options: [{
        key: 'fase1',
        text: 'Fase 1',
        value: 'fase1'
      },{
        key: 'fase2',
        text: 'Fase 2',
        value: 'fase2'
      } ],
      onChange: "phases"
    };
  }

  return (
    <Fragment>
      {Object.keys(filtersDropdown).map((filter, idx) => {
        if (filtersDropdown[filter]) {
          return (
            <Dropdown
              key={idx}
              placeholder={filtersDropdown[filter].placeholder}
              multiple
              selection
              options={filtersDropdown[filter].options}
              onChange={(e, { value }) =>
                setFilters({
                  ...filters,
                  [filtersDropdown[filter].onChange]: value
                })
              }
            />
          );
        } else {
          return <div key={idx} />;
        }
      })}
    </Fragment>
  );
};

const mapStateToProps = state => ({
  league: state.league.currentLeague
});

export default connect(mapStateToProps)(CalendarFilters);
