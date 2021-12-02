import { useState, useEffect } from 'react';
import styles from './form.module.css';

function ProfilesForm({ id, handleSubmit, handleShowModal }) {
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  });
  const [error, setIsError] = useState({
    name: '',
    description: ''
  });

  useEffect(() => {
    if (id) {
      fetch(`${process.env.REACT_APP_API}/profiles/${id}`)
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
    const newProfile = {
      name: event.target[0].value,
      description: event.target[1].value
    };
    for (let key in newProfile) {
      if (newProfile[key] === '') {
        return setIsError({ ...error, [key]: true });
      }
    }
    handleSubmit(newProfile);
    handleShowModal();
  };
  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div>
        <label>Type of Profile</label>
        <input type="text" name="name" value={formData.name} onChange={handleChange} />
        {error.name && <span className={styles.error}>Profile is missing</span>}
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
      <button type="submit">Submit</button>
    </form>
  );
}

export default ProfilesForm;
