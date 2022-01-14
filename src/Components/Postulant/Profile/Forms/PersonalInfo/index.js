import styles from './personal-info.module.css';
import { Form, Field } from 'react-final-form';
import { useSelector } from 'react-redux';
import Button from 'Components/Shared/Button';
import Input from 'Components/Shared/Input';

function PersonalInfoForm({ handleSubmit, handleShowModal }) {
  const formData = useSelector((store) => store.postulants.postulant);
  const isLoadingForm = useSelector((store) => store.postulants.isLoadingForm);

  const onSubmit = (formData) => {
    handleSubmit(formData);
    handleShowModal(false);
  };

  return (
    <section>
      <div>
        <h2 className={styles.title}>
          <span className={styles.bold}>Personal Information</span>
        </h2>
        <Form
          onSubmit={onSubmit}
          initialValues={formData}
          render={(formProps) => (
            <form className={styles.form} onSubmit={formProps.handleSubmit}>
              <div className={styles.flexRow}>
                <Field
                  component={Input}
                  label="Name"
                  name="name"
                  disabled={formProps.submitting || isLoadingForm}
                />
                <Field
                  component={Input}
                  label="Username"
                  name="username"
                  disabled={formProps.submitting || isLoadingForm}
                />
              </div>
              <div className={styles.flexRow}>
                <Field
                  component={Input}
                  label="Email"
                  name="email"
                  type="email"
                  disabled={formProps.submitting || isLoadingForm}
                />
                <Field
                  component={Input}
                  label="Date of Birth"
                  name="dateOfBirth"
                  type="date"
                  disabled={formProps.submitting || isLoadingForm}
                />
              </div>
              <div className={styles.flexRow}>
                <Field
                  component={Input}
                  label="Phone Number"
                  name="phoneNumber"
                  type="number"
                  disabled={formProps.submitting || isLoadingForm}
                />
                <Field
                  component={Input}
                  label="Address"
                  name="address"
                  type="text"
                  disabled={formProps.submitting || isLoadingForm}
                />
              </div>
              <div className={styles.flexRow}>
                <Field
                  component={Input}
                  label="City"
                  name="city"
                  type="text"
                  disabled={formProps.submitting || isLoadingForm}
                />
                <Field
                  component={Input}
                  label="Postal Code"
                  name="zipCode"
                  type="number"
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

export default PersonalInfoForm;
