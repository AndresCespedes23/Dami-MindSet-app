import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from '../Form/form.module.css';
import Spinner from '../../Shared/Spinner';
import Input from '../../Shared/Input';
import Button from '../../Shared/Button';
import { getOneApplication } from '../../../redux/Applications/thunks';

function ApplicationsForm({ id, handleSubmit, handleShowModal }) {
  const isLoadingForm = useSelector((store) => store.applications.isLoadingForm);
  const dispatch = useDispatch();
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
    fetch(`${process.env.REACT_APP_API}/positions`)
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then((response) => {
        setPositions(response.data);
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
    fetch(`${process.env.REACT_APP_API}/interviews`)
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then((response) => {
        setInterviews(response.data);
      })
      .catch((err) => console.log(err));

    if (id) {
      dispatch(getOneApplication(id)).then((data) => {
        setFormData(data).finally(() => isLoadingForm(false));
      });
    }
  }, [dispatch]);

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
        <label>ID Position</label>
        <select name="idPosition" value={formData.idPosition._id} onChange={handleChange}>
          {positions.map((position) => {
            return (
              <option key={position._id} value={position._id}>
                {position.name}
              </option>
            );
          })}
        </select>
        {error.idPosition && <span className={styles.error}>*Position is missing</span>}
      </div>
      <div>
        <label>ID Candidate</label>
        <select name="idCandidate" value={formData.idCandidate_id} onChange={handleChange}>
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
        <label>Interview date</label>
        <select name="idInterview" value={formData.idInterview_id} onChange={handleChange}>
          {interviews.map((interview) => {
            return (
              <option key={interview._id} value={interview._id}>
                {interview.dateTime}
              </option>
            );
          })}
        </select>
        {error.idInterview && <span className={styles.error}>*Interview is missing</span>}
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
      <div>
        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option>PENDING</option>
          <option>SCHEDULED</option>
          <option>HIRED</option>
          <option>REJECTED</option>
        </select>
        {error.status && <span className={styles.error}>*Status is missing</span>}
      </div>
      {isLoadingForm === true ? (
        <Spinner type="Oval" color="#002147" height={40} width={40} />
      ) : (
        <Button type="submit" />
      )}
    </form>
  );
}

export default ApplicationsForm;
