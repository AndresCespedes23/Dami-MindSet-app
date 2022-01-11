import { Link } from 'react-router-dom';
import styles from './footer.module.css';

function Footer(props) {
  const { styleType } = props;
  return (
    <footer
      className={
        styleType === 'postulant'
          ? styles.containerPostulant
          : styleType === 'psychologist'
          ? styles.containerPsychologist
          : styles.container
      }
    >
      <div className={styles.main}>
        <div className={styles.appName}>
          <Link
            to={
              sessionStorage.getItem('userType') === 'ADMIN'
                ? '/admin'
                : sessionStorage.getItem('userType') === 'CANDIDATE'
                ? '/postulants/home'
                : sessionStorage.getItem('userType') === 'PSYCHOLOGIST'
                ? '/psychologist'
                : '/home'
            }
          >
            <div className={styles.logoContainer}>
              <span>M</span>IND<span>S</span>ET
            </div>
          </Link>
        </div>
        <ul
          className={
            styleType === 'postulant'
              ? styles.routesPostulants
              : styleType === 'psychologist'
              ? styles.routesPostulants
              : styles.routes
          }
        >
          {props.routes.map((route, index) => (
            <li key={index}>
              <a href={route.path}>{route.name}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className={styleType === 'psychologist' ? styles.licensePsychologist : styles.license}>
        <div className={styles.copyright}>Copyright © 2021 Radium Rocket</div>
        <div>
          <a href={'https://www.facebook.com/radiumrocket'} target={'_blank'} rel="noreferrer">
            <img
              className={styles.socialIcon}
              src={`${process.env.PUBLIC_URL}/assets/images/facebook.svg`}
            />
          </a>
          <a href={'https://twitter.com/radiumrocket'} target={'_blank'} rel="noreferrer">
            <img
              className={styles.socialIcon}
              src={`${process.env.PUBLIC_URL}/assets/images/twitter.svg`}
            />
          </a>
          <a href={'https://www.instagram.com/radium.rocket/'} target={'_blank'} rel="noreferrer">
            <img
              className={styles.socialIcon}
              src={`${process.env.PUBLIC_URL}/assets/images/instagram.svg`}
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
export default Footer;
