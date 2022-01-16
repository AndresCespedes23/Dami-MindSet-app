import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getPsychologists,
  getPsychologistsAdmin,
  updatePsychologist
  // deletePsychologist
} from 'redux/Psychologists/thunks';
import styles from './psychologists-states.module.css';
import Button from 'Components/Shared/Button';
import { useHistory } from 'react-router-dom';

import Modal from 'Components/Shared/Modal';
import Spinner from 'Components/Shared/Spinner';
import Message from 'Components/Shared/Message';

import { setShowModal, setShowMessage, setModalType } from 'redux/Psychologists/actions';
import { registerNewUser } from 'redux/Auth/thunks';

function PsychologistsStates() {
  const psychologists = useSelector((state) => state.psychologists.list);
  const dispatch = useDispatch();
  const history = useHistory();

  const showModal = useSelector((state) => state.psychologists.showModal);
  const modalType = useSelector((state) => state.psychologists.modalType);
  const showMessage = useSelector((state) => state.psychologists.showMessage);
  const messageType = useSelector((state) => state.psychologists.messageType);
  const message = useSelector((state) => state.psychologists.messageText);
  const isLoading = useSelector((store) => store.psychologists.isLoading);

  useEffect(() => {
    dispatch(getPsychologistsAdmin());
  }, [dispatch]);

  const handleClickAdd = () => {
    dispatch(setModalType('psychologists'));
    dispatch(setShowModal(true));
  };

  const handleAddPsychologist = (psychologist) => {
    dispatch(registerNewUser(psychologist, 'PSYCHOLOGIST')).then(() => {
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

  const handleDissabled = (id, psychologist) => {
    dispatch(updatePsychologist(psychologist, id)).then(() => {
      dispatch(getPsychologistsAdmin());
    });
  };

  const handleEnable = (id, psychologist) => {
    dispatch(updatePsychologist(psychologist, id)).then(() => {
      dispatch(getPsychologistsAdmin());
    });
  };
  const handleClickInfo = (id) => {
    history.push(`/admin/psychologist/${id}`);
  };

  if (isLoading) return <Spinner type="ThreeDots" color="#002147" height={80} width={80} />;

  return (
    <section className={styles.container}>
      <div className={styles.containerPsychologists}>
        <div className={styles.header}>
          <Button type={'backBtnAdmin'} onClick={() => history.push('/admin/home')} />
          <h2>Psychologists</h2>
          {showMessage && (
            <Message type={messageType} message={message} showMessage={handleShowMessage} />
          )}
          <Button type="addNew" text={'PSYCHOLOGIST'} onClick={handleClickAdd} />
        </div>
        <div className={styles.contentPsychologists}>
          <h3 className={styles.title}>
            <span className={styles.bold}>Pending Approval</span>
          </h3>
          <table>
            <tbody>
              {psychologists.map((psychologist) => {
                if (psychologist.status === 'UNAVAILABLE' && psychologist.isDeleted === false) {
                  return [
                    <tr key={psychologist._id} className={styles.psychologistsInfo}>
                      <td className={styles.userName}>{psychologist.name}</td>
                      <td>E.N°: {psychologist.enrollmentNumber}</td>
                      <td>
                        <button
                          className={styles.redBtn}
                          onClick={() =>
                            handleEnable(psychologist._id, {
                              ...psychologist,
                              isDeleted: true
                            })
                          }
                        >
                          REJECT
                        </button>
                        <button
                          className={styles.greenBtn}
                          onClick={() =>
                            handleEnable(psychologist._id, {
                              ...psychologist,
                              status: 'AVAILABLE'
                            })
                          }
                        >
                          APPROVE
                        </button>
                        <Button type="info" onClick={() => handleClickInfo(psychologist._id)} />
                      </td>
                    </tr>
                  ];
                }
              })}
            </tbody>
          </table>
          <div className={styles.contentPsychologists}></div>
          <h3 className={styles.title}>
            <span className={styles.bold}>Active Psychologists</span>
          </h3>
          <table>
            <tbody>
              {psychologists.map((psychologist) => {
                if (psychologist.status === 'AVAILABLE' && psychologist.isDeleted === false) {
                  return [
                    <tr key={psychologist._id} className={styles.psychologistsInfo}>
                      <td className={styles.userName}>{psychologist.name}</td>
                      <td>E.N°: {psychologist.enrollmentNumber}</td>
                      <td>
                        <button
                          className={styles.redBtn}
                          onClick={() =>
                            handleDissabled(psychologist._id, {
                              ...psychologist,
                              status: 'UNAVAILABLE'
                            })
                          }
                        >
                          DISSABLED
                        </button>
                        <Button type="info" onClick={() => handleClickInfo(psychologist._id)} />
                      </td>
                    </tr>
                  ];
                }
              })}
            </tbody>
          </table>
        </div>
        <div className={styles.contentPsychologists}>
          <h3 className={styles.title}>
            <span className={styles.bold}>Disabled Psychologists</span>
          </h3>
          <table>
            <tbody>
              {psychologists.map((psychologist) => {
                if (psychologist.isDeleted === true) {
                  return [
                    <tr key={psychologist._id} className={styles.psychologistsInfo}>
                      <td className={styles.userName}>{psychologist.name}</td>
                      <td>E.N°: {psychologist.enrollmentNumber}</td>
                      <td>
                        <button
                          className={styles.greenBtn}
                          onClick={() =>
                            handleEnable(psychologist._id, {
                              ...psychologist,
                              isDeleted: false
                            })
                          }
                        >
                          ENABLE
                        </button>
                        <Button type="info" onClick={() => handleClickInfo(psychologist._id)} />
                      </td>
                    </tr>
                  ];
                }
              })}
            </tbody>
          </table>
        </div>
      </div>
      {showModal && (
        <Modal
          handleShowModal={handleShowModal}
          modalType={modalType}
          handleSubmit={handleAddPsychologist}
        />
      )}
    </section>
  );
}

export default PsychologistsStates;
