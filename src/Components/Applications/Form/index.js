import { useState, useEffect } from 'react';
import styles from '../Form/form.module.css';
import Spinner from '../../Shared/Spinner';

function ApplicationsForm({ id, handleSubmit, handleShowModal }) {
  const [isLoading, setLoading] = useState(false);
  const [positions, setPositions] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [formData, setFormData] = useState({
    idPosition: '',
    idCandidate: '',
    idInterview: '',
    result: '',
    dateTime: '',
    status: ''
  });
  const [error, setIsError] = useState({
    idPosition: false,
    idCandidate: false,
    idInterview: false,
    result: false,
    dateTime: false,
    status: false
  });

  useEffect(() => {
    setLoading(true);
    fetch(`${process.env.REACT_APP_API}/positions`)
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then((response) => {
        setPositions(response);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
    fetch(`${process.env.REACT_APP_API}/candidates`)
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then((response) => {
        setCandidates(response);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));
    fetch(`${process.env.REACT_APP_API}/interviews`)
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then((response) => {
        setInterviews(response);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoading(false));

    if (id) {
      fetch(`${process.env.REACT_APP_API}/applications/${id}`)
        .then((response) => {
          if (response.status === 200 || response.status === 201) return response.json();
          throw new Error(`HTTP ${response.status}`);
        })
        .then((response) => {
          console.log(response);
          response.dateTime = response.dateTime.split('T')[0];
          setFormData(response);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
    }
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const newApplication = {
      idPosition: event.target.idPosition.value,
      idCandidate: event.target.idCandidate.value,
      idInterview: event.target.idInterview.value,
      result: event.target.result.value,
      dateTime: event.target.dateTime.value,
      status: event.target.status.value
    };
    for (let key in newApplication) {
      if (newApplication[key] === '') {
        setIsError({ ...error, [key]: true });
        return setIsError({ ...error, [key]: true });
      }
    }
    handleSubmit(newApplication);
    handleShowModal();
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div>
        <label>ID Position:</label>
        <select name="idPosition" value={formData.idPosition._id} onChange={handleChange}>
          {positions.map((position) => {
            return (
              <option key={position._id} value={position._id}>
                {position.name}
              </option>
            );
          })}
          {error.position && <span className={styles.error}>*Position is missing</span>}
        </select>
      </div>
      <div>
        <label>ID Candidate:</label>
        <select name="idCandidate" value={formData.idCandidate_id} onChange={handleChange}>
          {candidates.map((candidate) => {
            return (
              <option key={candidate._id} value={candidate._id}>
                {candidate.name}
              </option>
            );
          })}
          {error.candidate && <span className={styles.error}>*Candidate is missing</span>}
        </select>
      </div>
      <div>
        <label>Interview date:</label>
        <select name="idInterview" value={formData.idInterview_id} onChange={handleChange}>
          {interviews.map((interview) => {
            return (
              <option key={interview._id} value={interview._id}>
                {interview.dateTime}
              </option>
            );
          })}
          {error.interview && <span className={styles.error}>*Interview is missing</span>}
        </select>
      </div>
      <div>
        <label>Result</label>
        <input type="text" name="result" value={formData.result} onChange={handleChange} />
        {error.result && <span className={styles.error}>*Result is missing</span>}
      </div>
      <div>
        <label>Date:</label>
        <input type="date" name="dateTime" value={formData.dateTime} onChange={handleChange} />
        {error.dateTime && <span className={styles.error}>*Date is missing</span>}
      </div>
      <div>
        <label>Status:</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option>PENDING</option>
          <option>SCHEDULED</option>
          <option>HIRED</option>
          <option>REJECTED</option>
          {error.status && <span className={styles.error}>*Status is missing</span>}
        </select>
      </div>
      {isLoading === true ? (
        <Spinner type="Oval" color="#002147" height={40} width={40} timeout={1000} />
      ) : (
        <button type="submit">Submit</button>
      )}
    </form>
  );
}

export default ApplicationsForm;
