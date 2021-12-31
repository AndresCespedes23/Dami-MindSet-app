import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOneAdmin } from 'redux/Admins/thunks';
import styles from './admin.module.css';
import Button from 'Components/Shared/Button';

function AdminProfile() {
  const admin = useSelector((store) => store.admins.list);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOneAdmin('61af7bfaddca344defd8a091'));
  }, [dispatch]);
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
              Name:<span>{admin.name}</span>
            </div>
            <div className={styles.adminInfo}>
              Username:<span>{admin.username}</span>
            </div>
          </div>
          <div className={styles.columnInfo}>
            <div className={styles.adminInfo}>
              <p>Email:</p>
              <span>{admin.email}</span>
            </div>
            <div className={styles.adminInfo}>
              Phone Number:<span>{admin.phoneNumber}</span>
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
