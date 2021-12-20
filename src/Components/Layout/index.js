import Header from 'Components/Shared/Header';
import Footer from 'Components/Shared/Footer';
import styles from './layout.module.css';

function Layout(props) {
  const { routes = [] } = props;
  const { styleType = 'postulant' } = props;
  return (
    <div className={styles.container}>
      <Header routes={routes} styleType={styleType} />
      {props.children}
      <Footer routes={routes} styleType={styleType} />
    </div>
  );
}

export default Layout;
