import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getApplications,
  addApplication,
  deleteApplication
} from '../../redux/Applications/thunks.js';
import styles from './applications.module.css';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';
import Message from '../Shared/Message';
import Spinner from '../Shared/Spinner';

function Applications() {
  // const [applications, setApplications] = useState([]);
  const applications = useSelector((store) => store.applications.list);
  const isLoading = useSelector((store) => store.applications.isLoading);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [idActive, setIdActive] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState('');
  const [message, setMessage] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getApplications());
  }, [dispatch]);

  const cleanMessage = () => {
    setShowMessage(false);
    setMessage('');
  };

  const handleClickDelete = (id) => {
    cleanMessage();
    setShowModal(true);
    setIdActive(id);
    setModalType('delete');
  };

  const handleDeleteApplication = (application) => {
    dispatch(deleteApplication(application));
  };

  const handleClickUpdate = (id) => {
    cleanMessage();
    setShowModal(true);
    setIdActive(id);
    setModalType('applications');
  };

  const handleUpdateApplication = (application) => {
    fetch(`${process.env.REACT_APP_API}/applications/${idActive}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(application)
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then(() => {
        setShowMessage(true);
        setMessageType('success');
        setMessage('Application updated');
        getApplications();
      })
      .catch((err) => {
        console.log(err);
        setShowMessage(true);
        setMessageType('error');
        setMessage('Error updating application');
      });
  };

  const handleClickAdd = () => {
    cleanMessage();
    setShowModal(true);
    setIdActive('');
    setModalType('applications');
  };

  const handleAddApplication = async (application) => {
    await dispatch(addApplication(application));
    await dispatch(getApplications());
  };

  const handleShowModal = () => {
    setShowModal(false);
  };

  const handleShowMessage = () => {
    setShowMessage(false);
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
