import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getPsychologists,
  updatePsychologist,
  deletePsychologist
} from 'redux/Psychologists/thunks';
import styles from './psychologists-states.module.css';
import Button from 'Components/Shared/Button';

function PsychologistsStates() {
  const psychologists = useSelector((state) => state.psychologists.list);
  const dispatch = useDispatch();
  const [idActive, setIdActive] = useState('');

  useEffect(() => {
    dispatch(getPsychologists());
  }, [dispatch]);

  const handleDissabled = (id, psychologist) => {
    setIdActive(id);

    dispatch(updatePsychologist(psychologist, idActive)).then(() => {
      psychologists.map((psychologist) => {
        psychologist.status === 'AVAILABLE'
          ? { ...psychologist, status: 'UNAVAILABLE' }
          : psychologist;
      });
      dispatch(getPsychologists());
    });
  };

  const handleDelete = (id, psychologist) => {
    setIdActive(id);
    dispatch(deletePsychologist(psychologist, idActive)).then(() => {
      dispatch(getPsychologists());
    });
  };

  return (
    <section className={styles.container}>
      <div className={styles.containerPsychologists}>
        <div className={styles.header}>
          <Button type={'backBtnAdmin'} />
          <h2>Psychologists</h2>
        </div>
        <div className={styles.contentPsychologists}>
          <h3 className={styles.title}>
            <span className={styles.bold}>Pending Approval</span>
          </h3>
          <div className={styles.psychologistsInfo}>
            <p className={styles.userName}>Juan Fernandez</p>
            <p>E.N°: 12343</p>
            <button className={styles.redBtn}>REJECT</button>
            <button className={styles.greenBtn}>APPROVE</button>
          </div>
          <div className={styles.contentPsychologists}></div>
          <h3 className={styles.title}>
            <span className={styles.bold}>Active Psychologists</span>
          </h3>
          <table>
            <tbody>
              {psychologists.map((psychologist) => {
                if (psychologist.status === 'AVAILABLE') {
                  return [
                    <tr key={psychologist._id} className={styles.psychologistsInfo}>
                      <td className={styles.userName}>{psychologist.name}</td>
                      <td>E.N°: {psychologist.enrollmentNumber}</td>
                      <td>
                        <button
                          className={styles.redBtn}
                          onClick={() => handleDissabled(psychologist._id)}
                        >
                          DISSABLED
                        </button>
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
                if (psychologist.status === 'UNAVAILABLE') {
                  return [
                    <tr key={psychologist._id} className={styles.psychologistsInfo}>
                      <td className={styles.userName}>{psychologist.name}</td>
                      <td>E.N°: {psychologist.enrollmentNumber}</td>
                      <td>
                        <button
                          className={styles.redBtn}
                          onClick={() => handleDelete(idActive, psychologist._id)}
                        >
                          DELETE
                        </button>
                        <button className={styles.greenBtn}>ENABLE</button>
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
