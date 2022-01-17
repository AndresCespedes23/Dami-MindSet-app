import Button from 'Components/Shared/Button';
import Spinner from 'Components/Shared/Spinner';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import { getProfiles } from 'redux/Profiles/thunks';
import { getOneSession } from 'redux/Sessions/thunks';
import styles from './session.module.css';

function Session() {
  const { id } = useParams();
  const session = useSelector((state) => state.sessions.session);
  const profiles = useSelector((state) => state.profiles.list);
  const isLoadingForm = useSelector((state) => state.sessions.isLoadingForm);
  const dispatch = useDispatch();
  const history = useHistory();
  const [check, setCheck] = useState([]);

  useEffect(() => {
    dispatch(getOneSession(id)).then((res) => {
      setCheck([...res.idCandidate.profiles]);
    });
    dispatch(getProfiles());
  }, [dispatch]);

  const isChecked = (key) => {
    return check?.some((element) => element === key);
  };
  if (isLoadingForm) return <Spinner type="ThreeDots" color="#002147" height={80} width={80} />;
  if (Object.keys(session).length !== 0 && !isLoadingForm) {
    return (
      <section className={styles.container}>
        <div className={styles.containerInterviews}>
          <div className={styles.containerNav}>
            <Button type={'backBtnAdmin'} onClick={() => history.goBack()} />
            <h2 className={styles.title}>Session details</h2>
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
              <h3 className={styles.titlePersonal}>Interviewer:</h3>
              <span className={styles.infoPersonal}>{session.idPsychologist.name}</span>
            </div>
            <div className={styles.itemPersonalLong}>
              <h3 className={styles.titlePersonal}>Status:</h3>
              <span className={styles[session.status?.toLowerCase()]}>{session.status}</span>
            </div>
            <div className={styles.itemPersonalLong}>
              <div className={styles.flexColumn}>
                <h3 className={styles.titlePersonal}>Result:</h3>
                <table>
                  <tbody>
                    {profiles.map((profile) => {
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

export default Session;
