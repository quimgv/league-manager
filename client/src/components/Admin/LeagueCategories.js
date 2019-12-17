import React, { Fragment, useState } from 'react';
import { Button, Dropdown, Form, Loader } from 'semantic-ui-react';

// Redux
import { connect } from 'react-redux';
import { createCategory } from '../../redux/actions/category';

const LeagueCategories = ({
  categories,
  createCategory,
  leagueId,
  loading,
  zones
}) => {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    zone: ''
  });

  const onChangeName = e => {
    setFormData({ ...formData, name: e.target.value });
    console.log(formData);
  };
  const onChangeGender = (e, { value }) => {
    setFormData({ ...formData, gender: value });
    console.log(formData);
  };
  const onChangeZone = (e, { value }) => {
    setFormData({ ...formData, zone: value });
    console.log(formData);
  };
  const onSubmit = () => {
    if (formData.gender === '') {
      alert('Please select a gender');
      return;
    }
    createCategory(formData.name, formData.gender, leagueId, formData.zone);
  };

  const genderOptions = [
    { key: 'female', text: 'Femenino', value: 'female' },
    { key: 'male', text: 'Masculino', value: 'male' },
    { key: 'mix', text: 'Mixto', value: 'mix' }
  ];

  let zoneOptions = [];
  !loading &&
    zones.forEach(zone => {
      zoneOptions.push({
        key: zone._id,
        text: zone.name,
        value: zone._id
      });
    });

  if (!categories) {
    return <div />;
  } else if (loading) {
    return <Loader />;
  } else {
    return (
      <Fragment>
        {categories.map(category => {
          return (
            <div key={category._id}>
              {category.name + ' | ' + category.gender + ' | ' + category.zone}
            </div>
          );
        })}
        <Form onSubmit={onSubmit}>
          <Form.Group>
            <Form.Input label="Nombre" name="name" onChange={onChangeName} />
            <Form.Field name="gender">
              <label>Género</label>
              <Dropdown
                selection
                placeholder="Selecciona género"
                options={genderOptions}
                onChange={onChangeGender}
                name="gender"
              />
            </Form.Field>
            <Form.Field name="zone">
              <label>Zonas</label>
              <Dropdown
                selection
                placeholder="Selecciona zona"
                options={zoneOptions}
                onChange={onChangeZone}
                name="zone"
                disabled={zones.length === 0}
              />
            </Form.Field>
          </Form.Group>
          <Button type="submit">Añadir</Button>
        </Form>
      </Fragment>
    );
  }
};

const mapStateToProps = state => {
  let loading = true;

  if (state.admin.categories !== null && state.admin.zones !== null) {
    loading = false;
  }

  return {
    categories: state.admin.categories,
    zones: state.admin.zones,
    leagueId: state.admin.details._id,
    loading
  };
};

export default connect(
  mapStateToProps,
  { createCategory }
)(LeagueCategories);
