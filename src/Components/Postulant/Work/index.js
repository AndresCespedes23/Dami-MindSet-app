import React from 'react';
import styles from './work.module.css';
import Button from 'Components/Shared/Button';
import Input from 'Components/Shared/Input';
import { Form, Field } from 'react-final-form';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom';
import { setExperienceInfo } from 'redux/PostulantModule/actions';
import { useDispatch } from 'react-redux';

function Work() {
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = (formValues) => {
    console.log(formValues);
    if (formValues) {
      dispatch(setExperienceInfo(formValues));
      history.push('/postulants/courses');
    }
  };

  const handleAdd = (formProps) => {
    dispatch(setExperienceInfo(formProps.values));
    formProps.form.reset();
  };

  return (
    <div className={styles.container}>
      <div className={styles.workContainer}>
        <h2 className={styles.tittle}>Work Experience</h2>
        <Form
          onSubmit={onSubmit}
          render={(formProps) => (
            <form onSubmit={formProps.handleSubmit} className={styles.form}>
              <div className={styles.formContent}>
                <Field
                  label="Company"
                  name="company"
                  component={Input}
                  className={styles.input}
                  placeholder="Enter the Company"
                />
                <Field
                  label="Start Date"
                  name="startDate"
                  type="date"
                  component={Input}
                  className={styles.input}
                />
                <Field
                  label="End Date"
                  name="finishDate"
                  type="date"
                  component={Input}
                  className={styles.input}
                />
              </div>
              <div>
                <Field
                  label="Role"
                  name="role"
                  component={Input}
                  className={styles.input}
                  placeholder="Enter your role"
                />
              </div>
              <div className={styles.details}>
                <Field
                  label="Biggest Accomplishments"
                  name="accomplishments"
                  type="textarea"
                  component={Input}
                  className={styles.input}
                />
                <Field
                  label="What did you do?"
                  name="description"
                  type="textarea"
                  component={Input}
                  className={styles.input}
                />
              </div>
              <div className={styles.buttons}>
                <Link to="/postulants/education">
                  <Button type={'back'} text={'BACK'} />
                </Link>
                <Link to="/postulants/work">
                  <Button type="addNew" onClick={() => handleAdd(formProps)} />
                </Link>
                <Button type={'next'} text={'NEXT'} />
              </div>
            </form>
          )}
        />
      </div>
    </div>
  );
}

export default Work;
