import { useSelector } from 'react-redux';
import { Form, Field } from 'react-final-form';
import Input from 'Components/Shared/Input';
import styles from './register.module.css';

function Register() {
  const error = useSelector((store) => store.postulants.error);

  const onSubmit = (formValues) => {
    console.log(formValues);
  };

  const validate = (formValues) => {
    const errors = {};
    if (!formValues.username) {
      errors.username = 'Username is required';
    }
    if (formValues.name?.length < 3) {
      errors.name = 'Name must be at least 3 characters';
    }
    return errors;
  };

  const required = (value) => (value ? undefined : 'Required');
  return (
    <section className={styles.container}>
      <div className={styles.containerBlock}>
        <div className={styles.containerForm}>
          <Form
            onSubmit={onSubmit}
            validate={validate}
            render={(formProps) => (
              <form className={styles.containerInput} onSubmit={formProps.handleSubmit}>
                <div className={styles.itemInputColumn}>
                  <h3 className={styles.titleInput}>Name</h3>
                  <Field
                    component={Input}
                    name="name"
                    typeInput="text"
                    errorMessage="Name is missing"
                    error={error.name}
                    disabled={formProps.submitting}
                    validate={required}
                  />
                </div>
                <div className={styles.itemInputColumn}>
                  <h3 className={styles.titleInput}>Surname</h3>
                  <Field
                    component={Input}
                    name="username"
                    typeInput="text"
                    errorMessage="Username is missing"
                    error={error.username}
                    disabled={formProps.submitting}
                    validate={required}
                  />{' '}
                </div>
                <div className={styles.itemInputColumnLong}>
                  <h3 className={styles.titleInput}>Email</h3>
                  <Field
                    component={Input}
                    name="email"
                    typeInput="text"
                    errorMessage="Email is missing"
                    error={error.email}
                    disabled={formProps.submitting}
                    validate={required}
                  />
                </div>
                <div className={styles.itemInputColumn}>
                  <h3 className={styles.titleInput}>Password</h3>
                  <Field
                    component={Input}
                    name="password"
                    typeInput="password"
                    errorMessage="Password is missing"
                    error={error.password}
                    disabled={formProps.submitting}
                    validate={required}
                  />
                </div>
                <div className={styles.itemInputColumn}>
                  <h3 className={styles.titleInput}>Repeat password</h3>
                  <Field
                    component={Input}
                    name="repeatPassword"
                    type="password"
                    errorMessage="Repeat password is missing or invalid"
                    error={error.repeatPassword}
                    disabled={formProps.submitting}
                    validate={required}
                  />
                </div>
                <div className={styles.containerFooter}>
                  <button className={styles.btnRegister} onClick={onSubmit}>
                    REGISTER
                  </button>
                  <span className={styles.messageSign}>
                    Already have an account? <a>Sign In!</a>
                  </span>
                </div>
              </form>
            )}
          />
        </div>
      </div>
    </section>
  );
}

export default Register;
