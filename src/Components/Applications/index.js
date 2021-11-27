import { useState, useEffect } from 'react';
import styles from './applications.module.css';
import Button from '../Shared/Button/index';

function Applications() {
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    // fetch(`${process.env.REACT_APP_API}/applications`)
    fetch('http://localhost:4000/api/applications')
      .then((response) => response.json())
      .then((response) => {
        setApplications(response);
      });
  }, []);

  return (
    <section className={styles.container}>
      <h2>Applications</h2>
      <div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Position</th>
              <th>Candidate</th>
              <th>Interview</th>
              <th>Result</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => {
              return [
                <tr key={application._id}>
                  <td>{application.idPosition}</td>
                  <td>{application.idCandidate}</td>
                  <td>{application.idInterview}</td>
                  <td>{application.result}</td>
                  <td>{application.dateTime}</td>
                  <td>{application.status /* falta terminar esto y el boton de add*/}</td>
                  <td>
                    <Button type="delete" />
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

export default Applications;
