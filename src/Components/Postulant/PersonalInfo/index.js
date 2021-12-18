import styles from './personal-info.module.css';
import Button from 'Components/Shared/Button';
import { Form, Field } from 'react-final-form';

function Description() {
  const onSubmit = (formValues) => {
    console.log(formValues);
  };

  return (
    <section className={styles.container}>
      <div className={styles.containerSummary}>
        <h2 className={styles.title}>Personal Information</h2>
        <Form
          onSubmit={onSubmit}
          render={(formProps) => (
            <form onSubmit={formProps.handleSubmit}>
              <div className={styles.formContent}>
                <div className={styles.column1}>
                  <label>Phone Number</label>
                  <Field
                    name="description"
                    component="input"
                    className={styles.descriptionInput}
                    placeholder="Enter your phone number"
                  />
                  <label>Date of Birth</label>
                  <Field
                    name="description"
                    component="input"
                    className={styles.descriptionInput}
                    placeholder="DD/MM/YYYY"
                  />
                  <label>Address</label>
                  <Field
                    name="description"
                    component="input"
                    className={styles.descriptionInput}
                    placeholder="Enter your address"
                  />
                </div>
                <div className={styles.column2}>
                  <label>City</label>
                  <Field
                    name="description"
                    component="input"
                    className={styles.descriptionInput}
                    placeholder="Enter your city"
                  />
                  <label>Postal Code</label>
                  <Field
                    name="description"
                    component="input"
                    className={styles.descriptionInput}
                    placeholder="Enter your postal code"
                  />
                </div>
              </div>
              <div className={styles.containerFooter}>
                <Button type={'back'} text={'BACK'} />
                <Button type={'next'} text={'NEXT'} />
              </div>
            </form>
          )}
        />
      </div>
    </section>
  );
}

export default Description;
