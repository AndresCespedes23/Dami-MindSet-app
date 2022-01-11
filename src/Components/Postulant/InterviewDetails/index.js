import Spinner from 'Components/Shared/Spinner';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { getPendingInterview } from 'redux/Interviews/thunks';
import { getOnePostulant } from 'redux/Postulants/thunks';
import style from './interviewDetails.module.css';
// import { useHistory } from 'react-router-dom';

import Button from 'Components/Shared/Button';

function InterviewDetails() {
  const postulant = useSelector((store) => store.postulants.postulant);
  const isLoading = useSelector((store) => store.postulants.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOnePostulant(sessionStorage.getItem('id')));
  }, [dispatch]);

  if (isLoading) return <Spinner type="ThreeDots" color="#002147" height={80} width={80} />;

  return (
    <section className={style.container}>
      <div className={style.profile}>
        <div className={style.header}>
          <Button type={'back'} />
          <h2>Interview Details</h2>
        </div>
        <div className={style.box}>
          <div className={style.info}>
            <h3>Status:</h3>
            <span
              className={
                postulant.status === 'ACTIVE'
                  ? style.statusActive
                  : postulant.status === 'INACTIVE'
                  ? style.statusInactive
                  : style.statusPending
              }
            >
              {postulant.status}
            </span>
          </div>
          <div className={style.info}>
            <h3>Position:</h3>
            <span>{postulant.username}</span>
          </div>
          <div className={style.info}>
            <h3>Company:</h3>
            <span>{postulant.username}</span>
          </div>
          <div className={style.info}>
            <h3>Location:</h3>
            <span>{postulant.username}</span>
          </div>
        </div>
        <div className={style.box}>
          <h3>About:</h3>
          <span>{postulant.username} </span>
        </div>
        <div className={style.box}>
          <div className={style.info}>
            <h3>Date:</h3>
            <span>{postulant.username}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default InterviewDetails;
