import styles from './description.module.css';
import Button from 'Components/Shared/Button';

function Description() {
  return (
    <section className={styles.container}>
      <div className={styles.containerSummary}>
        <h2 className={styles.title}>Description</h2>
        <h3 className={styles.subtitle}>
          <span className={styles.bold}>Description</span>(Optional)
        </h3>
        <textarea
          className={styles.descriptionInput}
          placeholder="Tell the world a little bit about yourself"
          rows={10}
        ></textarea>
        <div className={styles.containerFooter}>
          <Button type={'back'} text={'BACK'} />
          <Button type={'next'} text={'NEXT'} />
        </div>
      </div>
    </section>
  );
}

export default Description;
