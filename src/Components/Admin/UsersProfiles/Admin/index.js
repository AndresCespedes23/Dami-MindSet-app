import styles from './admin.module.css';
import Button from 'Components/Shared/Button';

function AdminProfile() {
  return (
    <section className={styles.container}>
      <div className={styles.profile}>
        <div className={styles.header}>
          <div>
            <Button type={'backBtnAdmin'} />
          </div>
          <div className={styles.headercolumn}>
            <h2 className={styles.profileTitle}>Profile</h2>
            <span className={styles.adminTitle}>Administrator</span>
          </div>
        </div>
        <div className={styles.info}>
          <div className={styles.rowInfo}>
            <div className={styles.adminInfo}>
              Name:<span>roberto</span>
            </div>
            <div className={styles.adminInfo}>
              Username:<span>sandro</span>
            </div>
          </div>
          <div className={styles.columnInfo}>
            <div className={styles.adminInfo}>
              Email:<span>sandroRosa@gmail.com</span>
            </div>
            <div className={styles.adminInfo}>
              Phone Number:<span>12314325424</span>
            </div>
          </div>
          <div className={styles.editBtn}>
            <Button type={'editInfo'} />
          </div>
        </div>
        <div className={styles.footer}>
          <span>Status</span>
          <p className={styles.statusActive}>ACTIVE</p>
        </div>
      </div>
    </section>
  );
}

export default AdminProfile;
