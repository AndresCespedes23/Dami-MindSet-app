import styles from './personal-info.module.css';
import Button from 'Components/Shared/Button';
import { Form, Field } from 'react-final-form';

function PersonalInfo() {
  const onSubmit = (formValues) => {
    console.log(formValues);
  };
  const required = (value) => (value ? undefined : 'Required');

  return (
    <section className={styles.container}>
      <div className={styles.containerSummary}>
        <h2 className={styles.title}>Personal Information</h2>
        <Form
          onSubmit={onSubmit}
          render={(formProps) => (
            <form onSubmit={formProps.handleSubmit}>
              <div className={styles.formContent}>
                <label>Phone Number</label>
                <Field
                  name="Phone Number"
                  component="input"
                  type="number"
                  className={styles.personalInfoInput}
                  placeholder="Enter your phone number"
                  validate={required}
                />
                <label>Date of Birth</label>
                <Field
                  name="Date of Birth"
                  type="date"
                  component="input"
                  className={styles.personalInfoInput}
                  validate={required}
                />
                <label>Address</label>
                <Field
                  name="Address"
                  component="input"
                  className={styles.personalInfoInput}
                  placeholder="Enter your address"
                  validate={required}
                />
                <div className={styles.inputColumn}>
                  <div>
                    <label>City</label>
                    <Field
                      name="City"
                      component="input"
                      className={styles.personalInfoInput}
                      placeholder="Enter your city"
                      validate={required}
                    />
                  </div>
                  <div>
                    <label>Postal Code</label>
                    <Field
                      name="Postal Code"
                      component="input"
                      type="number"
                      className={styles.personalInfoInput}
                      placeholder="Enter your postal code"
                      validate={required}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.containerFooter}>
                <Button type={'back'} text={'BACK'} />
                <Button type={'next'} text={'NEXT'} onClick={onSubmit} />
              </div>
            </form>
          )}
        />
      </div>
    </section>
  );
}

export default PersonalInfo;
