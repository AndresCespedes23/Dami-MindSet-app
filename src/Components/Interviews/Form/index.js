import { useState, useEffect } from 'react';
import styles from './form.module.css';

function InterviewForm() {
  const [candidates, setCandidates] = useState([]);
  const [clients, setClients] = useState([]);
  const [positions, setPositions] = useState([]);

  useEffect(() => {
    fetch(`https://basd21-dami-mindset-api-dev.herokuapp.com/api/candidates`)
      .then((response) => response.json())
      .then((response) => {
        setCandidates(response);
      });
    fetch(`https://basd21-dami-mindset-api-dev.herokuapp.com/api/clients`)
      .then((response) => response.json())
      .then((response) => {
        setClients(response);
      });
    fetch(`https://basd21-dami-mindset-api-dev.herokuapp.com/api/positions`)
      .then((response) => response.json())
      .then((response) => {
        setPositions(response);
      });
  }, []);

  return (
    <div>
      <form className={styles.containerForm}>
        <div className={styles.column}>
          <div>
            <label>Candidate:</label>
            <select name="candidate">
              {candidates.map((candidate) => {
                return [
                  <option key={candidate._id} value={candidate._id}>
                    {candidate.name}
                  </option>
                ];
              })}
            </select>
          </div>
          <div>
            <label>Client:</label>
            <select name="client">
              {clients.map((client) => {
                return [
                  <option key={client._id} value={client._id}>
                    {client.name}
                  </option>
                ];
              })}
            </select>
          </div>
          <div>
            <label>Status:</label>
            <select name="status">
              <option>DONE</option>
              <option>PENDING</option>
            </select>
          </div>
        </div>
        <div className={styles.column}>
          <div>
            <label>Position:</label>
            <select name="position">
              {positions.map((position) => {
                return [
                  <option key={position._id} value={position._id}>
                    {position.name}
                  </option>
                ];
              })}
            </select>
          </div>
          <div>
            <label>Date:</label>
            <input type="date" name="date" placeholder="Insert a date" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default InterviewForm;
