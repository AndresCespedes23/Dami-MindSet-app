import React from 'react';
import Button from 'Components/Shared/Button';
import Input from 'Components/Shared/Input';
import Select from 'Components/Shared/Select';
import { Form, Field } from 'react-final-form';
import styles from './otherInfoForm.module.css';
import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { setOtherInfo } from 'redux/PostulantModule/actions';
import { useDispatch } from 'react-redux';

const OtherInfoForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = (formValues) => {
    if (formValues) {
      dispatch(setOtherInfo(formValues));
      history.push('/postulants/availability');
    }
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
                <Link to="/postulants/description">
                  <Button type={'back'} text={'BACK'} />
                </Link>
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
