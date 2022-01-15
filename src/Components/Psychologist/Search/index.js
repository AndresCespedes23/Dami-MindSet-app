import Spinner from 'Components/Shared/Spinner';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchPostulants } from 'redux/Postulants/thunks';
import styles from './search.module.css';
import Button from 'Components/Shared/Button';
import { useHistory } from 'react-router-dom';

function Search() {
  const postulants = useSelector((state) => state.postulants.list);
  const isLoading = useSelector((state) => state.postulants.isLoading);
  const dispatch = useDispatch();
  const [inputSearch, setInputSearch] = useState('');
  const [isSearch, setIsSearch] = useState(false);
  const history = useHistory();

  const handleChange = (e) => {
    setInputSearch(e.target.value);
  };
  const handleEnter = (e) => {
    if (e.code === 'Enter') {
      dispatch(searchPostulants(inputSearch));
      setIsSearch(true);
    }
  };
  const handleSubmit = () => {
    dispatch(searchPostulants(inputSearch));
    setIsSearch(true);
  };

  const handleClickInfo = (id) => {
    history.push(`/Psychologist/Postulant/${id}`);
  };
  // if (isLoading) return <Spinner type="ThreeDots" color="#002147" height={80} width={80} />;

  return (
    <section className={styles.container}>
      <div className={styles.containerInterviews}>
        <div className={styles.containerNav}>
          <div className={styles.backContainer}>
            <Button type={'backBtnPsycho'} onClick={() => history.back()} />
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
        <div className={styles.postulantContent}>
          {!isSearch ? (
            <></>
          ) : isLoading ? (
            <Spinner type="ThreeDots" color="#002147" height={80} width={80} />
          ) : postulants.length ? (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Phone Number</th>
                  <th>Country</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {postulants.map((postulant) => {
                  return (
                    <tr key={postulant._id}>
                      <td>{postulant.name}</td>
                      <td>{postulant.email}</td>
                      <td>{postulant.phoneNumber}</td>
                      <td>{postulant.country}</td>
                      <td>{postulant.status}</td>
                      <td>
                        <Button type="info" onClick={() => handleClickInfo(postulant._id)} />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          ) : (
            <h3 className={styles.notFoundMessage}>Postulants not found</h3>
          )}
        </div>
      </div>
    </section>
  );
}

export default Search;
