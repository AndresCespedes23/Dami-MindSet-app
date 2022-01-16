import styles from './other-info.module.css';
import { Form, Field } from 'react-final-form';
import { useSelector } from 'react-redux';
import Button from 'Components/Shared/Button';
import Input from 'Components/Shared/Input';
import Select from 'Components/Shared/Select';

function OtherInfoForm({ handleSubmit, handleShowModal }) {
  const formData = useSelector((store) => store.postulants.postulant);

  const onSubmit = (formData) => {
    handleSubmit(formData);
    handleShowModal(false);
  };
  const notNumber = (value) => (isNaN(value) ? undefined : 'Cannot be a number');

  const isNumber = (value) => {
    if (value) return isNaN(value) ? 'Must be a number' : undefined;
  };

  return (
    <section>
      <div>
        <h2 className={styles.title}>
          <span className={styles.bold}>Other Information</span>
        </h2>
        <Form
          onSubmit={onSubmit}
          initialValues={formData}
          render={(formProps) => (
            <form onSubmit={formProps.handleSubmit} className={styles.form}>
              <div>
                <div>
                  <Field
                    component={Input}
                    label="Nationality"
                    name="nationality"
                    placeholder="Enter your nationality"
                    disabled={formProps.submitting}
                    validate={notNumber}
                  />
                </div>
                <div>
                  <Field
                    component={Input}
                    label="ID Number"
                    name="dni"
                    type="number"
                    placeholder="Enter your ID Number"
                    disabled={formProps.submitting}
                    validate={isNumber}
                  />
                </div>
                <div>
                  <Field
                    component={Select}
                    label="Marital Status"
                    name="maritalStatus"
                    options={[
                      { value: 'single', text: 'single' },
                      { value: 'married', text: 'married' },
                      { value: 'divorced', text: 'divorced' },
                      { value: 'widowed', text: 'widowed' }
                    ]}
                    disabled={formProps.submitting}
                  />
                </div>
                <div>
                  <Field
                    component={Select}
                    label="Do you have a driver license?"
                    name="driversLicense"
                    options={[
                      { value: 'yes', text: 'yes' },
                      { value: 'no', text: 'no' }
                    ]}
                    disabled={formProps.submitting}
                  />
                </div>
              </div>
              <section className={styles.containerFooter}>
                <Button type="submit" />
              </section>
            </form>
          )}
        />
      </div>
    </section>
  );
}

export default OtherInfoForm;
