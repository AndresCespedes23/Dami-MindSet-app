import { useState, useEffect } from 'react';
import styles from './form.module.css';
import Spinner from '../../Shared/Spinner';
import Input from '../../Shared/Input';

function PositionsForm({ id, handleSubmit, handleShowModal }) {
  const [isLoadingForm, setLoadingForm] = useState(true);
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
    setLoadingForm(true);
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
    fetch(`${process.env.REACT_APP_API}/profiles`)
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then((response) => {
        setProfiles(response);
      })
      .catch((err) => console.log(err))
      .finally(() => setLoadingForm(false));
    if (id) {
      fetch(`${process.env.REACT_APP_API}/positions/${id}`)
        .then((response) => {
          if (response.status === 200 || response.status === 201) return response.json();
          throw new Error(`HTTP ${response.status}`);
        })
        .then((response) => {
          console.log(response);
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
      <Input
        labelText="Full Name"
        name="name"
        type="text"
        value={formData.name}
        errorMessage="Name is missing"
        error={error.name}
        onChange={handleChange}
        disbled={isLoadingForm}
      />
      <Input
        labelText="Description"
        name="description"
        type="text"
        value={formData.description}
        errorMessage="Description is missing"
        error={error.description}
        onChange={handleChange}
        disbled={isLoadingForm}
      />
      <div>
        <label>Status</label>
        <select name="status" value={formData.status} onChange={handleChange}>
          <option>DONE</option>
          <option>PENDING</option>
          {error.status && <span className={styles.error}>Status is missing</span>}
        </select>
      </div>
      <Input
        labelText="Address"
        name="address"
        type="text"
        value={formData.address}
        errorMessage="Address is missing"
        error={error.address}
        onChange={handleChange}
        disbled={isLoadingForm}
      />
      <Input
        labelText="City"
        name="city"
        type="text"
        value={formData.city}
        errorMessage="City is missing"
        error={error.city}
        onChange={handleChange}
        disbled={isLoadingForm}
      />
      <Input
        labelText="ZIP Code"
        name="postalCode"
        type="number"
        value={formData.postalCode}
        errorMessage="Zip Code is missing"
        error={error.postalCode}
        onChange={handleChange}
        disbled={isLoadingForm}
      />
      {isLoadingForm === true ? (
        <Spinner type="Oval" color="#002147" height={40} width={40} />
      ) : (
        <button type="submit">Submit</button>
      )}
    </form>
  );
}

export default PositionsForm;
