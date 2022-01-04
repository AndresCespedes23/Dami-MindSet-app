import { Form, Field } from 'react-final-form';
import { useHistory } from 'react-router-dom';
import styles from './login.module.css';
import Input from 'Components/Shared/Input';
import { login } from 'redux/Auth/thunks';
import { useDispatch } from 'react-redux';

function LoginForm() {
  const dispatch = useDispatch();
  const history = useHistory();

  const onSubmit = (formValues) => {
    return dispatch(login(formValues)).then((response) => {
      if (response.type === 'LOGIN_FULFILLED') {
        switch (sessionStorage.getItem('userType')) {
          case 'CANDIDATE':
            history.push('/postulants/home');
            break;
          case 'ADMIN':
            history.push('/admin');
            break;
          case 'PSYCHOLOGIST':
            history.push('/psychologist');
            break;
          default:
            break;
        }
      }
    });
  };

  return (
    <>
      <section className={styles.container}>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, submitting, pristine }) => (
            <form onSubmit={handleSubmit} className={styles.form}>
              <h2 className={styles.mainTitle}>Login</h2>
              <div className={styles.flexRow}>
                <Field
                  name="email"
                  label="Email"
                  element="input"
                  disabled={submitting}
                  component={Input}
                />
                <Field
                  name="password"
                  label="Password"
                  type="password"
                  element="input"
                  disabled={submitting}
                  component={Input}
                />
              </div>
              <div className={styles.buttonContainer}>
                <button
                  className={`${styles.buttonGreen} ${(submitting || pristine) && styles.disabled}`}
                  type="submit"
                  disabled={submitting || pristine}
                >
                  LOGIN
                </button>
              </div>
            </form>
          )}
        />
      </section>
    </>
  );
}

export default LoginForm;
