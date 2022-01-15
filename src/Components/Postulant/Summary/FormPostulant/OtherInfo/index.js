import styles from './other-info.module.css';
import { Form, Field } from 'react-final-form';
import { useSelector } from 'react-redux';
import Button from 'Components/Shared/Button';
import Input from 'Components/Shared/Input';

function OtherForm({ handleSubmit, handleShowModal }) {
  const formData = useSelector((store) => store.postulantModule.postulantData);
  const isLoadingForm = useSelector((store) => store.postulants.isLoadingForm);

  const onSubmit = (formData) => {
    handleSubmit(formData);
    handleShowModal(false);
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
            <form className={styles.form} onSubmit={formProps.handleSubmit}>
              <div className={styles.flexRow}>
                <Field
                  component={Input}
                  label="Nationality"
                  name="nationality"
                  disabled={formProps.submitting || isLoadingForm}
                />
                <Field
                  component={Input}
                  label="ID Number"
                  name="dni"
                  disabled={formProps.submitting || isLoadingForm}
                />
              </div>
              <div className={styles.flexRow}>
                <Field
                  component={Input}
                  label="Marital Status"
                  name="maritalStatus"
                  options={[
                    { value: 'single', text: 'single' },
                    { value: 'married', text: 'married' },
                    { value: 'divorced', text: 'divorced' },
                    { value: 'widowed', text: 'widowed' }
                  ]}
                  disabled={formProps.submitting || isLoadingForm}
                />
                <Field
                  component={Input}
                  label="Drivers license"
                  name="driversLicense"
                  options={[
                    { value: 'yes', text: 'yes' },
                    { value: 'no', text: 'no' }
                  ]}
                  disabled={formProps.submitting || isLoadingForm}
                />
                <Field
                  component={Input}
                  label="Description"
                  name="description"
                  type="textarea"
                  disabled={formProps.submitting || isLoadingForm}
                />
              </div>
              <div className={styles.containerFooter}>
                <Button type="submit" />
              </div>
            </form>
          )}
        />
      </div>
    </section>
  );
}

export default OtherForm;
