import { useState, useEffect } from 'react';
import styles from './form.module.css';
import Spinner from '../../Shared/Spinner';
import Input from '../../Shared/Input';

function AdminsForm({ id, handleSubmit, handleShowModal }) {
  const [isLoadingForm, setLoadingForm] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: ''
  });

  useEffect(() => {
    if (id) {
      setLoadingForm(true);
      fetch(`${process.env.REACT_APP_API}/admins/${id}`)
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
    const UpdateAdmin = {
      name: event.target.name.value,
      email: event.target.email.value,
      username: event.target.username.value,
      password: event.target.password.value
    };

    handleSubmit(UpdateAdmin);
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
        error={false}
        onChange={handleChange}
        disbled={isLoadingForm}
      />
      <Input
        labelText="Email"
        name="email"
        type="email"
        value={formData.email}
        errorMessage="Email is missing"
        error={false}
        onChange={handleChange}
        disbled={isLoadingForm}
      />
      <Input
        labelText="Username"
        name="username"
        type="text"
        value={formData.username}
        errorMessage="Username is missing"
        error={false}
        onChange={handleChange}
        disbled={isLoadingForm}
      />
      <Input
        labelText="Password"
        name="password"
        type="password"
        value={formData.password}
        errorMessage="Password is missing"
        error={false}
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

export default AdminsForm;
