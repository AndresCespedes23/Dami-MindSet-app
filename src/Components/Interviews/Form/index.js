import { useState, useEffect } from 'react';
import styles from './form.module.css';

function InterviewForm({ id, handleSubmit }) {
  const [candidates, setCandidates] = useState([]);
  const [clients, setClients] = useState([]);
  const [positions, setPositions] = useState([]);
  const setForm = (interview) => {
    console.log(interview);
  };
  useEffect(() => {
    fetch(`http://localhost:5000/api/candidates`)
      .then((response) => response.json())
      .then((response) => {
        setCandidates(response);
      });
    fetch(`http://localhost:5000/api/clients`)
      .then((response) => response.json())
      .then((response) => {
        setClients(response);
      });
    fetch(`http://localhost:5000/api/positions`)
      .then((response) => response.json())
      .then((response) => {
        setPositions(response);
      });
    if (id !== null) {
      fetch(`http://localhost:5000/api/interviews/${id}`)
        .then((response) => response.json())
        .then((response) => {
          setForm(response);
        });
    }
  }, []);
  const onSubmit = (event) => {
    event.preventDefault();
    //Falta validar y msg de error
    const newInterview = {
      idCandidate: event.target.candidate.value,
      idPosition: event.target.position.value,
      idClient: event.target.client.value,
      status: event.target.status.value,
      dateTime: event.target.dateTime.value
    };
    handleSubmit(newInterview);
  };

  return (
    <div>
      <form className={styles.containerForm} onSubmit={onSubmit}>
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
            <input type="date" name="dateTime" placeholder="Insert a date" required />
          </div>
          <div>
            <button type="submit" className={styles.submit}>
              Submit
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}

export default InterviewForm;
