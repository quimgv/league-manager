import React, { Fragment, useEffect, useState } from "react";
import { Button, Form } from "semantic-ui-react";
import isEmpty from "../../validation/isEmpty";

// Redux
import { connect } from "react-redux";
import { updateLeagueDetails } from "../../redux/actions/league";

const LeagueDetails = ({ details, updateLeagueDetails }) => {
  const [formData, setFormData] = useState({
    name: "",
    image: "",
    sponsors: [],
    zonesBool: ""
  });

  useEffect(() => {
    setFormData({
      ...formData,
      name: details.name,
      zonesBool: details.zonesBool
    });
  }, [details]);

  const onChange = e => {
    let target = e.target.value;
    if (e.target.type === "file") {
      target = e.target.files[0];
    }
    if (e.target.type === "checkbox") {
      target = e.target.checked;
    }

    setFormData({ ...formData, [e.target.name]: target });
  };

  const onSubmit = e => {
    // e.preventDefault();

    let updates = {};
    for (let update in formData) {
      if (!isEmpty(formData[update])) {
        // console.log(update);
        updates[update] = formData[update];
      }
    }
    if (!!formData.image) {
      const data = new FormData();
      data.append("image", formData.image);
      console.log(data);
    }
    // console.log(updates)
    updateLeagueDetails(details._id, updates);
  };

  let disableZones = false;
  if (details) {
    if (details.zonesBool === true || details.categories.length > 0) {
      disableZones = true;
    }
  }

  return (
    <Fragment>
      <h1>Details</h1>
      <Form onSubmit={onSubmit}>
        <Form.Field>
          <Form.Input
            label="Nombre"
            name="name"
            value={formData.name}
            onChange={onChange}
          />
        </Form.Field>
        <Form.Field>
          <label>Imagen</label>
          <input type="file" name="image" onChange={e => onChange(e)} />
        </Form.Field>
        <h4>Añadir patrocinador</h4>
        ------------------------
        <Form.Field>
          <label>Zones</label>
          <input
            type="checkbox"
            name="zonesBool"
            checked={formData.zonesBool}
            onChange={onChange}
          />
        </Form.Field>
        <Button type="submit">Guardar</Button>
      </Form>
    </Fragment>
  );
};

const mapStateToProps = state => ({
  details: state.admin.details
});

export default connect(
  mapStateToProps,
  { updateLeagueDetails }
)(LeagueDetails);
