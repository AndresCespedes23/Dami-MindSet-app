import { useState, useEffect } from 'react';
import styles from './admins.module.css';
import Button from '../../Components/Shared/Button';

function Admins() {
  const [admins, setAdmins] = useState([]);

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/admins`)
      .then((response) => response.json())
      .then((response) => {
        setAdmins(response);
      });
  }, []);

  return (
    <section className={styles.container}>
      <h2>Admins</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => {
            return (
              <tr key={admin._id}>
                <td>{admin.name}</td>
                <td>{admin.email}</td>
                <td>{admin.username}</td>
                <td>
                  <Button type="delete" />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

export default Admins;
