import { Link } from 'react-router-dom';
import styles from './home.module.css';

function Home() {
  return (
    <section className={styles.container}>
      <div className={styles.containerrutes}>
        <ul className={styles.rutes}>
          <li>
            <Link to="/admin/admins">admins</Link>
          </li>
          <li>
            <Link to="/admin/applications">applications</Link>
          </li>
          <li>
            <Link to="/admin/clients">clients</Link>
          </li>
          <li>
            <Link to="/admin/interviews">interviews</Link>
          </li>
          <li>
            <Link to="/admin/positions">positions</Link>
          </li>
          <li>
            <Link to="/admin/postulants">postulants</Link>
          </li>
          <li>
            <Link to="/admin/profiles">profiles</Link>
          </li>
          <li>
            <Link to="/admin/psychologists">psychologists</Link>
          </li>
          <li>
            <Link to="/admin/sessions">sessions</Link>
          </li>
          <li>
            <Link to="/admin/statistics">statistics</Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Home;
