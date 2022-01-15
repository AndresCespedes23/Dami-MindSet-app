import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOneAdmin, updateAdmins } from 'redux/Admins/thunks';
import styles from './admin.module.css';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import { setModalType, setShowModal } from 'redux/Positions/actions';

function AdminProfile() {
  const admin = useSelector((store) => store.admins.admin);
  const showModal = useSelector((state) => state.admins.showModal);
  const modalType = useSelector((state) => state.admins.modalType);
  const [idActive, setIdActive] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneAdmin(sessionStorage.getItem('id')));
  }, [dispatch]);

  const handleClickUpdate = () => {
    dispatch(setModalType('admins'));
    setIdActive(sessionStorage.getItem('id'));
    dispatch(setShowModal(true));
  };
  const handleUpdateAdmin = (admin) => {
    dispatch(updateAdmins(admin, idActive)).then(() => {
      dispatch(getOneAdmin(sessionStorage.getItem('id')));
    });
  };
  const handleShowModal = () => {
    dispatch(setShowModal(false));
  };

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
            <Button type={'editInfo'} onClick={handleClickUpdate} />
          </div>
        </div>
      </div>
      {showModal && (
        <Modal
          handleShowModal={handleShowModal}
          modalType={modalType}
          handleSubmit={handleUpdateAdmin}
          meta={idActive}
        />
      )}
    </section>
  );
}

export default AdminProfile;
