import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getApplications,
  addApplication,
  deleteApplication,
  updateApplication
} from '../../redux/Applications/thunks.js';
import { setShowModal, setShowMessage, setModalType } from '../../redux/Applications/actions';
import styles from './applications.module.css';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';
import Message from '../Shared/Message';
import Spinner from '../Shared/Spinner';

function Applications() {
  // const [applications, setApplications] = useState([]);
  const applications = useSelector((store) => store.applications.list);
  const isLoading = useSelector((store) => store.applications.isLoading);
  const messageType = useSelector((store) => store.applications.messageType);
  const message = useSelector((store) => store.applications.messageText);
  const showModal = useSelector((store) => store.applications.showModal);
  const showMessage = useSelector((store) => store.applications.showMessage);
  const modalType = useSelector((store) => store.applications.modalType);
  const [idActive, setIdActive] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getApplications());
  }, [dispatch]);

  const handleClickDelete = (id) => {
    dispatch(setShowModal(true));
    setIdActive(id);
    dispatch(setModalType('delete'));
    console.log(id);
  };

  const handleDeleteApplication = (id) => {
    dispatch(deleteApplication(id)).then(() => {
      dispatch(setShowMessage(true));
      dispatch(getApplications());
    });
  };

  const handleClickUpdate = (id) => {
    dispatch(setModalType('applications'));
    setIdActive(id);
    dispatch(setShowModal(true));
    console.log(id);
  };

  const handleUpdateApplication = (application) => {
    dispatch(updateApplication(application, idActive)).then(() => {
      dispatch(setShowMessage(true));
      dispatch(getApplications());
    });
  };

  const handleClickAdd = () => {
    dispatch(setModalType('applications'));
    setIdActive('');
    dispatch(setShowModal(true));
  };

  const handleAddApplication = (application) => {
    dispatch(addApplication(application)).then(() => {
      dispatch(setShowMessage(true));
      dispatch(getApplications());
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
          <h2>Applications</h2>
          {showMessage && (
            <Message type={messageType} message={message} showMessage={handleShowMessage} />
          )}
          <Button type="addNew" text={'APPLICATION'} onClick={handleClickAdd} />
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Position</th>
              <th>Candidate</th>
              <th>Interview Date</th>
              <th>Result</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => {
              return (
                <tr key={application._id}>
                  <td>{application.idPosition ? application.idPosition.name : 'ID deleted'}</td>
                  <td>{application.idCandidate ? application.idCandidate.name : 'ID deleted'}</td>
                  <td>
                    {!application.idInterview
                      ? 'ID deleted'
                      : application.idInterview.dateTime
                      ? application.idInterview.dateTime.split('T')[0]
                      : '...loading...'}
                  </td>
                  <td>{application.result}</td>
                  <td>{application.dateTime ? application.dateTime.split('T')[0] : ''}</td>
                  <td>{application.status}</td>
                  <td>
                    <Button type="update" onClick={() => handleClickUpdate(application._id)} />
                    <Button type="delete" onClick={() => handleClickDelete(application._id)} />
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
              ? () => handleDeleteApplication(idActive)
              : modalType === 'applications' && !idActive
              ? handleAddApplication
              : handleUpdateApplication
          }
          meta={idActive}
        />
      )}
    </section>
  );
}

export default Applications;
