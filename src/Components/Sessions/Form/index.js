import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './form.module.css';
import Spinner from '../../Shared/Spinner';
import Input from '../../Shared/Input';
import Button from '../../Shared/Button';
import { getOneSession } from '../../../redux/Sessions/thunks';

function SessionsForm({ id, handleSubmit, handleShowModal }) {
  const dispatch = useDispatch();
  const isLoadingForm = useSelector((store) => store.sessions.isLoadingForm);
  const [psychologists, setPsychologists] = useState([]);
  const [candidates, setCandidates] = useState([]);
  const [formData, setFormData] = useState({
    idPsychologist: '',
    idCandidate: '',
    date: '',
    time: '',
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
        setPsychologists(response.data);
      })
      .catch((err) => console.log(err));
    fetch(`${process.env.REACT_APP_API}/candidates`)
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then((response) => {
        setCandidates(response.data);
      })
      .catch((err) => console.log(err));

    if (id) {
      dispatch(getOneSession(id)).then((data) => {
        setFormData(data);
      });
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
      date: event.target.date.value,
      time: event.target.time.value,
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
          <select
            name="idPsychologist"
            value={formData.idPsychologist._id}
            disabled={isLoadingForm}
            onChange={handleChange}
          >
            {psychologists.map((psychologist) => {
              return [
                <option key={psychologist._id} value={psychologist._id}>
                  {psychologist.name}
                </option>
              ];
            })}
          </select>
          {error.idPsychologist && <span className={styles.error}>Psychologist is missing</span>}
        </div>
        <div>
          <label>Candidate</label>
          <select
            name="idCandidate"
            value={formData.idCandidate._id}
            disabled={isLoadingForm}
            onChange={handleChange}
          >
            {candidates.map((candidate) => {
              return [
                <option key={candidate._id} value={candidate._id}>
                  {candidate.name}
                </option>
              ];
            })}
          </select>
          {error.idCandidate && <span className={styles.error}>Candidate is missing</span>}
        </div>
        <div>
          <label>Date</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            placeholder="Insert a date"
            required
            disabled={isLoadingForm}
            onChange={handleChange}
          />
          {error.dateTime && <span className={styles.error}>Date time is missing</span>}
        </div>
        <div>
          <label>Time</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            placeholder="Insert a time"
            required
            disabled={isLoadingForm}
            onChange={handleChange}
          />
          {error.dateTime && <span className={styles.error}>Date time is missing</span>}
        </div>
      </div>
      <div>
        <div>
          <label>Status</label>
          <select
            name="status"
            value={formData.status}
            required
            disabled={isLoadingForm}
            onChange={handleChange}
          >
            <option value="PENDING">PENDING</option>
            <option value="DONE">DONE</option>
          </select>
          {error.status && <span className={styles.error}>Status time is missing</span>}
        </div>
        <Input
          labelText="Result"
          name="result"
          type="text"
          value={formData.result}
          errorMessage="Result is missing"
          error={error.result}
          onChange={handleChange}
          disbled={isLoadingForm}
        />
      </div>
      {isLoadingForm === true ? (
        <Spinner type="Oval" color="#002147" height={40} width={40} />
      ) : (
        <Button type="submit" />
      )}
    </form>
  );
}

export default SessionsForm;
