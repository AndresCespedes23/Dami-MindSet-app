import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './form.module.css';
import Spinner from 'Components/Shared/Spinner';
import Input from 'Components/Shared/Input';
import Button from 'Components/Shared/Button';
import { getOneInterview } from 'redux/Interviews/thunks';
import { getPostulants } from 'redux/Postulants/thunks';
import { getClients } from 'redux/Clients/thunks';
import { getPositions } from 'redux/Positions/thunks';

function InterviewForm({ id, handleSubmit, handleShowModal }) {
  const dispatch = useDispatch();
  const isLoadingForm = useSelector((store) => store.sessions.isLoadingForm);
  const candidates = useSelector((state) => state.postulants.list);
  const clients = useSelector((state) => state.clients.list);
  const positions = useSelector((state) => state.positions.list);
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
    dispatch(getPostulants());
    dispatch(getClients());
    dispatch(getPositions());
    if (id) {
      dispatch(getOneInterview(id)).then((data) => {
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
        value={formData.dateTime.split('T')[0]}
        errorMessage="Date is missing"
        error={error.dateTime}
        onChange={handleChange}
        disabled={isLoadingForm}
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
