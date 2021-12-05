import { useState, useEffect } from 'react';
import styles from './form.module.css';
import Spinner from '../../Shared/Spinner';
import Input from '../../Shared/Input';
import Button from '../../Shared/Button';

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
    if (id) {
      setLoadingForm(true);
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
        labelText="Phone Number"
        name="phoneNumber"
        type="number"
        value={formData.phoneNumber}
        errorMessage="Phone number is missing"
        error={error.phoneNumber}
        onChange={handleChange}
        disbled={isLoadingForm}
      />
      <Input
        labelText="CUIT"
        name="cuit"
        type="number"
        value={formData.cuit}
        errorMessage="CUIT is missing"
        error={error.cuit}
        onChange={handleChange}
        disbled={isLoadingForm}
      />
      <Input
        labelText="Activity Type"
        name="activity"
        type="text"
        value={formData.activity}
        errorMessage="Activity is missing"
        error={error.activity}
        onChange={handleChange}
        disbled={isLoadingForm}
      />
      {isLoadingForm === true ? (
        <Spinner type="Oval" color="#002147" height={40} width={40} />
      ) : (
        <Button type="submit" />
      )}
    </form>
  );
}
export default ClientsForm;
