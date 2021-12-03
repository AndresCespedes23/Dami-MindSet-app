import { useState, useEffect } from 'react';
import styles from './form.module.css';
import Spinner from '../../Shared/Spinner';

function AdminsForm({ id, handleSubmit, handleShowModal }) {
  const [isLoading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: ''
  });

  useEffect(() => {
    setLoading(true);
    if (id) {
      fetch(`${process.env.REACT_APP_API}/admins/${id}`)
        .then((response) => {
          if (response.status === 200 || response.status === 201) return response.json();
          throw new Error(`HTTP ${response.status}`);
        })
        .then((response) => {
          setFormData(response);
        })
        .catch((err) => console.log(err))
        .finally(() => setLoading(false));
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
      <div className={styles.formField}>
        <label>Name</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div className={styles.formField}>
        <label>Email</label>
        <input type="text" name="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div className={styles.formField}>
        <label>Username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
      </div>
      <div className={styles.formField}>
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
      </div>
      {isLoading === true ? (
        <Spinner type="Oval" color="#002147" height={40} width={40} timeout={1000} />
      ) : (
        <button type="submit">Submit</button>
      )}
    </form>
  );
}

export default AdminsForm;
