import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneSession, updateSessions } from 'redux/Sessions/thunks';
import { getProfiles } from 'redux/Profiles/thunks';
import styles from './change-interviewed.module.css';
import Spinner from 'Components/Shared/Spinner';
import Button from 'Components/Shared/Button';
import { useHistory } from 'react-router-dom';

function ChangeInterviewed() {
  const session = useSelector((store) => store.sessions.session);
  const profiles = useSelector((store) => store.profiles.list);
  const isLoading = useSelector((store) => store.sessions.isLoading);
  const [check, setCheck] = useState([]);
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getOneSession(id)).then((res) => {
      setCheck([...res.result]);
    });
    dispatch(getProfiles());
  }, [dispatch]);

  const handleChange = (e) => {
    if (e.target.checked) {
      setCheck([...check, e.target.value]);
    } else {
      setCheck((prevState) => prevState.filter((item) => item !== e.target.value));
    }
  };

  const isChecked = (key) => {
    return check?.some((element) => element === key);
  };

  const onSubmit = () => {
    session.result = check;
    session.status = 'DONE';
    dispatch(updateSessions(session, id));
  };

  const getAge = (date) => {
    let today = new Date().getFullYear();
    let year = date.split('-')[0];
    return today - year;
  };
  if (isLoading) return <Spinner type="ThreeDots" color="#002147" height={80} width={80} />;
  return (
    <section className={styles.container}>
      <div className={styles.containerProfile}>
        <div className={styles.header}>
          <div>
            <Button type={'backBtnPsycho'} onClick={() => history.goBack()} />
          </div>
          <div className={styles.titleContainer}>
            <h2 className={styles.title}>Profile</h2>
          </div>
        </div>
        <div className={styles.profile}>
          <div className={styles.box1}>
            <div>
              <img
                className={styles.postulantPhoto}
                src={`${process.env.PUBLIC_URL}/assets/images/nophotouser.png`}
              ></img>
            </div>
            <h3>Status</h3>
            <p className={styles[session.status?.toLowerCase()]}>{session.status}</p>
          </div>
          <div className={styles.box2}>
            <div>
              <h3>Name:</h3>
              <span>{session.idCandidate?.name}</span>
            </div>
            <div>
              <h3>Email:</h3>
              <span>{session.idCandidate?.email}</span>
            </div>
            <div>
              <h3>Date of Birth:</h3>
              <span>{session.idCandidate?.dateOfBirth}</span>
            </div>
            <div>
              <h3>Phone Number:</h3>
              <span>{session.idCandidate?.phoneNumber}</span>
            </div>
            <div>
              <h3>Address:</h3>
              <span>{session.idCandidate?.address}</span>
            </div>
            <div>
              <h3>City:</h3>
              <span>{session.idCandidate?.city}</span>
            </div>
          </div>
          <div className={styles.box3}>
            <div>
              <h3>City:</h3>
              <span>{session.idCandidate?.city}</span>
            </div>
            <div>
              <h3>Age:</h3>
              <span>
                {session.idCandidate?.dateOfBirth ? getAge(session.idCandidate?.dateOfBirth) : ''}
              </span>
            </div>
            <div>
              <h3>Postal Code:</h3>
              <span>{session.idCandidate?.zipCode}</span>
            </div>
          </div>
        </div>
        <div>
          <h4>About:</h4>
          <span>{session.idCandidate?.description}</span>
        </div>
        <div>
          <h4>Interview:</h4>
          <span>
            Interviewed on {session.date} {session.time}
          </span>
        </div>
        <div>
          <h4>Profiles</h4>
          <table>
            <tbody>
              {profiles.map((profile) => {
                return [
                  <tr key={profile._id}>
                    <td>{profile.name}</td>
                    <td>
                      <input
                        onChange={handleChange}
                        checked={isChecked(profile._id)}
                        type="checkbox"
                        value={profile._id}
                      />
                    </td>
                  </tr>
                ];
              })}
            </tbody>
          </table>
        </div>
        <button className={styles.btnSave} onClick={onSubmit}>
          SAVE
        </button>
      </div>
    </section>
  );
}

export default ChangeInterviewed;
