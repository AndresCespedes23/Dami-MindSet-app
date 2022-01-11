import { useSelector } from 'react-redux';
import { Form, Field } from 'react-final-form';
import { useHistory } from 'react-router-dom';
import Input from 'Components/Shared/Input';
import styles from './register.module.css';
import { setRegisterInfo } from 'redux/PostulantModule/actions';
import { registerNewUser } from 'redux/Auth/thunks';
import { login } from 'redux/Auth/thunks';
import { useDispatch } from 'react-redux';

function Register() {
  const error = useSelector((store) => store.postulants.error);
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = (formValues) => {
    if (formValues) {
      dispatch(setRegisterInfo(formValues));
      dispatch(registerNewUser(formValues, 'CANDIDATE')).then(() => {
        dispatch(login(formValues)).then(() => {
          history.push('/postulants/personal-info');
        });
      });
    }
  };

  const validate = (formValues) => {
    const errors = {};
    if (formValues.password !== formValues.repeatPassword) {
      errors.repeatPassword = 'Passwords have to be the same';
    }
    return errors;
  };

  const required = (value) => (value ? undefined : 'Required');
  return (
    <section className={styles.container}>
      <div className={styles.containerSummary}>
        <Form
          onSubmit={onSubmit}
          validate={validate}
          render={(formProps) => (
            <form onSubmit={formProps.handleSubmit}>
              <div className={styles.formContent}>
                <div className={styles.inputColumn}>
                  <div>
                    <Field
                      component={Input}
                      label="Name"
                      name="name"
                      typeInput="text"
                      placeholder="Enter your name"
                      errorMessage="Name is missing"
                      error={error.name}
                      disabled={formProps.submitting}
                      validate={required}
                    />
                  </div>
                  <div>
                    <Field
                      component={Input}
                      label="Username"
                      name="username"
                      typeInput="text"
                      errorMessage="Username is missing"
                      placeholder="Enter your username"
                      error={error.username}
                      disabled={formProps.submitting}
                      validate={required}
                    />
                  </div>
                </div>
                <Field
                  component={Input}
                  label="Email"
                  name="email"
                  typeInput="text"
                  errorMessage="Email is missing"
                  placeholder="Enter your email"
                  error={error.email}
                  disabled={formProps.submitting}
                  validate={required}
                />
                <div className={styles.inputColumn}>
                  <div>
                    <Field
                      component={Input}
                      label="Password"
                      name="password"
                      typeInput="password"
                      type="password"
                      errorMessage="Password is missing"
                      placeholder="Enter your password"
                      error={error.password}
                      disabled={formProps.submitting}
                      validate={required}
                    />
                  </div>
                  <div>
                    <Field
                      component={Input}
                      name="repeatPassword"
                      label="Repeat password"
                      type="password"
                      errorMessage="Repeat password is missing or invalid"
                      placeholder="Enter your password"
                      error={error.repeatPassword}
                      disabled={formProps.submitting}
                      validate={required}
                    />
                    <Field
                      component={Input}
                      name="userType"
                      hiddenInput={true}
                      initialValue="CANDIDATE"
                    />
                  </div>
                </div>
              </div>
              <div className={styles.containerFooter}>
                <button className={styles.btnRegister}>REGISTER</button>
                <span className={styles.messageSign}>
                  Already have an account? <a>Sign In!</a>
                </span>
              </div>
            </form>
          )}
        />
      </div>
    </section>
  );
}

export default Register;
