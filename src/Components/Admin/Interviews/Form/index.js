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
  const isLoadingForm = useSelector((store) => store.interviews.isLoadingForm);
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
    if (!formValues.idCandidate) {
      errors.idCandidate = 'Postulant is missing';
    }
    if (!formValues.idClient) {
      errors.idClient = 'Client is missing';
    }
    if (!formValues.status) {
      errors.status = 'Status is missing';
    }
    if (!formValues.idPosition) {
      errors.idPosition = 'Position is missing';
    }
    if (!formValues.dateTime) {
      errors.dateTime = 'Date is missing';
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
        clients.map((client) => {
          options.push({ value: client._id, text: client.name });
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
              <Field
                component={Select}
                label="Client"
                name="idClient"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
                options={getCombo('clients')}
                selectedValue={
                  formProps.values.idClient ? formProps.values.idClient._id : formData.idClient?._id
                }
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
                selectedValue={formProps.values.status || formData.status}
              />
              <Field
                component={Select}
                label="Positions"
                name="idPosition"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
                options={getCombo('positions')}
                selectedValue={
                  formProps.values.idPosition
                    ? formProps.values.idPosition._id
                    : formData.idPosition?._id
                }
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
