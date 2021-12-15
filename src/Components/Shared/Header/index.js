import { Link } from 'react-router-dom';
import styles from './header.module.css';

function Header(props) {
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
        <ul className={styles.routes}>
          {props.routes.map((route) => (
            <li key={route.name}>
              <Link to={route.path}>{route.name}</Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
