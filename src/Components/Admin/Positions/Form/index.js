import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Field } from 'react-final-form';
import styles from './form.module.css';
import Spinner from 'Components/Shared/Spinner';
import Input from 'Components/Shared/Input';
import Button from 'Components/Shared/Button';
import Select from 'Components/Shared/Select';
import { getOnePosition } from 'redux/Positions/thunks';
import { getClients } from 'redux/Clients/thunks';
import { getProfiles } from 'redux/Profiles/thunks';
import { cleanSelectedPositions } from 'redux/Positions/actions';
import { cleanSelectedClients } from 'redux/Clients/actions';
import { cleanSelectedProfiles } from 'redux/Profiles/actions';

function PositionsForm({ id, handleSubmit, handleShowModal }) {
  const dispatch = useDispatch();
  const isLoadingForm = useSelector((store) => store.positions.isLoadingForm);
  const clients = useSelector((store) => store.clients.list);
  const profiles = useSelector((store) => store.profiles.list);
  const formData = useSelector((store) => store.positions.position);

  useEffect(() => {
    dispatch(getClients());
    dispatch(getProfiles());
    if (id) {
      dispatch(getOnePosition(id));
    }
    return () => {
      dispatch(cleanSelectedPositions());
      dispatch(cleanSelectedClients());
      dispatch(cleanSelectedProfiles());
    };
  }, [dispatch]);

  const onSubmit = (formValues) => {
    handleSubmit(formValues);
    handleShowModal(false);
  };

  const validate = (formValues) => {
    const errors = {};
    if (formValues.name?.length < 3) {
      errors.name = 'Name must be at least 3 characters';
    }
    if (!formValues.status) {
      errors.email = 'Status is required';
    }
    return errors;
  };

  const required = (value) => (value ? undefined : 'Required');
  const getCombo = (type) => {
    let options = [];
    switch (type) {
      case 'client':
        clients.map((client) => {
          options.push({ value: client._id, text: client.name });
        });
        break;
      case 'profile':
        profiles.map((profile) => {
          options.push({ value: profile._id, text: profile.name });
        });
        break;
      default:
        break;
    }
    return options;
  };
  return (
    <>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        initialValues={formData}
        render={(formProps) => (
          <form className={styles.form} onSubmit={formProps.handleSubmit}>
            <div className={styles.flexRow}>
              <Field
                component={Select}
                label="Client"
                name="idClient"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
                options={getCombo('client')}
                selectedValue={
                  formProps.values.idClient ? formProps.values.idClient._id : formData.idClient?._id
                }
              />
              <Field
                component={Select}
                label="Profile"
                name="idProfile"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
                options={getCombo('profile')}
                selectedValue={
                  formProps.values.idProfile
                    ? formProps.values.idProfile[0]._id
                    : formData.idProfile
                    ? formData.idProfile[0]._id
                    : formData.idProfile
                }
              />
            </div>
            <div className={styles.flexRow}>
              <Field
                component={Input}
                label="Name"
                name="name"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
              />
              <Field
                component={Input}
                label="Description"
                name="description"
                type="text"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
              />
            </div>
            <div className={styles.flexRow}>
              <Field
                component={Select}
                label="Status"
                name="status"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
                options={[
                  { value: 'DONE', text: 'DONE' },
                  { value: 'PENDING', text: 'PENDING' }
                ]}
                selectedValue={formProps.values.status || formData.status}
              />
              <Field
                component={Input}
                label="Address"
                name="address"
                type="text"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
              />
            </div>
            <div className={styles.flexRow}>
              <Field
                component={Input}
                label="City"
                name="city"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
              />
              <Field
                component={Input}
                label="Zip code"
                name="postalCode"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
              />
            </div>
            {isLoadingForm === true ? (
              <Spinner type="Oval" color="#002147" height={40} width={40} />
            ) : (
              <Button type="submit" />
            )}
          </form>
        )}
      />
    </>
  );
}

export default PositionsForm;
