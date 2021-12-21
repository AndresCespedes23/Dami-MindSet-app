import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Form, Field } from 'react-final-form';
import styles from './form.module.css';
import Spinner from 'Components/Shared/Spinner';
import Input from 'Components/Shared/Input';
import Select from 'Components/Shared/Select';
import Button from 'Components/Shared/Button';
import { getOneSession } from 'redux/Sessions/thunks';
import { cleanSelectedSession } from 'redux/Sessions/actions';
import { getPsychologists } from 'redux/Psychologists/thunks';
import { getPostulants } from 'redux/Postulants/thunks';

function SessionsForm({ id, handleSubmit, handleShowModal }) {
  const dispatch = useDispatch();
  const isLoadingForm = useSelector((store) => store.sessions.isLoadingForm);
  const formData = useSelector((store) => store.sessions.session);
  const psychologists = useSelector((store) => store.psychologists.list);
  const postulants = useSelector((store) => store.postulants.list);

  useEffect(() => {
    dispatch(getPsychologists());
    dispatch(getPostulants());
    if (id) {
      dispatch(getOneSession(id));
    }
    return () => {
      dispatch(cleanSelectedSession());
    };
  }, [dispatch]);

  const onSubmit = (formValues) => {
    handleSubmit(formValues);
    handleShowModal(false);
  };

  const validate = (formValues) => {
    const errors = {};
    if (!formValues.psychologist) {
      errors.psychologist = 'Psychologist is missing';
    }
    if (!formValues.postulant) {
      errors.postulant = 'Postulant is missing';
    }
    if (!formValues.date) {
      errors.date = 'Date is missing';
    }
    if (!formValues.time) {
      errors.time = 'Time is missing';
    }
    if (!formValues.status) {
      errors.status = 'Status is missing';
    }
    return errors;
  };

  const required = (value) => (value ? undefined : 'Required');

  const getCombo = (type) => {
    let options = [];
    switch (type) {
      case 'psychologist':
        psychologists.map((psychologist) => {
          options.push({ value: psychologist._id, text: psychologist.name });
        });
        break;
      case 'postulant':
        postulants.map((postulant) => {
          options.push({ value: postulant._id, text: postulant.name });
        });
        break;
      default:
        break;
    }
    console.log(options);
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
            <div>
              <Field
                component={Select}
                label="Psychologist"
                name="idPsychologist"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
                options={getCombo('psychologist')}
              />
              <Field
                component={Select}
                label="Postulant"
                name="idPostulant"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
                options={getCombo('postulant')}
              />
               <Field
                component={Input}
                label="Date Time"
                name="date"
                type="date"
                placeholder="Insert a date"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
              />
               <Field
                component={Input}
                label="Date Time"
                name="time"
                type="date"
                placeholder="Insert a time"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
              />
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

export default SessionsForm;
