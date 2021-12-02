import { useState, useEffect } from 'react';
import styles from './form.module.css';

function SessionsForm({ id, handleSubmit, handleShowModal }) {
  const [psychologists, setPsychologists] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [formData, setFormData] = useState({
    idPsychologist: '',
    idCandidate: '',
    dateTime: '',
    status: '',
    result: ''
  });
  const [error, setIsError] = useState({
    idPsychologist: false,
    idCandidate: false,
    dateTime: false,
    status: false,
    result: false
  });

  useEffect(() => {
    fetch(`${process.env.REACT_APP_API}/psychologists`)
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then((response) => {
        setPsychologists(response);
      })
      .catch((err) => console.log(err));
    fetch(`${process.env.REACT_APP_API}/candidates`)
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then((response) => {
        setCandidates(response);
      })
      .catch((err) => console.log(err));
    if (id) {
      fetch(`${process.env.REACT_APP_API}/sessions/${id}`)
        .then((response) => {
          if (response.status === 200 || response.status === 201) return response.json();
          throw new Error(`HTTP ${response.status}`);
        })
        .then((response) => {
          response.dateTime = response.dateTime.split('T')[0];
          setFormData(response);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const newSession = {
      idPsychologist: event.target.idPsychologist.value,
      idCandidate: event.target.idCandidate.value,
      dateTime: event.target.dateTime.value,
      status: event.target.status.value,
      result: event.target.result.value
    };

    for (let key in newSession) {
      if (newSession[key] === '') {
        setIsError({ ...error, [key]: true });
        return;
      } else {
        setIsError({ ...error, [key]: false });
      }
    }

    handleSubmit(newSession);
    handleShowModal();
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div>
        <div>
          <label>Psychologist</label>
          <select name="idPsychologist" value={formData.idPsychologist._id} onChange={handleChange}>
            {psychologists.map((psychologist) => {
              return [
                <option key={psychologist._id} value={psychologist._id}>
                  {psychologist.name}
                </option>
              ];
            })}
            {error.idPsychologist && <span className={styles.error}>Psychologist is missing</span>}
          </select>
        </div>
        <div>
          <label>Candidate</label>
          <select name="idCandidate" value={formData.idCandidate._id} onChange={handleChange}>
            {candidates.map((candidate) => {
              return [
                <option key={candidate._id} value={candidate._id}>
                  {candidate.name}
                </option>
              ];
            })}
            {error.idCandidate && <span className={styles.error}>Candidate is missing</span>}
          </select>
        </div>
        <div>
          <label>Date Time</label>
          <input
            type="datetime-local"
            name="dateTime"
            placeholder="Insert a date"
            required
            onChange={handleChange}
          />
          {error.dateTime && <span className={styles.error}>Date time is missing</span>}
        </div>
      </div>
      <div>
        <div>
          <label>Status</label>
          <select name="status" value={formData.status} required onChange={handleChange}>
            <option value="PENDING">PENDING</option>
            <option value="DONE">DONE</option>
          </select>
          {error.status && <span className={styles.error}>Status time is missing</span>}
        </div>
        <div>
          <label>Result</label>
          <input type="text" name="result" value={formData.result} onChange={handleChange} />
        </div>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default SessionsForm;
