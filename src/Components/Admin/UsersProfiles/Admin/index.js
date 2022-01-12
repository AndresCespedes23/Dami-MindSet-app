import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOneAdmin } from 'redux/Admins/thunks';
import styles from './admin.module.css';
import Button from 'Components/Shared/Button';

function AdminProfile() {
  const admin = useSelector((store) => store.admins.admin);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getOneAdmin(sessionStorage.getItem('id')));
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
          <div className={styles.columnInfo}>
            <div className={styles.adminInfo}>
              Name:<span>{admin.name}</span>
            </div>
            <div className={styles.adminInfo}>
              Username:<span>{admin.username}</span>
            </div>
            <div className={styles.adminInfo}>
              Email:
              <span>{admin.email}</span>
            </div>
          </div>
          <div className={styles.editBtn}>
            <Button type={'editInfo'} />
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdminProfile;
