import React from 'react';
import styles from './work.module.css';
import Button from 'Components/Shared/Button';
import Input from 'Components/Shared/Input';
import { Form, Field } from 'react-final-form';

function Work() {
  const onSubmit = (formValues) => {
    console.log(formValues);
  };
  const required = (value) => (value ? undefined : 'Required');
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
                  validate={required}
                />
                <Field
                  label="Start Date"
                  name="startDate"
                  type="date"
                  component={Input}
                  className={styles.input}
                  validate={required}
                />
                <Field
                  label="End Date"
                  name="finishDate"
                  type="date"
                  component={Input}
                  className={styles.input}
                  validate={required}
                />
              </div>
              <div>
                <Field
                  label="Role"
                  name="role"
                  component={Input}
                  className={styles.input}
                  placeholder="Enter your role"
                  validate={required}
                />
              </div>
              <div>
                <Field
                  label="Biggest Accomplishments"
                  name="accomplishments"
                  component={Input}
                  className={styles.input}
                  validate={required}
                />
                <Field
                  label="What did you do?"
                  name="description"
                  component={Input}
                  className={styles.input}
                  validate={required}
                />
              </div>
            </form>
          )}
        />
        <div className={styles.buttons}>
          <Button type={'back'} text={'BACK'} />
          <Button type={'next'} text={'NEXT'} onClick={onSubmit} />
        </div>
      </div>
    </div>
  );
}

export default Work;
