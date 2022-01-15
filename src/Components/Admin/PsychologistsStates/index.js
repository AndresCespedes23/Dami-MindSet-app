import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getPsychologistsAdmin,
  updatePsychologist
  // deletePsychologist
} from 'redux/Psychologists/thunks';
import styles from './psychologists-states.module.css';
import Button from 'Components/Shared/Button';
import { useHistory } from 'react-router-dom';

function PsychologistsStates() {
  const psychologists = useSelector((state) => state.psychologists.list);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getPsychologistsAdmin());
  }, [dispatch]);

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
  return (
    <section className={styles.container}>
      <div className={styles.containerPsychologists}>
        <div className={styles.header}>
          <Button type={'backBtnAdmin'} onClick={() => history.push('/admin/home')} />
          <h2>Psychologists</h2>
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
    </section>
  );
}

export default PsychologistsStates;
