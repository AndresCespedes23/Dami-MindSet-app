import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './home.module.css';
import { getPositions } from 'redux/Positions/thunks.js';
import { Link } from 'react-router-dom';
import Spinner from 'Components/Shared/Spinner';

function Home() {
  const isLoading = useSelector((state) => state.positions.isLoading);
  const positions = useSelector((state) => state.positions.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPositions());
  }, [dispatch]);

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
          <Link to="/postulants/sign" className={styles.button}>
            <button className={styles.btnJoinUs}>JOIN NOW!</button>
          </Link>
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
                <Link to="/postulants/sign">
                  <button type="button" className={styles.btnApply}>
                    APPLY!
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default Home;
