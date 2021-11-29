import { useState, useEffect } from 'react';
import styles from './form.module.css';

function PostulantsForm({ id, handleSubmit, handleShowModal }) {
  const [formData, setFormData] = useState({
    idClient:'',
    idProfile:'',
    name:'',
    description:'',
    status:'',
    address:'',
    city:'',
    postalCode:''
  });
  const [error, setIsError] = useState({
    idClient: false,
    idProfile: false,
    name: false,
    description: false,
    status: false,
    address: false,
    city: false,
    postalCode: false
  });

  useEffect(() => {
    if (id) {
      fetch(`${process.env.REACT_APP_API}/positions/${id}`)
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
    const newPosition = {
      idClient: event.target[0].value,
      idProfile: event.target[1].value,
      name: event.target[2].value,
      description: event.target[3].value,
      status: event.target[4].value,
      address: event.target[5].value,
      city: event.target[6].value,
      postalCode: event.target[7].value
    };

    for (let key in newPosition) {
      if (newPosition[key] === '') {
        setIsError({ ...error, [key]: true });
        return;
      } else {
        setIsError({ ...error, [key]: false });
      }
    }

    handleSubmit(newPosition);
    handleShowModal();
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div className={styles.formContainer}>
        <div className={styles.column}>
          <div className={styles.fields}>
            <label>Client</label>
            <input type="text" name="id" value={formData.idClient} onChange={handleChange} />
            {error.idClient && <span className={styles.error}>Client ID is missing</span>}
          </div>
          <div className={styles.fields}>
            <label>Profile</label>
            <input type="text" name="name" value={formData.idProfile} onChange={handleChange} />
            {error.idProfile && <span className={styles.error}>Profile ID is missing</span>}
          </div>
          <div className={styles.formField}>
            <label>Full Name</label>
            <input type="text" name="username" value={formData.name} onChange={handleChange} />
            {error.name && <span className={styles.error}>Name is missing</span>}
          </div>
          <div className={styles.formField}>
            <label>Description</label>
            <input type="text" name="password" value={formData.description} onChange={handleChange} />
            {error.description && <span className={styles.error}>Description is missing</span>}
          </div>
        </div>
        <div className={styles.column}>
          <div className={styles.formField}>
            <label>Status</label>
            <input type="text" name="password" value={formData.status} onChange={handleChange} />
            {error.status && <span className={styles.error}>State is missing</span>}
          </div>
          <div className={styles.formField}>
            <label>Address</label>
            <input type="text" name="address" value={formData.address} onChange={handleChange} />
            {error.address && <span className={styles.error}>Address is missing</span>}
          </div>
          <div className={styles.formField}>
            <label>City</label>
            <input type="number" name="zipCode" value={formData.city} onChange={handleChange} />
            {error.city && <span className={styles.error}>City is missing</span>}
          </div>
          <div className={styles.formField}>
            <label>ZIP Code</label>
            <input type="text" name="city" value={formData.postalCode} onChange={handleChange} />
            {error.postalCode && <span className={styles.error}>Zip Code is missing</span>}
          </div>
          <button type="submit">Submit</button>
        </div>
      </div>
    </form>
  );
}

export default PostulantsForm;