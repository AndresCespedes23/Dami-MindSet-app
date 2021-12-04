import { Link } from 'react-router-dom';
import styles from './home.module.css';

function Home() {
  return (
    <section className={styles.container}>
      <div>
        <ul className={styles.rutes}>
          <li>
            <Link to="/admins">admins</Link>
          </li>
          <li>
            <Link to="/applications">applications</Link>
          </li>
          <li>
            <Link to="/clients">clients</Link>
          </li>
          <li>
            <Link to="/interviews">interviews</Link>
          </li>
          <li>
            <Link to="/positions">positions</Link>
          </li>
          <li>
            <Link to="/postulants">postulants</Link>
          </li>
          <li>
            <Link to="/profiles">profiles</Link>
          </li>
          <li>
            <Link to="/psychologists">psychologists</Link>
          </li>
          <li>
            <Link to="/sessions">sessions</Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

export default Home;
