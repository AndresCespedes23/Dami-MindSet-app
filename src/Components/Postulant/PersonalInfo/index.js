import { Form, Field } from 'react-final-form';
import styles from './personal-info.module.css';
import Button from 'Components/Shared/Button';
import Input from 'Components/Shared/Input';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';

function PersonalInfo() {
  const history = useHistory();

  const onSubmit = (formValues) => {
    console.log(formValues);
    if (formValues) {
      history.push('/postulants/education');
    }
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
                <Field
                  label="Phone Number"
                  name="Phone Number"
                  component={Input}
                  type="number"
                  placeholder="Enter your phone number"
                  validate={required}
                />
                <Field
                  label="Date of Birth"
                  name="Date of Birth"
                  type="date"
                  component={Input}
                  validate={required}
                />
                <Field
                  label="Address"
                  name="Address"
                  component={Input}
                  placeholder="Enter your address"
                  validate={required}
                />
                <div className={styles.inputColumn}>
                  <div>
                    <Field
                      label="City"
                      name="City"
                      component={Input}
                      placeholder="Enter your city"
                      validate={required}
                    />
                  </div>
                  <div>
                    <Field
                      label="Postal Code"
                      name="Postal Code"
                      component={Input}
                      type="number"
                      placeholder="Enter your postal code"
                      validate={required}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.containerFooter}>
                <Link to="/postulants/register">
                  <Button type={'back'} text={'BACK'} />
                </Link>
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
