import { useState, useEffect } from 'react';
import styles from '../Form/form.module.css';
//CODIGO DE JULI 27/11 16HS         Y DE VALEN

function ApplicationsForm({ id, handleSubmit, handleShowModal }) {
  const [positions, setPositions] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [interviews, setInterviews] = useState([]);
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/positions')
      .then((response) => response.json())
      .then((response) => {
        if (response.length > 0) setPositions(response);
      });
    fetch('http://localhost:4000/api/candidates')
      .then((response) => response.json())
      .then((response) => {
        if (response.length > 0) setCandidates(response);
      });
    fetch('http://localhost:4000/api/interviews')
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        if (response.length > 0) setInterviews(response);
      });

    if (id !== null) {
      fetch(`http://localhost:4000/api/applications/${id}`)
        .then((response) => response.json())
        .then((response) => {
          setFormData(response);
        });
    }
  }, []);

  //const handleChange = (event) => {        //CODIGO DE JULI QUE NO LO TIENE VALEN... JULI LO USA EN RETURN
  //  const { name, value } = event.target;
  //  setFormData({ ...formData, [name]: value });
  //};

  const onSubmit = (event) => {
    event.preventDefault();
    const newApplication = {
      idPosition: event.target.position.value,
      idCandidate: event.target.candidate.value,
      idInterview: event.target.interview.value,
      result: event.target.result.value,
      dateTime: event.target.dateTime.value,
      status: event.target.status.value
    };
    console.log(newApplication);
    handleSubmit(newApplication);
    handleShowModal();
  };

  return (
    <div className={styles.title}>
      <h2>New Application</h2>
      <form className={styles.form} onSubmit={onSubmit}>
        <div>
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
        <div>
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
        <div>
          <label>Interview date:</label>
          <select name="interview">
            {interviews.map((interview) => {
              return [
                <option key={interview._id} value={interview._id}>
                  {interview.dateTime}
                </option>
              ];
            })}
          </select>
        </div>
        <div>
          <label>Result</label>
          <input type="text" name="result" value={formData.result} />
        </div>
        <div>
          <label>Date:</label>
          <input type="date" name="dateTime" value={formData.dateTime} />
        </div>
        <div>
          <label>Status:</label>
          <select name="status">
            <option value="PENDING" key="p">
              PENDING
            </option>
            <option value="SCHEDULED" key="s">
              SCHEDULED
            </option>
            <option value="HIRED" key="h">
              HIRED
            </option>
            <option value="REJECTED" key="r">
              REJECTED
            </option>
          </select>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default ApplicationsForm;
