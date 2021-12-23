import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import styles from './form.module.css';
import Spinner from 'Components/Shared/Spinner';
import Input from 'Components/Shared/Input';
import Button from 'Components/Shared/Button';
import { getOneProfile } from 'redux/Profiles/thunks';
import { cleanSelectedProfiles } from 'redux/Profiles/actions';

function ProfilesForm({ id, handleSubmit, handleShowModal }) {
  const dispatch = useDispatch();
  const isLoadingForm = useSelector((store) => store.profiles.isLoadingForm);
  const formData = useSelector((store) => store.profiles.profile);

  useEffect(() => {
    if (id) {
      dispatch(getOneProfile(id));
    }
    return () => {
      dispatch(cleanSelectedProfiles());
    };
  }, [dispatch]);

  const onSubmit = (formValues) => {
    handleSubmit(formValues);
    handleShowModal(false);
    console.log(formValues);
  };

  const validate = (formValues) => {
    const errors = {};
    if (!formValues.name) {
      errors.name = 'Profile is missing';
    }
    if (!formValues.description) {
      errors.description = 'Description is missing';
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
                label="Type of Profile"
                name="name"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
              />
              <Field
                component={Input}
                label="Description"
                name="description"
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

export default ProfilesForm;
