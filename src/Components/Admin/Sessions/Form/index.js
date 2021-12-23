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
    if (!formValues.idPsychologist) {
      errors.idPsychologist = 'Psychologist is missing';
    }
    if (!formValues.idCandidate) {
      errors.idCandidate = 'Postulant is missing';
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
    if (!formValues.result) {
      errors.result = 'Result is missing';
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
                label="Psychologist"
                name="idPsychologist"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
                options={getCombo('psychologist')}
                selectedValue={
                  formProps.values.idPsychologist
                    ? formProps.values.idPsychologist._id
                    : formData.idPsychologist?._id
                }
              />
              <Field
                component={Select}
                label="Postulant"
                name="idCandidate"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
                options={getCombo('postulant')}
                selectedValue={
                  formProps.values.idCandidate
                    ? formProps.values.idCandidate._id
                    : formData.idCandidate?._id
                }
              />
            </div>
            <div className={styles.flexRow}>
              <Field
                component={Input}
                label="Date"
                name="date"
                type="date"
                placeholder="Insert a date"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
                initialValue={String(formProps.values.dateTime).split('T')[0]}
              />
              <Field
                component={Input}
                label="Time"
                name="time"
                type="time"
                placeholder="Insert a time"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
                initialValue={formProps.values.time}
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
                label="Result"
                name="result"
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

export default SessionsForm;
