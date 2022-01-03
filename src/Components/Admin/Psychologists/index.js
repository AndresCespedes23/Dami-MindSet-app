import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getPsychologists,
  deletePsychologist,
  updatePsychologist,
  addPsychologist
} from 'redux/Psychologists/thunks';
import { setShowModal, setShowMessage, setModalType } from 'redux/Psychologists/actions';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import Message from 'Components/Shared/Message';
import styles from './psychologists.module.css';
import Spinner from 'Components/Shared/Spinner';

function Psychologists() {
  const psychologists = useSelector((store) => store.psychologists.list);
  const showModal = useSelector((state) => state.psychologists.showModal);
  const modalType = useSelector((state) => state.psychologists.modalType);
  const showMessage = useSelector((state) => state.psychologists.showMessage);
  const messageType = useSelector((state) => state.psychologists.messageType);
  const message = useSelector((state) => state.psychologists.messageText);
  const isLoading = useSelector((store) => store.psychologists.isLoading);
  const dispatch = useDispatch();
  const [idActive, setIdActive] = useState('');

  useEffect(() => {
    dispatch(getPsychologists());
  }, [dispatch]);

  const handleClickDelete = (id) => {
    dispatch(setShowModal(true));
    setIdActive(id);
    dispatch(setModalType('delete'));
  };

  const handleDelete = (id) => {
    dispatch(deletePsychologist(id)).then(() => {
      dispatch(setShowMessage(true));
      dispatch(getPsychologists());
    });
  };

  const handleClickUpdate = (id) => {
    dispatch(setModalType('psychologists'));
    setIdActive(id);
    dispatch(setShowModal(true));
  };

  const handleUpdatePsychologist = (psychologist) => {
    dispatch(updatePsychologist(psychologist, idActive)).then(() => {
      dispatch(setShowMessage(true));
      dispatch(getPsychologists());
    });
  };

  const handleClickAdd = () => {
    dispatch(setModalType('psychologists'));
    setIdActive('');
    dispatch(setShowModal(true));
  };

  const handleAddPsychologist = (psychologist) => {
    dispatch(addPsychologist(psychologist, 'PSYCHOLOGIST')).then(() => {
      dispatch(setShowMessage(true));
      dispatch(getPsychologists());
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
          <h2>Psychologists</h2>
          {showMessage && (
            <Message type={messageType} message={message} showMessage={handleShowMessage} />
          )}
          <Button type="addNew" text={'PSYCHOLOGIST'} onClick={handleClickAdd} />
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Username</th>
              <th>Phone number</th>
              <th>Enrollment Number</th>
              <th>Time range</th>
              <th>Day range</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {psychologists.map((psychologist) => {
              return [
                <tr key={psychologist._id}>
                  <td>{psychologist.name}</td>
                  <td>{psychologist.email}</td>
                  <td>{psychologist.username}</td>
                  <td>{psychologist.phoneNumber}</td>
                  <td>{psychologist.enrollmentNumber}</td>
                  <td>{psychologist.timeStart + ' to ' + psychologist.timeEnd}</td>
                  <td>{psychologist.dayStart + ' to ' + psychologist.dayEnd}</td>
                  <td>{psychologist.status}</td>
                  <td>
                    <Button type="delete" onClick={() => handleClickDelete(psychologist._id)} />
                    <Button type="update" onClick={() => handleClickUpdate(psychologist._id)} />
                  </td>
                </tr>
              ];
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
              : modalType === 'psychologists' && !idActive
              ? handleAddPsychologist
              : handleUpdatePsychologist
          }
          meta={idActive}
        />
      )}
    </section>
  );
}

export default Psychologists;
