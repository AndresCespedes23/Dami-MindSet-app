import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Form, Field } from 'react-final-form';
import styles from './form.module.css';
import Spinner from 'Components/Shared/Spinner';
import Select from 'Components/Shared/Select';
import Input from 'Components/Shared/Input';
import Button from 'Components/Shared/Button';
import { getOneApplication } from 'redux/Applications/thunks';
import { cleanSelectedApplication } from 'redux/Applications/actions';
import { getPostulants } from 'redux/Postulants/thunks';
import { getPositions } from 'redux/Positions/thunks';
import { getInterviews } from 'redux/Interviews/thunks';

function ApplicationsForm({ id, handleSubmit, handleShowModal }) {
  const dispatch = useDispatch();
  const isLoadingForm = useSelector((store) => store.applications.isLoadingForm);
  const postulants = useSelector((store) => store.postulants.list);
  const positions = useSelector((store) => store.positions.list);
  const interviews = useSelector((store) => store.interviews.list);
  const formData = useSelector((store) => store.applications.application);

  useEffect(() => {
    dispatch(getPostulants());
    dispatch(getPositions());
    dispatch(getInterviews());
    if (id) {
      dispatch(getOneApplication(id));
    }
    return () => {
      dispatch(cleanSelectedApplication());
    };
  }, [dispatch]);

  const onSubmit = (formValues) => {
    handleSubmit(formValues);
    handleShowModal(false);
  };

  const validate = (formValues) => {
    const errors = {};
    if (!formValues.idPosition) {
      errors.idPosition = 'Position is missing';
    }
    if (!formValues.idCandidate) {
      errors.idCandidate = 'Postulant is missing';
    }
    if (!formValues.idInterview) {
      errors.idInterview = 'Interview is missing';
    }
    if (!formValues.result) {
      errors.result = 'Result is missing';
    }
    if (!formValues.dateTime) {
      errors.dateTime = 'Date is missing';
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
      case 'idPosition':
        positions.map((position) => {
          options.push({ value: position._id, text: position.name });
        });
        break;
      case 'idCandidate':
        postulants.map((postulant) => {
          options.push({ value: postulant._id, text: postulant.name });
        });
        break;
      case 'idInterview':
        interviews.map((interview) => {
          options.push({ value: interview._id, text: interview.dateTime.split('T')[0] });
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
                label="Position"
                name="idPosition"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
                options={getCombo('idPosition')}
                selectedValue={
                  formProps.values ? formProps.values.idPosition?._id : formData.idPosition?._id
                }
              />
              <Field
                component={Select}
                label="Postulant"
                name="idCandidate"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
                options={getCombo('idCandidate')}
                selectedValue={
                  formProps.values ? formProps.values.idCandidate?._id : formData.idCandidate?._id
                }
              />
            </div>
            <div className={styles.flexRow}>
              <Field
                component={Select}
                label="Interview"
                name="idInterview"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
                options={getCombo('idInterview')}
                selectedValue={
                  formProps.values ? formProps.values.idInterview?._id : formData.idInterview?._id
                }
              />
              <Field
                component={Input}
                label="Result"
                name="result"
                type="text"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
              />
            </div>
            <div className={styles.flexRow}>
              <Field
                component={Input}
                label="Date Time"
                name="dateTime"
                type="date"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
                initialValue={String(formProps.values.dateTime).split('T')[0]}
              />
              <Field
                component={Select}
                label="Status"
                name="status"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
                options={[
                  { value: 'PENDING', text: 'PENDING' },
                  { value: 'SCHEDULED', text: 'SCHEDULED' },
                  { value: 'HIRED', text: 'HIRED' },
                  { value: 'REJECTED', text: 'REJECTED' }
                ]}
                selectedValue={formProps.values.status || formData.status}
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

export default ApplicationsForm;
