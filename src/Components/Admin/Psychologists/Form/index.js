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
  const isLoadingForm = useSelector((store) => store.psychologists.isLoadingForm);
  const formData = useSelector((store) => store.psychologists.psychologist);
  const error = useSelector((store) => store.psychologists.error);

  const dispatch = useDispatch();

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

  const handleChange = (e) => {
    const { value, name } = e.target;
    formData[name] = value;
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
                labelText="Name"
                component={Input}
                name="name"
                typeInput="text"
                valueInput={formData.name}
                errorMessage="Name is missing"
                error={error.name}
                disabled={formProps.submitting}
                validate={required}
                inputOnChange={handleChange}
              />
              <Field
                labelText="Email"
                component={Input}
                name="email"
                typeInput="email"
                valueInput={formData.email}
                errorMessage="Email is missing"
                error={error.email}
                disabled={formProps.submitting}
              />
              <Field
                labelText="Username"
                component={Input}
                name="username"
                typeInput="text"
                valueInput={formData.username}
                errorMessage="Username is missing"
                error={error.username}
                disabled={formProps.submitting}
              />
              <Field
                labelText="Phone Number"
                component={Input}
                name="phoneNumber"
                typeInput="number"
                valueInput={formData.phoneNumber}
                errorMessage="Phone Number is missing"
                error={error.phoneNumber}
                disabled={formProps.submitting}
              />
              <Field
                labelText="Enrollment Number"
                component={Input}
                name="enrollmentNumber"
                typeInput="number"
                valueInput={formData.enrollmentNumber}
                errorMessage="Enrollment Number is missing"
                error={error.enrollmentNumber}
                disabled={formProps.submitting}
              />
              <Field
                options={['AVAILABLE', 'UNAVAILABLE']}
                labelText="status"
                name="status"
                component={Select}
                valueInput={formData.status}
              >
                {error.status && <span className={styles.error}>*Status is missing</span>}
              </Field>
            </div>
            <div>
              <Field
                labelText="Time Range - From"
                component={Input}
                typeInput="time"
                name="timeStart"
                valueInput={formData.timeStart}
                min="09:00"
                max="18:00"
              />
              {error.timeRange && <span className={styles.error}>*Time Range is missing</span>}
              <Field
                component={Input}
                labelText="To"
                typeInput="time"
                name="timeEnd"
                valueInput={formData.timeEnd}
                min="09:00"
                max="18:00"
              />
              {error.timeRange && <span className={styles.error}>Time Range is missing</span>}
              <Field
                component={Input}
                labelText="Day Range"
                name="dayStart"
                typeInput="date"
                valueInput={formData.dayStart}
                errorMessage="Day is missing"
                error={error.dayRange}
                disabled={formProps.submitting}
              />
              <Field
                labelText="To"
                component={Input}
                name="dayEnd"
                typeInput="date"
                valueInput={formData.dayEnd}
                errorMessage="Day is missing"
                error={error.dayRange}
                disabled={formProps.submitting}
              />
              <Field
                labelText="Password"
                name="password"
                typeInput="password"
                valueInput={formData.password}
                errorMessage="Password is missing"
                error={error.password}
                disabled={formProps.submitting}
                component={Input}
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

export default PsychologistsForm;
