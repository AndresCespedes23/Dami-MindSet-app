import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './home.module.css';
import { getPositions } from 'redux/Positions/thunks.js';

function Home() {
  const positions = useSelector((state) => state.positions.list);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPositions());
  }, [dispatch]);

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
          <button className={styles.btnJoinUs}>JOIN NOW!</button>
        </div>
      </div>
      {console.log(positions)}
      <div className={styles.containerCard}>
        <p>CONTAINER CARDS</p>
      </div>
    </section>
  );
}

export default Home;
