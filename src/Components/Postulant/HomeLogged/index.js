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
        <div className={styles.containerNav}>
          <h2 className={styles.title}>Welcome back, AAAAAAA!</h2>
        </div>
        <div className={styles.containerBody}>
          <h3 className={styles.subtitle}>Upcoming interviews:</h3>
          <table className={styles.table}>
            <tbody>
              <tr className={styles.trTable}>
                <td className={styles.tableColumn}>
                  <span className={styles.mainInfo}>Company 1 - Role 1</span>
                  <span className={styles.subInfo}>Monday, November 08 - 11:00</span>
                </td>
                <td className={styles.tdDetails}>
                  <button className={styles.btnDetails}>VIEW DETAILS</button>
                </td>
                <td className={styles.tdCancel}>
                  <button className={styles.btnCancel}>CANCEL</button>
                </td>
              </tr>
            </tbody>
          </table>
          <div className={styles.containerFooter}>
            <button className={styles.btnAvailability}>CHANGE AVAILABILITY</button>
            <button className={styles.btnInterviews}>SEE COMPLETED INTERVIEWS</button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default HomeLogged;
