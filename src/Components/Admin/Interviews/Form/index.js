import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import styles from './form.module.css';
import Spinner from 'Components/Shared/Spinner';
import Input from 'Components/Shared/Input';
import Select from 'Components/Shared/Select';
import Button from 'Components/Shared/Button';
import { getOneInterview } from 'redux/Interviews/thunks';
import { cleanSelectedInterview } from 'redux/Interviews/actions';
import { getPostulants } from 'redux/Postulants/thunks';
import { getClients } from 'redux/Clients/thunks';
import { getPositions } from 'redux/Positions/thunks';

function InterviewForm({ id, handleSubmit, handleShowModal }) {
  const dispatch = useDispatch();
  const isLoadingForm = useSelector((store) => store.interview.isLoadingForm);
  const clients = useSelector((store) => store.clients.list);
  const postulants = useSelector((store) => store.postulants.list);
  const positions = useSelector((store) => store.positions.list);
  const formData = useSelector((store) => store.interviews.interview);

  useEffect(() => {
    dispatch(getClients());
    dispatch(getPostulants());
    dispatch(getPositions());
    if (id) {
      dispatch(getOneInterview(id));
    }
    return () => {
      dispatch(cleanSelectedInterview());
    };
  }, [dispatch]);

  const onSubmit = (formValues) => {
    handleSubmit(formValues);
    handleShowModal(false);
  };

  const validate = (formValues) => {
    const errors = {};
    if (!formValues.postulant) {
      errors.postulant = 'Postulant is missing';
    }
    if (!formValues.client) {
      errors.client = 'Client is missing';
    }
    if (!formValues.status) {
      errors.status = 'Status is missing';
    }
    if (!formValues.position) {
      errors.position = 'Position is missing';
    }
    if (!formValues.date) {
      errors.date = 'Date is missing';
    }
    return errors;
  };

  const required = (value) => (value ? undefined : 'Required');

  const getCombo = (type) => {
    let options = [];
    switch (type) {
      case 'postulant':
        postulants.map((postulant) => {
          options.push({ value: postulant._id, text: postulant.name });
        });
        break;
      case 'clients':
        clients.map((clients) => {
          options.push({ value: clients._id, text: clients.name });
        });
        break;
      case 'positions':
        positions.map((positions) => {
          options.push({ value: positions._id, text: positions.name });
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
                label="Postulant"
                name="idPostulant"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
                options={getCombo('postulant')}
              />
              <Field
                component={Select}
                label="Client"
                name="idClient"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
                options={getCombo('client')}
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
              <Field
                component={Select}
                label="Positions"
                name="idPositions"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
                options={getCombo('positions')}
              />
              <Field
                component={Input}
                label="Date Time"
                name="dateTime"
                type="date"
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

export default InterviewForm;
