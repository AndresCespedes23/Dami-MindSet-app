import React from 'react';
import styles from './work.module.css';
import Button from 'Components/Shared/Button';
import Input from 'Components/Shared/Input';
import { Form, Field } from 'react-final-form';

function Work() {
  const onSubmit = (formValues) => {
    console.log(formValues);
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
                <Button type={'back'} text={'BACK'} />
                <Button type={'addNew'} onClick={formProps.form.reset} />
                <Button type={'next'} text={'NEXT'} onClick={onSubmit} />
              </div>
            </form>
          )}
        />
      </div>
    </div>
  );
}

export default Work;
