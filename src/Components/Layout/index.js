import Header from '../Shared/Header/index';
import Footer from '../Shared/Footer/index';
import Admins from '../Admins/index';
import Applications from '../Applications/index';
import Clients from '../Clients/index';
import Interviews from '../Interviews/index';
import Positions from '../Positions/index';
import Postulants from '../Postulants/index';
import Profiles from '../Profiles/index';
import Psychologists from '../Psychologists/index';
import Sessions from '../Sessions/index';
import Home from '../Home/index';
import styles from './layout.module.css';

function Layout() {
  let currentScreen = <Home />;
  switch (window.location.pathname) {
    case '/admins':
      currentScreen = <Admins />;
      break;
    case '/applications':
      currentScreen = <Applications />;
      break;
    case '/clients':
      currentScreen = <Clients />;
      break;
    case '/interviews':
      currentScreen = <Interviews />;
      break;
    case '/positions':
      currentScreen = <Positions />;
      break;
    case '/postulants':
      currentScreen = <Postulants />;
      break;
    case '/profiles':
      currentScreen = <Profiles />;
      break;
    case '/psychologists':
      currentScreen = <Psychologists />;
      break;
    case '/sessions':
      currentScreen = <Sessions />;
      break;
    default:
      break;
  }

  return (
    <div className={styles.container}>
      <Header />
      {currentScreen}
      <table className={styles.table}>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Sara</td>
            <td>Garcia</td>
          </tr>
          <tr>
            <td>Román</td>
            <td>Garcia</td>
          </tr>
        </tbody>
      </table>
      <Footer />
    </div>
  );
}

export default Layout;
