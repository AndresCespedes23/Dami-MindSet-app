import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './home.module.css';
import { getPositions } from 'redux/Positions/thunks.js';
import { useHistory } from 'react-router-dom';
import Spinner from 'Components/Shared/Spinner';

function Home() {
  const isLoading = useSelector((state) => state.positions.isLoading);
  const positions = useSelector((state) => state.positions.list);
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    dispatch(getPositions());
  }, [dispatch]);

  const handleApplyClick = (id) => {
    //if isLogged go to position modal form by ID
    //if not isLogged go to login
    console.log(id);
    history.push('/postulants/sign');
  };
  console.log(isLoading);
  if (isLoading) return <Spinner type="ThreeDots" color="#002147" height={80} width={80} />;
  return (
    <section className={styles.container}>
      <div className={styles.flexRow}>
        <div className={styles.containerDesc}>
          <h2 className={styles.title}>What is MindSet?</h2>
          <p className={styles.description}>
            As business grows increasingly global and complex, HR professionals must play an active
            role in setting company strategies and ensuring their effective execution. Creating and
            managing a seamless stream of talent is critical to developing a diverse, global
            workforce.
          </p>
        </div>
        <div className={styles.containerButton}>
          <button
            className={styles.btnJoinUs}
            onClick={() => {
              history.push('/postulants/sign');
            }}
          >
            JOIN NOW!
          </button>
        </div>
      </div>
      <div className={styles.containerCard}>
        {positions.map((position) => {
          return (
            <div className={styles.card} key={position._id}>
              <div className={styles.cardHeader}>
                <h2 className={styles.cardTitle}>{position.name}</h2>
                <span className={styles.cardSubtitle}>{position.idProfile[0].name}</span>
              </div>
              <div>
                <div className={styles.containerLocation}>
                  <span className={styles.bodySubtitle}>Location: </span>
                  <span className={styles.cardLocation}>{position.city}</span>
                </div>
                <div className={styles.containerDescription}>
                  <span className={styles.bodySubtitle}>Description: </span>
                  <span className={styles.cardDescription}>{position.description}</span>
                </div>
              </div>
              <div className={styles.cardFooter}>
                <button
                  type="button"
                  className={styles.btnApply}
                  onClick={() => handleApplyClick(position._id)}
                >
                  APPLY!
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Home;
