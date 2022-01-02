import styles from './psychologists-states.module.css';
import Button from 'Components/Shared/Button';

function PsychologistsStates() {
  return (
    <section className={styles.container}>
      <div className={styles.containerPsychologists}>
        <div className={styles.header}>
          <Button type={'backBtnAdmin'} />
          <h2>Psychologists</h2>
        </div>
        <div className={styles.contentPsychologists}>
          <h3 className={styles.title}>
            <span className={styles.bold}>Pending Approval</span>
          </h3>
          <h3 className={styles.title}>
            <span className={styles.bold}>Active Psychologists</span>
          </h3>
          <h3 className={styles.title}>
            <span className={styles.bold}>Disabled Psychologists</span>
          </h3>
        </div>
      </div>
    </section>
  );
}

export default PsychologistsStates;
