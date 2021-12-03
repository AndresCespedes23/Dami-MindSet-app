import { useState, useEffect } from 'react';
import styles from './form.module.css';

function PositionsForm({ id, handleSubmit, handleShowModal }) {
  const [clients, setClients] = useState([]);
  const [profiles, setProfiles] = useState([]);
  const [formData, setFormData] = useState({
    idClient: '',
    idProfile: '',
    name: '',
    description: '',
    status: '',
    address: '',
    city: '',
    postalCode: ''
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
    fetch(`${process.env.REACT_APP_API}/clients`)
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then((response) => {
        setClients(response);
      });
    fetch(`${process.env.REACT_APP_API}/profiles`)
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then((response) => {
        setProfiles(response);
      });
    if (id) {
      fetch(`${process.env.REACT_APP_API}/positions/${id}`)
        .then((response) => {
          if (response.status === 200 || response.status === 201) return response.json();
          throw new Error(`HTTP ${response.status}`);
        })
        .then((response) => {
          console.log(response);
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
      idClient: event.target.idClient.value,
      idProfile: event.target.idProfile.value,
      name: event.target.name.value,
      description: event.target.description.value,
      status: event.target.status.value,
      address: event.target.address.value,
      city: event.target.city.value,
      postalCode: event.target.postalCode.value
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
      <div>
        <label>Client</label>
        <select name="idClient" value={formData.idClient._id} onChange={handleChange}>
          {clients.map((client) => {
            return [
              <option key={client._id} value={client._id}>
                {client.name}
              </option>
            ];
          })}
          {error.idClient && <span className={styles.error}>Client is missing</span>}
        </select>
      </div>
      <div>
        <label>Profile</label>
        <select name="idProfile" value={formData.idProfile._id} onChange={handleChange}>
          {profiles.map((profile) => {
            return [
              <option key={profile._id} value={profile._id}>
                {profile.name}
              </option>
            ];
          })}
          {error.idProfile && <span className={styles.error}>Profile is missing</span>}
        </select>
      </div>
      <div>
        <label>Full Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        {error.name && <span className={styles.error}>Name is missing</span>}
      </div>
      <div>
        <label>Description</label>
        <input
          type="text"
          name="description"
          value={formData.description}
          onChange={handleChange}
        />
        {error.description && <span className={styles.error}>Description is missing</span>}
      </div>
      <div>
        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option>DONE</option>
          <option>PENDING</option>
          {error.status && <span className={styles.error}>Status is missing</span>}
        </select>
      </div>
      <div>
        <label>Address</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} />
        {error.address && <span className={styles.error}>Address is missing</span>}
      </div>
      <div>
        <label>City</label>
        <input type="text" name="city" value={formData.city} onChange={handleChange} />
        {error.city && <span className={styles.error}>City is missing</span>}
      </div>
      <div>
        <label>ZIP Code</label>
        <input
          type="number"
          name="postalCode"
          value={formData.postalCode}
          onChange={handleChange}
        />
        {error.postalCode && <span className={styles.error}>Zip Code is missing</span>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default PositionsForm;
