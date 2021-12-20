import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import styles from './form.module.css';
import Spinner from 'Components/Shared/Spinner';
import Input from 'Components/Shared/Input';
import Button from 'Components/Shared/Button';
import { getOneClients } from 'redux/Clients/thunks';
import { cleanSelectedClients } from 'redux/Clients/actions';

function ClientsForm({ id, handleSubmit, handleShowModal }) {
  const isLoadingForm = useSelector((store) => store.clients.isLoadingForm);
  const dispatch = useDispatch();
  const formData = useSelector((store) => store.postulants.postulant);

  useEffect(() => {
    if (id) {
      dispatch(getOneClients(id));
    }
    return () => {
      dispatch(cleanSelectedClients());
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

    return errors;
  };

  const required = (value) => (value ? undefined : 'Required');

  return (
    <>
      <Form
        onSubmit={onSubmit}
        validate={validate}
        initialValues={formData}
        render={(formProps) => (
          <form className={styles.form} onSubmit={formProps.handleSubmit}>
            <div>
              <Field
                component={Input}
                label="Name"
                name="name"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
              />
              <Field
                component={Input}
                label="Email"
                name="email"
                type="email"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
              />
              <Field
                component={Input}
                label="Address"
                name="address"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
              />
              <Field
                component={Input}
                label="Phone Number"
                name="phoneNumber"
                type="number"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
              />
              <Field
                component={Input}
                label="cuit"
                name="cuit"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
              />
              <Field
                component={Input}
                label="Activity Type"
                name="activity"
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
export default ClientsForm;
