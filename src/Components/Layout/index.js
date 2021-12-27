import Header from 'Components/Shared/Header';
import Footer from 'Components/Shared/Footer';
import styles from './layout.module.css';
import { Toaster } from 'react-hot-toast';

function Layout(props) {
  const { routes = [] } = props;
  const { styleType = ['admin', 'postulant', 'psychologist'] } = props;
  return (
    <div className={styles.container}>
      <Toaster />
      <Header routes={routes} styleType={styleType} />
      {props.children}
      <Footer routes={routes} styleType={styleType} />
    </div>
  );
}

export default Layout;
