import Spinner from 'Components/Shared/Spinner';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneInterview } from 'redux/Interviews/thunks';
import { getProfiles } from 'redux/Profiles/thunks';
import styles from './interview.module.css';

function Interview() {
  //id: pending = 61afbb52fc13ae682c0004ba
  //id done = 61afbb52fc13ae682c0004c0
  const { id } = useParams();
  const interview = useSelector((state) => state.interviews.interview);
  const isLoadingForm = useSelector((state) => state.interviews.isLoadingForm);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfiles());
    dispatch(getOneInterview(id));
  }, [dispatch]);

  if (isLoadingForm) return <Spinner type="ThreeDots" color="#002147" height={80} width={80} />;

  if (Object.keys(interview).length !== 0 && !isLoadingForm) {
    return (
      <section className={styles.container}>
        <div className={styles.containerInterviews}>
          <div className={styles.containerNav}>
            <button className={styles.backBtn}>BACK</button>
            <h2 className={styles.title}>Interview details</h2>
          </div>
          <div className={styles.interviewsContent}>
            <div className={styles.itemPersonalLong}>
              <h3 className={styles.titlePersonal}>Date:</h3>
              <span className={styles.infoPersonal}>
                {interview.dateTime.split('T')[0]} -{' '}
                {interview.dateTime.split('T')[1].split('.')[0]}
              </span>
            </div>
            <div className={styles.itemPersonalLong}>
              <h3 className={styles.titlePersonal}>Interviewee:</h3>
              <span className={styles.infoPersonal}>{interview.idCandidate.name}</span>
            </div>
            <div className={styles.itemPersonalLong}>
              <h3 className={styles.titlePersonal}>Status:</h3>
              <span className={styles[interview.status?.toLowerCase()]}>{interview.status}</span>
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
            <button className={styles.backBtn}>BACK</button>
            <h2 className={styles.title}>Interview details</h2>
          </div>
          <h3 className={styles.notFoundMessage}>Interview not found</h3>
        </div>
      </section>
    );
  }
}

export default Interview;
