import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './form.module.css';
import Spinner from '../../Shared/Spinner';
import Input from '../../Shared/Input';
import Button from '../../Shared/Button';
import { getOnePsychologist } from '../../../redux/Psychologists/thunks';

function PsychologistsForm({ id, handleSubmit, handleShowModal }) {
  const isLoadingForm = useSelector((store) => store.psychologists.isLoadingForm);
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    phoneNumber: '',
    enrollmentNumber: '',
    timeStart: '',
    timeEnd: '',
    dayStart: '',
    dayEnd: '',
    status: ''
  });
  const [error, setIsError] = useState({
    name: false,
    email: false,
    username: false,
    password: false,
    phoneNumber: false,
    enrollmentNumber: false,
    status: false,
    timeRange: false,
    dayRange: false
  });

  useEffect(() => {
    if (id) {
      dispatch(getOnePsychologist(id)).then((data) => {
        setFormData(data);
      });
    }
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const onSubmit = (event) => {
    event.preventDefault();
    const newPsychologist = {
      name: event.target[0].value,
      email: event.target[1].value,
      username: event.target[2].value,
      phoneNumber: event.target[3].value,
      enrollmentNumber: event.target[4].value,
      status: event.target.status.value,
      password: event.target.password.value,
      timeStart: event.target.timeStart.value,
      timeEnd: event.target.timeEnd.value,
      dayStart: event.target.dayStart.value,
      dayEnd: event.target.dayEnd.value
    };

    for (let key in newPsychologist) {
      if (newPsychologist[key] === '') {
        setIsError({ ...error, [key]: true });
        return;
      } else {
        setIsError({ ...error, [key]: false });
      }
    }

    handleSubmit(newPsychologist);
    handleShowModal(false);
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div>
        <Input
          labelText="Name"
          name="name"
          type="text"
          value={formData.name}
          errorMessage="Name is missing"
          error={error.name}
          onChange={handleChange}
          disbled={isLoadingForm}
        />
        <Input
          labelText="Email"
          name="email"
          type="email"
          value={formData.email}
          errorMessage="Email is missing"
          error={error.email}
          onChange={handleChange}
          disbled={isLoadingForm}
        />
        <Input
          labelText="Username"
          name="username"
          type="text"
          value={formData.username}
          errorMessage="Username is missing"
          error={error.username}
          onChange={handleChange}
          disbled={isLoadingForm}
        />
        <Input
          labelText="Phone Number"
          name="phoneNumber"
          type="number"
          value={formData.phoneNumber}
          errorMessage="Phone Number is missing"
          error={error.phoneNumber}
          onChange={handleChange}
          disbled={isLoadingForm}
        />
        <Input
          labelText="Enrollment Number"
          name="enrollmentNumber"
          type="number"
          value={formData.enrollmentNumber}
          errorMessage="Enrollment Number is missing"
          error={error.enrollmentNumber}
          onChange={handleChange}
          disbled={isLoadingForm}
        />
        <div>
          <label>Status</label>
          <select name="status" value={formData.status} onChange={handleChange}>
            <option>AVAILABLE</option>
            <option>UNAVAILABLE</option>
          </select>
          {error.status && <span className={styles.error}>*Status is missing</span>}
        </div>
      </div>
      <div>
        <div>
          <label>Time Range - From</label>
          <input
            type="time"
            name="timeStart"
            value={formData.timeStart}
            min="09:00"
            max="18:00"
            onChange={handleChange}
          />
          {error.timeRange && <span className={styles.error}>*Time Range is missing</span>}
        </div>
        <div>
          <label>To</label>
          <input
            type="time"
            name="timeEnd"
            value={formData.timeEnd}
            min="09:00"
            max="18:00"
            onChange={handleChange}
          />
          {error.timeRange && <span className={styles.error}>Time Range is missing</span>}
        </div>
        <Input
          labelText="Day Range"
          name="dayStart"
          type="date"
          value={formData.dayStart}
          errorMessage="Day is missing"
          error={error.dayRange}
          onChange={handleChange}
          disbled={isLoadingForm}
        />
        <Input
          labelText="To"
          name="dayEnd"
          type="date"
          value={formData.dayEnd}
          errorMessage="Day is missing"
          error={error.dayRange}
          onChange={handleChange}
          disbled={isLoadingForm}
        />
        <Input
          labelText="Password"
          name="password"
          type="password"
          value={formData.password}
          errorMessage="Password is missing"
          error={error.password}
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

export default PsychologistsForm;
