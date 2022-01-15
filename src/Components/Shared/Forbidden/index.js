import { useHistory } from 'react-router-dom';
import styles from './forbidden.module.css';

function Forbidden() {
  const history = useHistory();

  const goProfile = () => {
    switch (sessionStorage.getItem('userType')) {
      case 'ADMIN':
        history.push('/admin/home');
        break;
      case 'CANDIDATE':
        history.push('/postulants/home');
        break;
      case 'PSYCHOLOGIST':
        history.push('/psychologist/home');
        break;
      default:
        history.push('/postulants');
        break;
    }
  };
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
        <button className={styles.btnJoinUs} onClick={goProfile}>
          Go Home!
        </button>
      </div>
    </section>
  );
}

export default Forbidden;
