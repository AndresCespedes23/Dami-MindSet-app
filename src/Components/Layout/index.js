import Header from '../Shared/Header/index';
import Footer from '../Shared/Footer/index';
import Admins from '../Admins/index';
import Applications from '../Applications/index';
//agregando segun clase Esteban TENGO QUE VOLVER A CREAR LA CARPETA FORM
// import ApplicationsForm from '../Applications/Form';
import Clients from '../Clients/index';
import Interviews from '../Interviews/index';
import Positions from '../Positions/index';
import Postulants from '../Postulants/index';
import Profiles from '../Profiles/index';
import Psychologists from '../Psychologists/index';
import Sessions from '../Sessions/index';
import Home from '../Home/index';
import styles from './layout.module.css';
// import Modal from '../Shared/Modal/index';
// import { useState } from 'react';
function Layout() {
  // const [showModal, setShowModal] = useState(true);

  let currentScreen = <Home />;
  switch (window.location.pathname) {
    case '/admins':
      currentScreen = <Admins />;
      break;
    case '/applications':
      currentScreen = <Applications />;
      break;
    //case '/applications/form':
    //  currentScreen = <ApplicationsForm />;
    //  break;
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

  // const handleShowModal = () => {
  //   setShowModal(!showModal);
  // };

  return (
    <div className={styles.container}>
      <Header />
      {currentScreen}
      {
        //showModal && <Modal handleShowModal={handleShowModal} />}
      }
      <Footer />
    </div>
  );
}
export default Layout;
