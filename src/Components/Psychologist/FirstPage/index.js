import { Link } from 'react-router-dom';
import styles from './first-page.module.css';

function FirstPage() {
  return (
    <section className={styles.container}>
      <div className={styles.containerrutes}>
        <ul className={styles.rutes}>
          <li>
            <Link to="/psychologist/home">Home</Link>
          </li>
          <li>
            <Link to="/psychologist/completed-interviews">Interviews</Link>
          </li>
          <li>
            <Link to="/psychologist/postulants/search">Search postulant</Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default FirstPage;
