import styles from './homeLogged.module.css';
// import { useHistory } from 'react-router-dom';
// import { useDispatch } from 'react-redux';

function HomeLogged() {
  //   const history = useHistory();
  //   const dispatch = useDispatch();
  // como meter el usserlogged?? ponerlo en el reducer de auth?? o manejarlo distinto??
  return (
    <section className={styles.container}>
      <div className={styles.containerSummary}>
        {/* <h2 className={styles.title}>Welcome back, {userLogged.name}</h2> */}
      </div>
    </section>
  );
}

export default HomeLogged;
