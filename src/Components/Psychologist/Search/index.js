import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchPostulants } from 'redux/Postulants/thunks';
import styles from './search.module.css';

function Search() {
  const postulants = useSelector((state) => state.postulants.list);
  const isLoading = useSelector((state) => state.postulants.isLoading);
  const dispatch = useDispatch();
  const [inputSearch, setInputSearch] = useState('');

  const handleChange = (e) => {
    setInputSearch(e.target.value);
  };
  const handleEnter = (e) => {
    if (e.code === 'Enter') {
      dispatch(searchPostulants(inputSearch));
    }
  };
  const handleSubmit = () => {
    dispatch(searchPostulants(inputSearch));
  };
  console.log(postulants);
  console.log(isLoading);
  return (
    <section className={styles.container}>
      <div className={styles.containerInterviews}>
        <div className={styles.containerNav}>
          <div className={styles.backContainer}>
            <button className={styles.backBtn}>BACK</button>
          </div>
          <div className={styles.searchContainer}>
            <div className={styles.itemPersonalColumn}>
              <h2 className={styles.searchTitle}>Search Postulant</h2>
              <input
                className={styles.searchInput}
                placeholder="Postulant"
                value={inputSearch}
                onChange={handleChange}
                onKeyPress={handleEnter}
              />
            </div>
            <div>
              <button type="submit" className={styles.searchBtn} onClick={handleSubmit}>
                SEARCH
              </button>
            </div>
          </div>
        </div>
        <div className={styles.interviewsContent}>{postulants.length && <div>Hola</div>}</div>
      </div>
    </section>
  );
}

export default Search;
