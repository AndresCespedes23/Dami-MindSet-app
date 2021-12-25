import { Link } from 'react-router-dom';
import styles from './header.module.css';

function Header(props) {
  const { styleType } = props;
  return (
    <header>
      <div
        className={
          styleType === 'postulant'
            ? styles.headerPostulant
            : styleType === 'psychologist'
            ? styles.headerPsychologist
            : styles.titlebar
        }
      >
        <div>
          <img
            className={styleType === 'postulant' ? styles.titleiconPostulant : styles.titleicon}
            src={
              styleType === 'admin'
                ? `${process.env.PUBLIC_URL}/assets/images/mindseticon.png`
                : styleType === 'psychologist'
                ? `${process.env.PUBLIC_URL}/assets/images/mindseticon-psychologist.png`
                : `${process.env.PUBLIC_URL}/assets/images/mindseticon-postulant.png`
            }
          />
        </div>
        <div className={styles.appName}>
          <Link to="/home">
            <div className={styles.logoContainer}>
              <span>M</span>IND<span>S</span>ET
            </div>
          </Link>
        </div>
        <div
          className={
            styleType === 'admin'
              ? styles.loginside
              : styleType === 'psychologist'
              ? styles.loginsidePsychologist
              : styles.loginsidePostulant
          }
        >
          <div className={styles.loginuser}>{styleType === 'admin' ? 'user' : 'psychologist'}</div>
          <img
            className={styles.loginphoto}
            src={`${process.env.PUBLIC_URL}/assets/images/nophotouser.png`}
          />
        </div>
      </div>
      <nav
        className={
          styleType === 'postulant'
            ? styles.navbarPostulant
            : styleType === 'psychologist'
            ? styles.navbarPsychologist
            : styles.navbar
        }
      >
        <ul
          className={
            styleType === 'postulant'
              ? styles.routesPostulants
              : styleType === 'psychologist'
              ? styles.routesPostulants
              : styles.routes
          }
        >
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
