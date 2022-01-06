import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './statistics.module.css';
import Button from 'Components/Shared/Button';
import Spinner from 'Components/Shared/Spinner';
import { getProfileStatistics } from 'redux/Statistics/thunks';

function Admins() {
  const isLoading = useSelector((state) => state.admins.isLoading);
  const profileStatistics = [];

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProfileStatistics());
  }, [dispatch]);

  if (isLoading) return <Spinner type="ThreeDots" color="#002147" height={80} width={80} />;

  return (
    <section className={styles.container}>
      <div className={styles.containerPsychologists}>
        <div className={styles.header}>
          <Button type={'backBtnAdmin'} />
          <h2>Statistics</h2>
        </div>
        <div className={styles.contentPsychologists}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Profile</th>
                <th>Annual Applications</th>
              </tr>
            </thead>
            <tbody>
              {profileStatistics.map((postulant) => {
                return (
                  <tr key={postulant._id}>
                    <td>{postulant.name}</td>
                    <td>{postulant.email}</td>
                    <td>{postulant.phoneNumber}</td>
                    <td>{postulant.country}</td>
                    <td>{postulant.status}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}

export default Admins;
