import { useState, useEffect } from 'react';
import styles from './form.module.css';

function PostulantsForm({ id, handleSubmit, handleShowModal }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    gender: '',
    address: '',
    phoneNumber: '',
    dateOfBirth: '',
    zipCode: '',
    city: '',
    state: '',
    country: '',
    dni: ''
  });

  useEffect(() => {
    if (id) {
      fetch(`http://localhost:4000/api/candidates/${id}`)
        .then((response) => response.json())
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
    const newCandidate = {
      name: event.target[0].value,
      email: event.target[1].value,
      username: event.target[2].value,
      password: event.target[3].value,
      gender: event.target[4].value,
      address: event.target[5].value,
      phoneNumber: event.target[6].value,
      dateOfBirth: event.target[7].value,
      zipCode: event.target[8].value,
      city: event.target[9].value,
      state: event.target[10].value,
      country: event.target[11].value,
      dni: event.target[12].value
    };
    handleSubmit(newCandidate);
    handleShowModal();
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.formField}>
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
      </div>
      <div className={styles.formField}>
        <label>Email</label>
        <input type="text" name="email" value={formData.email} onChange={handleChange} />
      </div>
      <div className={styles.formField}>
        <label>Username</label>
        <input type="text" name="username" value={formData.username} onChange={handleChange} />
      </div>
      <div className={styles.formField}>
        <label>Password</label>
        <input type="password" name="password" value={formData.password} onChange={handleChange} />
      </div>
      <div className={styles.formField}>
        <label>Gender</label>
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="male" key="m">
            Male
          </option>
          <option value="female" key="f">
            Female
          </option>
          <option value="other" key="o">
            Other
          </option>
        </select>
      </div>
      <div className={styles.formField}>
        <label>Address</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} />
      </div>
      <div className={styles.formField}>
        <label>Phone Number</label>
        <input
          type="number"
          name="phoneNumber"
          value={formData.phoneNumber}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formField}>
        <label>Date of Birth</label>
        <input
          type="date"
          name="dateOfBirth"
          value={formData.dateOfBirth}
          onChange={handleChange}
        />
      </div>
      <div className={styles.formField}>
        <label>Zip Code</label>
        <input type="number" name="zipCode" value={formData.zipCode} onChange={handleChange} />
      </div>
      <div className={styles.formField}>
        <label>City</label>
        <input type="text" name="city" value={formData.city} onChange={handleChange} />
      </div>
      <div className={styles.formField}>
        <label>State</label>
        <input type="text" name="state" value={formData.state} onChange={handleChange} />
      </div>
      <div className={styles.formField}>
        <label>Country</label>
        <input type="text" name="country" value={formData.country} onChange={handleChange} />
      </div>
      <div className={styles.formField}>
        <label>DNI</label>
        <input type="number" name="dni" value={formData.dni} onChange={handleChange} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default PostulantsForm;
