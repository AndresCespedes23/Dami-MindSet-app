import styles from './forbidden.module.css';
import { Link } from 'react-router-dom';

function Forbidden() {
  return (
    <section className={styles.container}>
      <div className={styles.containerDesc}>
        <h1 className={styles.title}>FORBIDDEN</h1>
        <h2 className={styles.title}>403</h2>
        <p className={styles.description}>
          We are sorry, but you do not have access to this page or resource.
        </p>
      </div>
      <div className={styles.containerButton}>
        <Link to="/postulants" className={styles.button}>
          <button className={styles.btnJoinUs}>Go Home!</button>
        </Link>
      </div>
    </section>
  );
}

export default Forbidden;
