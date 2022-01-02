import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOnePostulant } from 'redux/Postulants/thunks';
import { getOneSession } from 'redux/Sessions/thunks';
import Button from 'Components/Shared/Button';
import style from './postulants.module.css';
import Spinner from 'Components/Shared/Spinner';

function Profile() {
  const postulant = useSelector((store) => store.postulants.postulant);
  const session = useSelector((store) => store.sessions.session);
  const isLoading = useSelector((store) => store.postulants.isLoading);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOnePostulant('61afbc5bfc13ae06eb0005dc'));
    dispatch(getOneSession('61c27fcfc10d309ebaeb9efc')); //it isn't the correct session, this is an example
  }, [dispatch]);

  const getAge = (date) => {
    let today = new Date().getFullYear();
    let year = date.split('-')[0];
    return today - year;
  };

  if (isLoading) return <Spinner type="ThreeDots" color="#002147" height={80} width={80} />;

  return (
    <section className={style.container}>
      <div className={style.profile}>
        <div className={style.header}>
          <div>
            <Button type={'backBtnAdmin'} />
          </div>
          <div className={style.headercolumn}>
            <h2>Profile</h2>
            <img
              className={style.loginphoto}
              src={`${process.env.PUBLIC_URL}/assets/images/nophotouser.png`}
            />
            <h4>{postulant.name}</h4>
            <span>Status</span>
            <p
              className={
                postulant.status === 'ACTIVE'
                  ? style.statusActive
                  : postulant.status === 'INACTIVE'
                  ? style.statusInactive
                  : style.statusPending
              }
            >
              {postulant.status}
            </p>
          </div>
          <div></div>
        </div>
        <div className={style.box}>
          <div className={style.subtitle}>
            <h4>About me</h4>
            <Button type={'editInfo'} />
          </div>
          <div>
            <span>{postulant.description}</span>
          </div>
        </div>
        <div className={style.box}>
          <div className={style.subtitle}>
            <h3>PERSONAL INFORMATION</h3>
            <Button type={'editInfo'} />
          </div>
          <div className={style.boxinfo}>
            <div>
              <h4>Name:</h4>
              <span>{postulant.name}</span>
            </div>
            <div>
              <h4>Username:</h4>
              <span>{postulant.username}</span>
            </div>
            <div>
              <h4>Email</h4>
              <span>{postulant.email}</span>
            </div>
            <div>
              <h4>Date of birth:</h4>
              <span>{postulant.dateOfBirth ? postulant.dateOfBirth.split('T')[0] : ''}</span>
            </div>
            <div>
              <h4>Age:</h4>
              <span>{postulant.dateOfBirth ? getAge(postulant.dateOfBirth) : ''}</span>
            </div>
            <div>
              <h4>Phone number:</h4>
              <span>{postulant.phoneNumber}</span>
            </div>
            <div>
              <h4>Address:</h4>
              <span>{postulant.address}</span>
            </div>
            <div>
              <h4>City:</h4>
              <span>{postulant.city}</span>
            </div>
            <div>
              <h4>Postal Code:</h4>
              <span>{postulant.zipCode}</span>
            </div>
          </div>
        </div>
        <h3>Interview</h3>
        <div className={style.box}>
          <div className={style.box}>
            <div className={style.subtitle}>
              <Button type={'editInfo'} />
            </div>
            <div className={style.boxinfo}>
              <div>
                <span>
                  Interviewed on {session.date} {session.time}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
