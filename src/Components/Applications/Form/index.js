import { useState, useEffect } from 'react';
import styles from '../Form/form.module.css';

function ApllicationForm({ id, handleSubmit, handleShowModal }) {
  //const [formData, setFormData] = useState({
  //  idPosition: '',
  //  idCandidate: '',
  //  idInterview: '',
  //  result: '',
  //  dateTime: '',
  //  status: ''
  //});

  const [positions, setPositions] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/positions')
      .then((response) => response.json())
      .then((response) => {
        setPositions(response);
      });
    fetch('http://localhost:4000/api/candidates')
      .then((response) => response.json())
      .then((response) => {
        setCandidates(response);
      });
    fetch('http://localhost:4000/api/interviews')
      .then((response) => response.json())
      .then((response) => {
        setInterviews(response);
      });

    if (id !== null) {
      fetch(`http://localhost:4000/api/applications/${id}`)
        .then((response) => response.json())
        .then((response) => {
          setFormData(response);
        });
    }
  }, []);

  //const handleChange = (event) => {
  //  const { name, value } = event.target;
  //  setFormData({ ...formData, [name]: value });
  //};

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
    handleSubmit(newApplication);
    handleShowModal();
  };

  return (
    <div className={styles.form}>
      <h2>New Application</h2>
      <form className={styles.form} onSubmit={onSubmit}>
        <div className={styles.form}>
          <label>ID Position:</label>
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
        <div className={styles.form}>
          <label>ID Candidate:</label>
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
        <div className={styles.form}>
          <label>ID Interview:</label>
          <select name="interview">
            {interviews.map((interview) => {
              return [
                <option key={interview._id} value={interview._id}>
                  {interview.name}
                </option>
              ];
            })}
          </select>
        </div>
        <div className={styles.form}>
          <label>Result:</label>
          <select name="status">
            <opcion value="PENDING" key="p">
              PENDING
            </opcion>
            <opcion value="SCHEDULED" key="s">
              SCHEDULED
            </opcion>
            <opcion value="HIRED" key="h">
              HIRED
            </opcion>
            <opcion value="REJECTED" key="r">
              REJECTED
            </opcion>
          </select>
        </div>
        <div className={styles.form}>
          <label>Date:</label>
          <input type="text" name="dateTime" value={formData.dateTime} />
        </div>
        <div className={styles.form}>
          <label>Status</label>
          <input type="text" name="status" value={formData.status} />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ApllicationForm;
