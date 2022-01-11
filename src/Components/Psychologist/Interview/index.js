import Button from 'Components/Shared/Button';
import Spinner from 'Components/Shared/Spinner';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneSession } from 'redux/Sessions/thunks';
import styles from './interview.module.css';

function Interview() {
  const { id } = useParams();
  const session = useSelector((state) => state.sessions.session);
  const isLoadingForm = useSelector((state) => state.sessions.isLoadingForm);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneSession(id));
  }, [dispatch]);

  if (isLoadingForm) return <Spinner type="ThreeDots" color="#002147" height={80} width={80} />;

  if (Object.keys(session).length !== 0 && !isLoadingForm) {
    return (
      <section className={styles.container}>
        <div className={styles.containerInterviews}>
          <div className={styles.containerNav}>
            <Button type={'backBtnPsycho'} />
            <h2 className={styles.title}>Interview details</h2>
          </div>
          <div className={styles.interviewsContent}>
            <div className={styles.itemPersonalLong}>
              <h3 className={styles.titlePersonal}>Date:</h3>
              <span className={styles.infoPersonal}>
                {session.date} - {session.time}hs
              </span>
            </div>
            <div className={styles.itemPersonalLong}>
              <h3 className={styles.titlePersonal}>Interviewee:</h3>
              <span className={styles.infoPersonal}>{session.idCandidate.name}</span>
            </div>
            <div className={styles.itemPersonalLong}>
              <h3 className={styles.titlePersonal}>Status:</h3>
              <span className={styles[session.status?.toLowerCase()]}>{session.status}</span>
            </div>
          </div>
        </div>
      </section>
    );
  } else {
    return (
      <section className={styles.container}>
        <div className={styles.containerInterviews}>
          <div className={styles.containerNav}>
            <Button type={'backBtnPsycho'} />
            <h2 className={styles.title}>Interview details</h2>
          </div>
          <h3 className={styles.notFoundMessage}>Interview not found</h3>
        </div>
      </section>
    );
  }
}

export default Interview;
