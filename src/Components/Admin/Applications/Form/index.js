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
  const formData = useSelector((store) => store.interviews.interview);

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
    if (!formValues.position) {
      errors.position = 'Position is missing';
    }
    if (!formValues.postulant) {
      errors.postulant = 'Postulant is missing';
    }
    if (!formValues.interview) {
      errors.interview = 'Interview is missing';
    }
    if (!formValues.result) {
      errors.result = 'Result is missing';
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
      case 'positions':
        positions.map((positions) => {
          options.push({ value: positions._id, text: positions.name });
        });
        break;
      case 'postulants':
        postulants.map((postulant) => {
          options.push({ value: postulant._id, text: postulant.name });
        });
        break;
      case 'interviews':
        interviews.map((interview) => {
          options.push({ value: interview._id, text: interview.name });
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
                label="Position"
                name="idPosition"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
                options={getCombo('position')}
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
                component={Select}
                label="Interview"
                name="idInterview"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
                options={getCombo('interview')}
              />
              <Field
                component={Input}
                label="Result"
                name="result"
                type="text"
                disabled={formProps.submitting || isLoadingForm}
                validate={required}
              />
              <Field
                component={Input}
                label="Date Time"
                name="dateTime"
                type="date"
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
                  { value: 'PENDING', text: 'PENDING' },
                  { value: 'SCHEDULED', text: 'SCHEDULED' },
                  { value: 'HIRED', text: 'HIRED' },
                  { value: 'REJECTED', text: 'REJECTED' }
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

export default ApplicationsForm;
