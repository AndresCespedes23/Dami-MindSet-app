import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import styles from './sign.module.css';

function Sign() {
  return (
    <section className={styles.container}>
      <div className={styles.containerTitle}>
        <h2 className={styles.title}>Are you ready to take your first step into your future?</h2>
      </div>
      <div className={styles.containerButton}>
        <Link to="/auth/login">
          <button className={styles.btnLogin}>SIGN IN</button>
        </Link>
        <Link to="/postulants/register">
          <button className={styles.btnRegister}>SIGN UP</button>
        </Link>
      </div>
    </section>
  );
}

export default Sign;
