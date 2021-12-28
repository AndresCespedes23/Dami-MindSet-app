import Header from 'Components/Shared/Header';
import Footer from 'Components/Shared/Footer';
import styles from './layout.module.css';
import { Toaster } from 'react-hot-toast';

function Layout(props) {
  const { routes = [] } = props;
  const { styleType = ['admin', 'postulant', 'psychologist'] } = props;
  return (
    <div className={styles.container}>
      {/* Crear un objeto en la carpeta constant para toastOption */}
      <Toaster
        toastOptions={{
          duration: 2000,
          success: {
            style: {
              backgroundColor: 'green',
              color: 'white'
            }
          },
          error: {
            duration: 2000,
            style: {
              backgroundColor: '#B10101',
              color: 'white'
            }
          }
        }}
      />
      <Header routes={routes} styleType={styleType} />
      {props.children}
      <Footer routes={routes} styleType={styleType} />
    </div>
  );
}

export default Layout;
