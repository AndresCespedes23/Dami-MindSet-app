import { Form, Field } from 'react-final-form';
import styles from './courses.module.css';
import Button from 'Components/Shared/Button';
import Input from 'Components/Shared/Input';

function Courses() {
  const onSubmit = (formValues) => {
    console.log(formValues);
  };

  return (
    <section className={styles.container}>
      <div className={styles.containerSummary}>
        <h2 className={styles.title}>Courses and Other Trainings</h2>
        <Form
          onSubmit={onSubmit}
          render={(formProps) => (
            <form onSubmit={formProps.handleSubmit}>
              <div className={styles.formContent}>
                <Field
                  label="Name of the course or training"
                  name="Name of the course or training"
                  component={Input}
                  type="text"
                  placeholder="Enter the name of the course or training"
                />
                <div className={styles.inputColumn}>
                  <Field
                    label="Organization / Institution"
                    name="Organization / Institution"
                    type="text"
                    placeholder="Enter the name of the institution"
                    component={Input}
                  />
                  <div className={styles.timeDurationInputs}>
                    <div className={styles.dateInput}>
                      <Field label="End date" name="End Date" component={Input} type="date" />
                    </div>
                    <div>
                      <Field
                        label="Duration"
                        name="Duration"
                        type="number"
                        component={Input}
                        placeholder="Duration in hs"
                      />
                    </div>
                  </div>
                </div>
                <div className={styles.descriptionInput}>
                  <Field
                    label="Description"
                    name="Description"
                    component={Input}
                    type="textarea"
                    placeholder="Describe briefly what the course or training was about and what was the main knowledge you gained from it"
                  />
                </div>
              </div>
              <div className={styles.containerFooter}>
                <Button type={'back'} text={'BACK'} />
                <Button type="addNew" text={'COURSE'} onClick={formProps.form.reset} />
                <Button type={'next'} text={'NEXT'} onClick={onSubmit} />
              </div>
            </form>
          )}
        />
      </div>
    </section>
  );
}

export default Courses;
