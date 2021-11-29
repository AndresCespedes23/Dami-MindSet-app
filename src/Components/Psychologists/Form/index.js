import { useState, useEffect } from 'react';
import styles from './form.module.css';

function PsychologistsForm({ id, handleSubmit, handleShowModal }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    phoneNumber: '',
    enrollmentNumber: '',
    timeRange: [],
    dayRange: [],
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
      fetch(`${process.env.REACT_APP_API}/psychologists/${id}`)
        .then((response) => {
          if (response.status === 200 || response.status === 201) return response.json();
          throw new Error(`HTTP ${response.status}`);
        })
        .then((response) => {
          setFormData(response);
        });
    }
  }, []);

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
      status: event.target[5].value,
      timeRange: [event.target[6].value, event.target[7].value],
      dayRange: [event.target[8].value, event.target[9].value]
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
    handleShowModal();
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.formField}>
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        {error.name && <span className={styles.error}>Name is missing</span>}
      </div>
      <div className={styles.formField}>
        <label>Email</label>
        <input type="text" name="email" value={formData.email} onChange={handleChange} />
        {error.email && <span className={styles.error}>Email is missing</span>}
      </div>
      <div className={styles.formField}>
        <label>Username</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
        {error.username && <span className={styles.error}>Username is missing</span>}
      </div>
      <div className={styles.formField}>
        <label>Phone Number</label>
        <input
          type="number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
        {error.phoneNumber && <span className={styles.error}>Phone Number is missing</span>}
      </div>
      <div className={styles.formField}>
        <label>Enrollment Number</label>
        <input
          type="number"
          name="enrollmentNumber"
          value={formData.enrollmentNumber}
          onChange={handleChange}
        />
        {error.enrollmentNumber && (
          <span className={styles.error}>Enrollment Number is missing</span>
        )}
      </div>
      <div className={styles.formField}>
        <label>Status</label>
        <input type="string" name="status" value={formData.status} onChange={handleChange} />
        {error.status && <span className={styles.error}>Status is missing</span>}
      </div>
      <div className={styles.formField}>
        <label>Time Range:</label>
        <input type="time" name="timeStart" min="09:00" max="18:00" onChange={handleChange} />
        -To-
        <input type="time" name="timeEnd" min="09:00" max="18:00" onChange={handleChange} />
        {error.timeRange && <span className={styles.error}>Time Range is missing</span>}
      </div>
      <div className={styles.formField}>
        <label>Day Range</label>
        <input type="date" name="dayStart" onChange={handleChange} />
        -To-
        <input type="date" name="dayEnd" onChange={handleChange} />
        {error.dayRange && <span className={styles.error}>Time Range is missing</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default PsychologistsForm;
