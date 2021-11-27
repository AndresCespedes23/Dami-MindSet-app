import styles from './admins.module.css';

function Admins() {
  return (
    <section className={styles.container}>
      <h2>Admins</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Username</th>
            <th>Password</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody></tbody>
      </table>
    </section>
  );
}

export default Admins;
