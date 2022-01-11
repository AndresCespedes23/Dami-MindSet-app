import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPendingInterview } from 'redux/Interviews/thunks';
import style from './interviewDetails.module.css';
import Button from 'Components/Shared/Button';
import Spinner from 'Components/Shared/Spinner';

function InterviewDetails() {
  const interviews = useSelector((store) => store.interviews.list);
  const isLoading = useSelector((store) => store.postulants.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPendingInterview(sessionStorage.getItem('id')));
  }, [dispatch]);

  if (isLoading) return <Spinner type="ThreeDots" color="#002147" height={80} width={80} />;

  return (
    <section className={style.container}>
      <div className={style.profile}>
        <div className={style.header}>
          <Button type={'back'} />
          <h2>Interview Details</h2>
        </div>
        <div>
          {interviews.map((interview) => {
            return (
              <div key={interview._id}>
                <div className={style.box}>
                  <div className={style.info}>
                    <h3>Status:</h3>
                    <span>{interview.status}</span>
                  </div>
                  <div className={style.info}>
                    <h3>Position:</h3>
                    <span>{interview.idPosition.name}</span>
                  </div>
                  <div className={style.info}>
                    <h3>Company:</h3>
                    <span>{interview.idClient.name}</span>
                  </div>
                  <div className={style.info}>
                    <h3>Location:</h3>
                    <span>{interview.idPosition.address},</span>
                    <span>{interview.idPosition.city},</span>
                    <span>{interview.idPosition.postalCode},</span>
                  </div>
                </div>
                <div className={style.box}>
                  <h3>About:</h3>
                  <span>{interview.idPosition.description}</span>
                </div>
                <div className={style.box}>
                  <div className={style.info}>
                    <h3>Date:</h3>
                    <span>{interview.dateTime.split('T')[0]}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default InterviewDetails;
