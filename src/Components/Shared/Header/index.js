import { Link } from 'react-router-dom';
import styles from './header.module.css';

function Header() {
  return (
    <header>
      <div className={styles.titlebar}>
        <div>
          <img
            className={styles.titleicon}
            src={`${process.env.PUBLIC_URL}/assets/images/mindseticon.png`}
          />
        </div>
        <div className={styles.appName}>
          <Link to="/home">
            <span>M</span>IND<span>S</span>ET
          </Link>
        </div>
        <div className={styles.loginside}>
          <div className={styles.loginuser}>user</div>
          <img
            className={styles.loginphoto}
            src={`${process.env.PUBLIC_URL}/assets/images/nophotouser.png`}
          />
        </div>
      </div>
      <nav className={styles.navbar}>
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
      </nav>
    </header>
  );
}

export default Header;
