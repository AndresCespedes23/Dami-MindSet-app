import { useState, useEffect } from 'react';
import styles from './form.module.css';

function AdminsForm({ id, handleSubmit, handleShowModal }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: ''
  });

  useEffect(() => {
    if (id) {
      fetch(`${process.env.REACT_APP_API}/admins/${id}`)
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
    const UpdateAdmin = {
      name: event.target[0].value,
      email: event.target[1].value,
      username: event.target[2].value,
      password: event.target[3].value
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
      <button type="submit">Submit</button>
    </form>
  );
}

export default AdminsForm;
