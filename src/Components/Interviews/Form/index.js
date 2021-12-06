import { useState, useEffect } from 'react';
import styles from './form.module.css';
import Spinner from '../../Shared/Spinner';
import Input from '../../Shared/Input';
import Button from '../../Shared/Button';

function InterviewForm({ id, handleSubmit, handleShowModal }) {
  const [isLoadingForm, setLoadingForm] = useState(true);
  const [candidates, setCandidates] = useState([]);
  const [clients, setClients] = useState([]);
  const [positions, setPositions] = useState([]);
  const [formData, setFormData] = useState({
    idCandidate: '',
    idPosition: '',
    idClient: '',
    status: '',
    dateTime: ''
  });
  const [error, setIsError] = useState({
    idCandidate: false,
    idPosition: false,
    idClient: false,
    status: false,
    dateTime: false
  });

  useEffect(() => {
    setLoadingForm(true);
    fetch(`${process.env.REACT_APP_API}/candidates`)
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then((response) => {
        setCandidates(response);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadingForm(false));
    fetch(`${process.env.REACT_APP_API}/clients`)
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then((response) => {
        setClients(response);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadingForm(false));
    fetch(`${process.env.REACT_APP_API}/positions`)
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then((response) => {
        setPositions(response);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadingForm(false));
    if (id) {
      fetch(`${process.env.REACT_APP_API}/interviews/${id}`)
        .then((response) => {
          if (response.status === 200 || response.status === 201) return response.json();
          throw new Error(`HTTP ${response.status}`);
        })
        .then((response) => {
          response.dateTime = response.dateTime.split('T')[0];
          setFormData(response);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoadingForm(false));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const newInterview = {
      idCandidate: event.target.idCandidate.value,
      idPosition: event.target.idPosition.value,
      idClient: event.target.idClient.value,
      status: event.target.status.value,
      dateTime: event.target.dateTime.value
    };
    for (let key in newInterview) {
      if (newInterview[key] === '') {
        setIsError({ ...error, [key]: true });
        return;
      } else {
        setIsError({ ...error, [key]: false });
      }
    }
    handleSubmit(newInterview);
    handleShowModal();
  };
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div>
        <label>Candidate</label>
        <select name="idCandidate" value={formData.idCandidate._id} onChange={handleChange}>
          {candidates.map((candidate) => {
            return (
              <option key={candidate._id} value={candidate._id}>
                {candidate.name}
              </option>
            );
          })}
        </select>
        {error.idCandidate && <span className={styles.error}>*Candidate is missing</span>}
      </div>
      <div>
        <label>Client</label>
        <select name="idClient" value={formData.idClient._id} onChange={handleChange}>
          {clients.map((client) => {
            return (
              <option key={client._id} value={client._id}>
                {client.name}
              </option>
            );
          })}
        </select>
        {error.idClient && <span className={styles.error}>*Client is missing</span>}
      </div>
      <div>
        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option>DONE</option>
          <option>PENDING</option>
        </select>
        {error.status && <span className={styles.error}>*Status is missing</span>}
      </div>
      <div>
        <label>Position</label>
        <select name="idPosition" value={formData.idPosition._id} onChange={handleChange}>
          {positions.map((position) => {
            return [
              <option key={position._id} value={position._id}>
                {position.name}
              </option>
            ];
          })}
        </select>
        {error.idPosition && <span className={styles.error}>*Position is missing</span>}
      </div>
      <Input
        labelText="Date"
        name="dateTime"
        type="date"
        value={formData.dateTime}
        errorMessage="Date is missing"
        error={error.dateTime}
        onChange={handleChange}
        disbled={isLoadingForm}
      />
      {isLoadingForm === true ? (
        <Spinner type="Oval" color="#002147" height={40} width={40} />
      ) : (
        <div>
          <Button type="submit" />
        </div>
      )}
    </form>
  );
}

export default InterviewForm;
