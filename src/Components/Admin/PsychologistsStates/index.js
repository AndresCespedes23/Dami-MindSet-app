import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getPsychologistsAdmin,
  updatePsychologist
  // deletePsychologist
} from 'redux/Psychologists/thunks';
import { setShowModal, setShowMessage, setModalType } from 'redux/Psychologists/actions';
import styles from './psychologists-states.module.css';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import { useHistory } from 'react-router-dom';
import Spinner from 'Components/Shared/Spinner';
import { registerNewUser } from 'redux/Auth/thunks';

function PsychologistsStates() {
  const psychologists = useSelector((store) => store.psychologists.list);
  const dispatch = useDispatch();
  const history = useHistory();
  const isLoading = useSelector((store) => store.psychologists.isLoading);
  const showModal = useSelector((store) => store.psychologists.showModal);
  const modalType = useSelector((store) => store.psychologists.modalType);
  const [idActive, setIdActive] = useState('');

  useEffect(() => {
    dispatch(getPsychologistsAdmin());
  }, [dispatch]);

  const handleClickAdd = () => {
    dispatch(setModalType('psychologists'));
    setIdActive('');
    dispatch(setShowModal(true));
  };

  const handleAddPsychologist = (psychologist) => {
    dispatch(registerNewUser(psychologist, 'PSYCHOLOGIST')).then(() => {
      dispatch(setShowMessage(true));
      dispatch(getPsychologistsAdmin());
    });
  };

  const handleShowModal = () => {
    dispatch(setShowModal(false));
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

  // const handleDelete = (id, psychologist) => {
  //   dispatch(deletePsychologist(psychologist, id)).then(() => {
  //     dispatch(getPsychologistsAdmin());
  //   });
  // };

  if (isLoading) return <Spinner type="ThreeDots" color="#002147" height={80} width={80} />;

  return (
    <section className={styles.container}>
      <div className={styles.containerPsychologists}>
        <div className={styles.header}>
          <div className={styles.headerTitle}>
            <Button type={'backBtnAdmin'} onClick={() => history.push('/admin/home')} />
            <h2>Psychologists</h2>
          </div>
          <div>
            <Button type="addNew" text={'PSYCHOLOGIST'} onClick={handleClickAdd} />
          </div>
        </div>
        <div className={styles.contentPsychologists}>
          <h3 className={styles.title}>Pending Approval</h3>
          <table>
            <tbody className={styles.table}>
              {psychologists.map((psychologist) => {
                if (psychologist.status === 'UNAVAILABLE' && psychologist.isDeleted === false) {
                  return [
                    <tr key={psychologist._id} className={styles.psychologistsInfo}>
                      <td className={styles.userName}>{psychologist.name}</td>
                      <td className={styles.enroll}>E.N°: {psychologist.enrollmentNumber}</td>
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
          <h3 className={styles.title}>Active Psychologists</h3>
          <table>
            <tbody className={styles.table}>
              {psychologists.map((psychologist) => {
                if (psychologist.status === 'AVAILABLE' && psychologist.isDeleted === false) {
                  return [
                    <tr key={psychologist._id} className={styles.psychologistsInfo}>
                      <td className={styles.userName}>{psychologist.name}</td>
                      <td className={styles.enroll}>E.N°: {psychologist.enrollmentNumber}</td>
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
          <h3 className={styles.title}>Disabled Psychologists</h3>
          <table>
            <tbody className={styles.table}>
              {psychologists.map((psychologist) => {
                if (psychologist.isDeleted === true) {
                  return [
                    <tr key={psychologist._id} className={styles.psychologistsInfo}>
                      <td className={styles.userName}>{psychologist.name}</td>
                      <td className={styles.enroll}>E.N°: {psychologist.enrollmentNumber}</td>
                      <td>
                        {/* <button
                          className={styles.redBtn}
                          onClick={() => handleDelete(psychologist._id)}
                        >
                          DELETE
                        </button> */}
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
          handleSubmit={
            modalType === 'psychologists' && !idActive ? handleAddPsychologist : 'is already in use'
          }
          meta={idActive}
        />
      )}
    </section>
  );
}

export default PsychologistsStates;
