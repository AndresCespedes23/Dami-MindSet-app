import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import styles from './form.module.css';
import Spinner from 'Components/Shared/Spinner';
import Input from 'Components/Shared/Input';
import Select from 'Components/Shared/Select';
import Button from 'Components/Shared/Button';
import { getOnePostulant } from 'redux/Postulants/thunks';
import { cleanSelectedPostulant } from 'redux/Postulants/actions';

function PostulantsForm({ id, handleSubmit, handleShowModal }) {
  const dispatch = useDispatch();
  const isLoadingForm = useSelector((store) => store.postulants.isLoadingForm);
  const formData = useSelector((store) => store.postulants.postulant);

  useEffect(() => {
    if (id) {
      dispatch(getOnePostulant(id));
    }
    return () => {
      dispatch(cleanSelectedPostulant());
    };
  }, [dispatch]);

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
              />
              <Field
                component={Input}
                label="Username"
                name="username"
                disabled={formProps.submitting || isLoadingForm}
              />
              <Field
                component={Input}
                label="Password"
                name="password"
                type="password"
                disabled={formProps.submitting || isLoadingForm}
              />
              <Field
                component={Select}
                options={['MALE', 'FEMALE', 'OTHER']}
                label="Gender"
                name="gender"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
              />
              <Field
                component={Input}
                label="Address"
                name="address"
                type="text"
                disabled={formProps.submitting || isLoadingForm}
              />
              <Field
                component={Input}
                label="Phone Number"
                name="phoneNumber"
                type="number"
                disabled={formProps.submitting || isLoadingForm}
              />
            </div>
            <div>
              <Field
                component={Input}
                label="Date of Birth"
                name="dateOfBirth"
                type="date"
                disabled={formProps.submitting || isLoadingForm}
              />
              <Field
                component={Input}
                label="Zip Code"
                name="zipCode"
                type="number"
                disabled={formProps.submitting || isLoadingForm}
              />
              <Field
                component={Input}
                label="City"
                name="city"
                type="text"
                disabled={formProps.submitting || isLoadingForm}
              />
              <Field
                component={Input}
                label="State"
                name="state"
                type="text"
                disabled={formProps.submitting || isLoadingForm}
              />
              <Field
                component={Input}
                label="Country"
                name="country"
                type="text"
                disabled={formProps.submitting || isLoadingForm}
              />
              <Field
                component={Input}
                label="DNI"
                name="dni"
                type="text"
                disabled={formProps.submitting || isLoadingForm}
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

export default PostulantsForm;
