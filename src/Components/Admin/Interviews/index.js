import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getInterviews,
  addInterview,
  deleteInterview,
  updateInterview
} from 'redux/Interviews/thunks';
import { setShowModal, setShowMessage, setModalType } from 'redux/Interviews/actions';
import styles from './interviews.module.css';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import Message from 'Components/Shared/Message';
import Spinner from 'Components/Shared/Spinner';
import { useHistory } from 'react-router-dom';

function Interviews() {
  const [idActive, setIdActive] = useState('');
  const interviews = useSelector((state) => state.interviews.list);
  const isLoading = useSelector((state) => state.interviews.isLoading);
  const showMessage = useSelector((state) => state.interviews.showMessage);
  const message = useSelector((state) => state.interviews.messageText);
  const messageType = useSelector((state) => state.interviews.messageType);
  const showModal = useSelector((state) => state.interviews.showModal);
  const modalType = useSelector((state) => state.interviews.modalType);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getInterviews());
  }, [dispatch]);

  const handleDeleteClick = (id) => {
    dispatch(setShowModal(true));
    setIdActive(id);
    dispatch(setModalType('delete'));
  };

  const handleDeleteInterview = (id) => {
    dispatch(deleteInterview(id)).then(() => {
      dispatch(setShowMessage(true));
      dispatch(getInterviews());
    });
  };

  const handleUpdateClick = (id) => {
    dispatch(setModalType('interviews'));
    setIdActive(id);
    dispatch(setShowModal(true));
  };

  const handleUpdateInterview = (interviews) => {
    dispatch(updateInterview(interviews, idActive)).then(() => {
      dispatch(setShowMessage(true));
      dispatch(getInterviews());
    });
  };

  const handleClickAdd = () => {
    dispatch(setModalType('interviews'));
    setIdActive('');
    dispatch(setShowModal(true));
  };

  const handleAddInterview = (interview) => {
    dispatch(addInterview(interview)).then(() => {
      dispatch(setShowMessage(true));
      dispatch(getInterviews());
    });
  };

  const handleShowModal = () => {
    dispatch(setShowModal(false));
  };

  const handleShowMessage = () => {
    dispatch(setShowMessage(false));
  };
  const handleClickInfo = (id) => {
    history.push(`/admin/interview/${id}`);
  };

  if (isLoading) return <Spinner type="ThreeDots" color="#002147" height={80} width={80} />;

  return (
    <section className={styles.container}>
      <div className={styles.containerClients}>
        <div className={styles.header}>
          <div className={styles.headerContent}>
            <Button type={'backBtnAdmin'} onClick={() => history.push('/admin/home')} />
            <h2>Interviews</h2>
            {showMessage && (
              <Message type={messageType} message={message} showMessage={handleShowMessage} />
            )}
          </div>
          <div className={styles.headerContent}>
            <Button type="addNew" text={'INTERVIEW'} onClick={handleClickAdd} />
          </div>
        </div>
        <div className={styles.contentClients}>
          <table>
            <thead>
              <tr className={styles.clientsInfo}>
                <th>Candidate</th>
                <th>Client</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {interviews.map((interview) => {
                return [
                  <tr key={interview._id} className={styles.clientsInfo}>
                    <td className={styles.userName}>{interview.idCandidate.name}</td>
                    <td className={styles.userName}>{interview.idClient.name}</td>
                    <td className={styles.userName}>{interview.dateTime.split('T')[0]}</td>
                    <td>
                      <Button type="delete" onClick={() => handleDeleteClick(interview._id)} />
                      <Button type="update" onClick={() => handleUpdateClick(interview._id)} />
                      <Button type="info" onClick={() => handleClickInfo(interview._id)} />
                    </td>
                  </tr>
                ];
              })}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <Modal
          handleShowModal={handleShowModal}
          modalType={modalType}
          handleSubmit={
            modalType === 'delete'
              ? () => handleDeleteInterview(idActive)
              : modalType === 'interviews' && !idActive
              ? handleAddInterview
              : handleUpdateInterview
          }
          meta={idActive}
        />
      )}
    </section>
  );
}

export default Interviews;
