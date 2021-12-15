import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getProfiles, addProfile, deleteProfile, updateProfile } from 'redux/Profiles/thunks.js';
import { setShowModal, setShowMessage, setModalType } from 'redux/Profiles/actions';
import styles from './profiles.module.css';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import Message from 'Components/Shared/Message';
import Spinner from 'Components/Shared/Spinner';

function Profiles() {
  const profiles = useSelector((store) => store.profiles.list);
  const isLoading = useSelector((store) => store.profiles.isLoading);
  const messageType = useSelector((store) => store.profiles.messageType);
  const message = useSelector((store) => store.profiles.messageText);
  const showModal = useSelector((store) => store.profiles.showModal);
  const showMessage = useSelector((store) => store.profiles.showMessage);
  const modalType = useSelector((store) => store.profiles.modalType);
  const [idActive, setIdActive] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfiles());
  }, [dispatch]);

  const handleClickDelete = (id) => {
    dispatch(setShowModal(true));
    setIdActive(id);
    dispatch(setModalType('delete'));
  };

  const handleDelete = (id) => {
    dispatch(deleteProfile(id)).then(() => {
      dispatch(setShowMessage(true));
      dispatch(getProfiles());
    });
  };

  const handleClickUpdate = (id) => {
    dispatch(setModalType('profiles'));
    setIdActive(id);
    dispatch(setShowModal(true));
  };

  const handleUpdateProfile = (profile) => {
    dispatch(updateProfile(profile, idActive)).then(() => {
      dispatch(setShowMessage(true));
      dispatch(getProfiles());
    });
  };

  const handleClickAdd = () => {
    dispatch(setModalType('profiles'));
    setIdActive('');
    dispatch(setShowModal(true));
  };

  const handleAddProfile = (profile) => {
    dispatch(addProfile(profile)).then(() => {
      dispatch(setShowMessage(true));
      dispatch(getProfiles());
    });
  };

  const handleShowModal = () => {
    dispatch(setShowModal(false));
  };

  const handleShowMessage = () => {
    dispatch(setShowMessage(false));
  };

  if (isLoading) return <Spinner type="ThreeDots" color="#002147" height={80} width={80} />;

  return (
    <section className={styles.container}>
      <div className={styles.list}>
        <div>
          <h2>Profiles</h2>
          {showMessage && (
            <Message type={messageType} message={message} showMessage={handleShowMessage} />
          )}
          <Button type="addNew" text={'PROFILES'} onClick={handleClickAdd} />
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Type of Profile</th>
              <th>Description</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {profiles.map((profile) => {
              return (
                <tr key={profile._id}>
                  <td>{profile.name}</td>
                  <td>{profile.description}</td>
                  <td>
                    <Button type="delete" onClick={() => handleClickDelete(profile._id)} />
                    <Button type="update" onClick={() => handleClickUpdate(profile._id)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {showModal && (
        <Modal
          handleShowModal={handleShowModal}
          modalType={modalType}
          handleSubmit={
            modalType === 'delete'
              ? () => handleDelete(idActive)
              : modalType === 'profiles' && !idActive
              ? handleAddProfile
              : handleUpdateProfile
          }
          meta={idActive}
        />
      )}
    </section>
  );
}

export default Profiles;
