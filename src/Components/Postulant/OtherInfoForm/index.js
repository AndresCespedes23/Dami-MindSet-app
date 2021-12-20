import React from 'react';
import Button from 'Components/Shared/Button';
import Input from 'Components/Shared/Input';
import Select from 'Components/Shared/Select';
import { Form, Field } from 'react-final-form';
import styles from './otherInfoForm.module.css';

const OtherInfoForm = () => {
  const onSubmit = (formValues) => {
    console.log(formValues);
  };

  const notNumber = (value) => (isNaN(value) ? undefined : 'Cannot be a number');

  const isNumber = (value) => {
    if (value) return isNaN(value) ? 'Must be a number' : undefined;
  };

  return (
    <section className={styles.container}>
      <div className={styles.containerForm}>
        <h2 className={styles.title}>Other Information (optional)</h2>
        <Form
          onSubmit={onSubmit}
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
                    name="idNumber"
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
                    name="maritalSattus"
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
                    name="driverLicense"
                    options={[
                      { value: 'yes', text: 'yes' },
                      { value: 'no', text: 'no' }
                    ]}
                    disabled={formProps.submitting}
                  />
                </div>
              </div>
              <section className={styles.containerFooter}>
                <Button type={'back'} text={'BACK'} />
                <Button type={'next'} text={'NEXT'} />
              </section>
            </form>
          )}
        />
      </div>
    </section>
  );
};

export default OtherInfoForm;
