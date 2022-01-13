import { Link } from 'react-router-dom';
import styles from './home.module.css';

function Home() {
  return (
    <section className={styles.container}>
      <div className={styles.containerrutes}>
        <ul className={styles.rutes}>
          <li>
            <Link to="/psychologist/first-view">Pending interviews</Link>
          </li>
          <li>
            <Link to="/psychologist/completed-interviews">Completed interviews</Link>
          </li>
          <li>
            <Link to="/psychologist/profile">Postulants profiles</Link>
          </li>
          <li>
            <Link to="/psychologist/postulants/search">Search postulant</Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Home;