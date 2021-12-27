import styles from './completed-interviews.module.css';
import Button from 'Components/Shared/Button';

function CompletedInterviews() {
  return (
    <section className={styles.container}>
      <div className={styles.containerInterviews}>
        <Button type={'back'} />
        <div className={styles.interviewsContent}>
          <h3 className={styles.title}>
            <span className={styles.bold}>Unassigned users:</span>
          </h3>
          <div className={styles.interviewsInfo}>
            <div className={styles.user}>
              <p className={styles.userName}>Ruben</p>
              <p>Viernes 24 de Diciembre</p>
            </div>
            <div>
              <button className={styles.assignBtn}>ASSING PROFILE</button>
            </div>
          </div>
          <div className={styles.interviewsInfo}>
            <div className={styles.user}>
              <p className={styles.userName}>Jose</p>
              <p>Sabado 25 de Diciembre</p>
            </div>
            <div>
              <button className={styles.assignBtn}>ASSING PROFILE</button>
            </div>
          </div>
        </div>
        <div>
          <h3 className={styles.title}>
            <span className={styles.bold}>Completed Interviews:</span>
          </h3>
          <div className={styles.interviewsInfo}>
            <div className={styles.user}>
              <p className={styles.userName}>Matias</p>
              <p className={styles.date}>Viernes 17 de Agosto</p>
            </div>
            <div>
              <button className={styles.detailsBtn}>DETAILS</button>
            </div>
          </div>
          <div className={styles.interviewsInfo}>
            <div className={styles.user}>
              <p className={styles.userName}>Manuel</p>
              <p className={styles.date}>Sabado 9 de Julio</p>
            </div>
            <div>
              <button className={styles.detailsBtn}>DETAILS</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CompletedInterviews;
