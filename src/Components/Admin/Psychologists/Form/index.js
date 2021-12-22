import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import styles from './form.module.css';
import Spinner from 'Components/Shared/Spinner';
import Input from 'Components/Shared/Input';
import Select from 'Components/Shared/Select';
import Button from 'Components/Shared/Button';
import { getOnePsychologist } from 'redux/Psychologists/thunks';
import { cleanSelectedPsychologist } from 'redux/Psychologists/actions';

function PsychologistsForm({ id, handleSubmit, handleShowModal }) {
  const dispatch = useDispatch();
  const isLoadingForm = useSelector((store) => store.psychologists.isLoadingForm);
  const formData = useSelector((store) => store.psychologists.psychologist);

  useEffect(() => {
    if (id) {
      dispatch(getOnePsychologist(id));
    }
    return () => {
      dispatch(cleanSelectedPsychologist());
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
                label="Phone Number"
                name="phoneNumber"
                type="number"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
              />
            </div>
            <div className={styles.flexRow}>
              <Field
                component={Input}
                label="Enrollment Number"
                name="enrollmentNumber"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
              />
              <Field
                component={Select}
                options={['AVAILABLE', 'UNAVAILABLE']}
                label="status"
                name="status"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
              />
            </div>
            <div className={styles.flexRow}>
              <Field
                component={Input}
                label="Time Range - From"
                type="time"
                name="timeStart"
                min="09:00"
                max="18:00"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
              />
              <Field
                component={Input}
                label="To"
                type="time"
                name="timeEnd"
                min="09:00"
                max="18:00"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
              />
            </div>
            <div className={styles.flexRow}>
              <Field
                component={Input}
                label="Day Range"
                name="dayStart"
                type="date"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
              />
              <Field
                component={Input}
                label="To"
                name="dayEnd"
                type="date"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
              />
            </div>
            <Field
              component={Input}
              label="Password"
              name="password"
              type="password"
              disabled={formProps.submitting || isLoadingForm}
              validate={required}
            />
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

export default PsychologistsForm;
