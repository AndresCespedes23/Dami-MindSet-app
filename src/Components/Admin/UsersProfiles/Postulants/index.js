import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOnePostulant } from 'redux/Postulants/thunks';
import { getPostulantSessions } from 'redux/Sessions/thunks';
import Button from 'Components/Shared/Button';
import style from './postulants.module.css';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom';

function Profile() {
  const postulant = useSelector((store) => store.postulants.postulant);
  const sessions = useSelector((store) => store.sessions.list);
  const dispatch = useDispatch();
  const history = useHistory();
  const { id } = useParams();

  useEffect(() => {
    dispatch(getOnePostulant(id));
    dispatch(getPostulantSessions(id));
  }, [dispatch]);

  const getAge = (date) => {
    let today = new Date().getFullYear();
    let year = date.split('-')[0];
    return today - year;
  };
  const isChecked = (key) => {
    return postulant.profiles.some((element) => element.key === key);
  };

  return (
    <section className={style.container}>
      <div className={style.profile}>
        <div className={style.header}>
          <div>
            <Button type={'backBtnAdmin'} onClick={() => history.push('/admin/postulants')} />
          </div>
          <div className={style.headercolumn}>
            <h2>Postulant Profile</h2>
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
          </div>
          <div>
            <span>{postulant.description}</span>
          </div>
        </div>
        <div className={style.box}>
          <div className={style.subtitle}>
            <h3>PERSONAL INFORMATION</h3>
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
            {sessions?.map((session) => {
              return (
                <div className={style.boxinfo} key={session._id}>
                  <span>
                    Interviewed on {session.date} {session.time}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          <h3>Profiles</h3>
          <table>
            <tbody>
              {postulant.profiles?.map((profile) => {
                return [
                  <tr key={profile._id}>
                    <td>{profile.name}</td>
                    <td>
                      <input
                        checked={isChecked(profile._id)}
                        type="checkbox"
                        value={profile._id}
                        disabled={true}
                      />
                    </td>
                  </tr>
                ];
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Profile;
