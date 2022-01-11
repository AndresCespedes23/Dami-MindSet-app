import { useHistory } from 'react-router-dom';
import { Link } from 'react-router-dom';
import styles from './header.module.css';
import { logout } from 'redux/Auth/thunks';
import { useDispatch } from 'react-redux';

function Header(props) {
  const { styleType } = props;
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogOut = async () => {
    await dispatch(logout());
    history.push('/');
  };
  const goProfile = () => {
    switch (sessionStorage.getItem('userType')) {
      case 'ADMIN':
        history.push('/admin/profile/administrator');
        break;
      case 'CANDIDATE':
        history.push('/postulants/profile');
        break;
      case 'PSYCHOLOGIST':
        history.push('/psychologist/profile');
        break;
      default:
        break;
    }
  };
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
        {sessionStorage.getItem('userType') !== null ? (
          <div
            className={
              styleType === 'admin'
                ? styles.loginside
                : styleType === 'psychologist'
                ? styles.loginsidePsychologist
                : styles.loginsidePostulant
            }
          >
            {/* <div className={styles.loginuser}>{styleType === 'admin' ? 'user' : 'psychologist'}</div> */}
            <img
              onClick={goProfile}
              className={styles.loginphoto}
              src={`${process.env.PUBLIC_URL}/assets/images/nophotouser.png`}
            />
            <button className={styles.btnLogout} onClick={handleLogOut}>
              LOGOUT
            </button>
          </div>
        ) : (
          <></>
        )}
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
          {props.routes.map((route, index) => (
            <li key={index}>{route.path && <Link to={route.path}>{route.name}</Link>}</li>
          ))}
        </ul>
      </nav>
    </header>
  );
}

export default Header;
