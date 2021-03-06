import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Field } from 'react-final-form';
import styles from './form.module.css';
import Spinner from 'Components/Shared/Spinner';
import Input from 'Components/Shared/Input';
import Button from 'Components/Shared/Button';
import { getOneAdmin } from 'redux/Admins/thunks';
import { cleanSelectedAdmins } from 'redux/Admins/actions';

function AdminsForm({ id, handleSubmit, handleShowModal }) {
  const dispatch = useDispatch();
  const isLoadingForm = useSelector((store) => store.admins.isLoadingForm);
  const formData = useSelector((store) => store.admins.admin);

  useEffect(() => {
    if (id) {
      dispatch(getOneAdmin(id));
    }
    return () => {
      dispatch(cleanSelectedAdmins());
    };
  }, []);

  const onSubmit = (formValues) => {
    handleSubmit(formValues);
    handleShowModal(false);
  };

  const validate = (formValues) => {
    const errors = {};
    if (!formValues.username) {
      errors.username = 'Username is required';
    }
    if (formValues.name?.length < 3) {
      errors.name = 'Name must be at least 3 characters';
    }
    if (!formValues.email?.includes('@')) {
      errors.email = 'Email must have correct format';
    }
    if (!formValues.password) {
      errors.password = 'Password is required';
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
                label="Email"
                name="email"
                type="email"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
              />
            </div>
            <div className={styles.flexRow}>
              <Field
                component={Input}
                label="Username"
                name="username"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
              />
              <Field
                component={Input}
                label="Password"
                name="password"
                type="password"
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

export default AdminsForm;
