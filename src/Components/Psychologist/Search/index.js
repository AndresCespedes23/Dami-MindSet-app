// import { useDispatch, useSelector } from 'react-redux';
import styles from './search.module.css';

function Search() {
  //   const interviews = useSelector((state) => state.interviews.list);
  //   const isLoadingForm = useSelector((state) => state.interviews.isLoadingForm);
  //   const dispatch = useDispatch();

  return (
    <section className={styles.container}>
      <div className={styles.containerInterviews}>
        <div className={styles.containerNav}>
          <div className={styles.backContainer}>
            <button className={styles.backBtn}>BACK</button>
          </div>
          <div className={styles.searchContainer}>
            <div className={styles.itemPersonalColumn}>
              <h2 className={styles.searchTitle}>Search user</h2>
              <input className={styles.searchInput} placeholder="User" />
            </div>
            <div>
              <button className={styles.searchBtn}>SEARCH</button>
            </div>
          </div>
        </div>
        <div className={styles.interviewsContent}></div>
      </div>
    </section>
  );
}

export default Search;
