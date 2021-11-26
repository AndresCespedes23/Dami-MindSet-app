import { useState, useEffect } from 'react';
import Button from '../Shared/Button/index';
import styles from './psychologists.module.css';

function Psychologists() {
  const [psychologists, setPsychologists] = useState([]);

  useEffect(() => {
    fetch(`https://basd21-dami-mindset-api-dev.herokuapp.com/api/psychologists`)
      .then((response) => response.json())
      .then((response) => {
        setPsychologists(response);
      });
  }, []);

  return (
    <section className={styles.container}>
      <h2>Psychologists</h2>
      <div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Username</th>
              <th>Phone number</th>
              <th>Enrollment Number</th>
              <th>Time range</th>
              <th>Day range</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {psychologists.map((psychologist) => {
              console.log(psychologist);
              return [
                <tr key={psychologist._id}>
                  <td>{psychologist.name}</td>
                  <td>{psychologist.email}</td>
                  <td>{psychologist.username}</td>
                  <td>{psychologist.phoneNumber}</td>
                  <td>{psychologist.enrollmentNumber}</td>
                  <td>{psychologist.timeRange}</td>
                  <td>{psychologist.dayRange}</td>
                  <td>{psychologist.status}</td>
                  <td>
                    <Button type="delete" />
                    <Button type="update" />
                  </td>
                </tr>
              ];
            })}
          </tbody>
        </table>
      </div>
      <Button type="add" />
    </section>
  );
}

export default Psychologists;
