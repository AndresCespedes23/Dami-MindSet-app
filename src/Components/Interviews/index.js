import { useState, useEffect } from 'react';
import styles from './interviews.module.css';
import Button from '../Shared/Button/index';
function Interviews() {
  const [interviews, setInterviews] = useState([]);

  useEffect(() => {
    fetch(`https://basd21-dami-mindset-api-dev.herokuapp.com/api/interviews`)
      .then((response) => response.json())
      .then((response) => {
        setInterviews(response);
      });
  }, []);

  return (
    <section className={styles.container}>
      <h2>Interviews</h2>
      <div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Client</th>
              <th>Position</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {interviews.map((interview) => {
              console.log(interview);
              return [
                <tr key={interview._id}>
                  <td>{interview.idCandidate}</td>
                  <td>{interview.idClient}</td>
                  <td>{interview.idPosition}</td>
                  <td>{interview.dateTime}</td>
                  <td>{interview.status}</td>
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

export default Interviews;
