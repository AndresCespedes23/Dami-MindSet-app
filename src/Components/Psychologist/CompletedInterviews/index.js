import styles from './completed-interviews.module.css';
import Button from 'Components/Shared/Button';

function Description() {
  return (
    <section className={styles.container}>
      <div className={styles.containerInterviews}>
        <Button type={'back'} />
        <h3 className={styles.subtitle}>
          <span className={styles.bold}>Unassigned users:</span>
        </h3>
        <h3 className={styles.subtitle}>
          <span className={styles.bold}>Completed Interviews:</span>
        </h3>
      </div>
    </section>
  );
}

export default Description;
