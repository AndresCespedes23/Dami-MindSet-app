import { useState, useEffect } from 'react';
import styles from './form.module.css';
import Spinner from '../../Shared/Spinner';

function ClientsForm({ id, handleSubmit, handleShowModal }) {
  const [isLoadingForm, setLoadingForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    address: '',
    phoneNumber: '',
    cuit: '',
    activity: ''
  });
  const [error, setIsError] = useState({
    name: false,
    email: false,
    address: false,
    phoneNumber: false,
    cuit: false,
    activity: false
  });

  useEffect(() => {
    setLoadingForm(true);
    if (id) {
      fetch(`${process.env.REACT_APP_API}/clients/${id}`)
        .then((response) => {
          if (response.status === 200 || response.status === 201) return response.json();
          throw new Error(`HTTP ${response.status}`);
        })
        .then((response) => {
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
    const newClient = {
      name: event.target[0].value,
      email: event.target[1].value,
      address: event.target[2].value,
      phoneNumber: event.target[3].value,
      cuit: event.target[4].value,
      activity: event.target[5].value
    };

    for (let key in newClient) {
      if (newClient[key] === '') {
        setIsError({ ...error, [key]: true });
        return;
      } else {
        setIsError({ ...error, [key]: false });
      }
    }
    handleSubmit(newClient);
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
        <label>Address</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} />
        {error.address && <span className={styles.error}>Address is missing</span>}
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
        <label>CUIT</label>
        <input type="number" name="cuit" value={formData.cuit} onChange={handleChange} />
        {error.cuit && <span className={styles.error}>Cuit is missing</span>}
      </div>
      <div className={styles.formField}>
        <label>Activity Type</label>
        <input type="text" name="activity" value={formData.activity} onChange={handleChange} />
        {error.activity && <span className={styles.error}>Activity is missing</span>}
      </div>
      {isLoadingForm === true ? (
        <Spinner type="Oval" color="#002147" height={40} width={40} timeout={1000} />
      ) : (
        <button type="submit">Submit</button>
      )}
    </form>
  );
}
export default ClientsForm;
