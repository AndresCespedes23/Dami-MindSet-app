import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOneSession } from 'redux/Sessions/thunks';
import { getProfiles } from 'redux/Profiles/thunks';
import styles from './session.module.css';
import Spinner from 'Components/Shared/Spinner';
import Button from 'Components/Shared/Button';
import { useHistory } from 'react-router-dom';

function Session() {
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

  const isChecked = (key) => {
    return check?.some((element) => element === key);
  };
  const handleChange = (e) => {
    if (e.target.checked) {
      setCheck([...check, e.target.value]);
    } else {
      setCheck((prevState) => prevState.filter((item) => item !== e.target.value));
    }
  };
  if (isLoading) return <Spinner type="ThreeDots" color="#002147" height={80} width={80} />;
  return (
    <section className={styles.container}>
      <div className={styles.containerProfile}>
        <div className={styles.header}>
          <Button type={'back'} onClick={() => history.push(`/postulants/home`)} />
          <h2>Session Details</h2>
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
              <span>{session.idPsychologist?.name}</span>
            </div>
            <div>
              <h3>Email:</h3>
              <span>{session.idPsychologist?.email}</span>
            </div>
            <div>
              <h3>Phone Number:</h3>
              <span>{session.idPsychologist?.phoneNumber}</span>
            </div>
          </div>
        </div>
        <div>
          <h4>Interview:</h4>
          <span>
            Interviewed on {session.date} {session.time}
          </span>
        </div>
        <div>
          <h4>Result</h4>
          <table>
            <tbody>
              {profiles.map((profile) => {
                return [
                  <tr key={profile._id}>
                    <td className={styles.td}>{profile.name}</td>
                    <td className={styles.td}>
                      <input
                        checked={isChecked(profile._id)}
                        onChange={handleChange}
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

export default Session;
