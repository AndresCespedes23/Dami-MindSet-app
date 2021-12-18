import styles from './personal-info.module.css';
import Button from 'Components/Shared/Button';
import { Form, Field } from 'react-final-form';

function PersonalInfo() {
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
                <label>Phone Number</label>
                <Field
                  name="Phone Number"
                  component="input"
                  type="number"
                  className={styles.personalInfoInput}
                  placeholder="Enter your phone number"
                />
                <label>Date of Birth</label>
                <Field
                  name="Date of Birth"
                  type="date"
                  component="input"
                  className={styles.personalInfoInput}
                />
                <label>Address</label>
                <Field
                  name="Address"
                  component="input"
                  className={styles.personalInfoInput}
                  placeholder="Enter your address"
                />
                <div className={styles.inputColumn}>
                  <div>
                    <label>City</label>
                    <Field
                      name="City"
                      component="input"
                      className={styles.personalInfoInput}
                      placeholder="Enter your city"
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
                    />
                  </div>
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

export default PersonalInfo;
