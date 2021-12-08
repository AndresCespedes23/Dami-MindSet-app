import { useState, useEffect } from 'react';
import styles from './form.module.css';
import Spinner from '../../Shared/Spinner';
import Input from '../../Shared/Input';
import Button from '../../Shared/Button';

function ProfilesForm({ id, handleSubmit, handleShowModal }) {
  const [isLoadingForm, setLoadingForm] = useState(false);
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
      setLoadingForm(true);
      fetch(`${process.env.REACT_APP_API}/profiles/${id}`)
        .then((response) => {
          if (response.status === 200 || response.status === 201) return response.json();
          throw new Error(`HTTP ${response.status}`);
        })
        .then((response) => {
          setFormData(response.data);
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
      <Input
        labelText="Type of Profile"
        name="name"
        type="text"
        value={formData.name}
        errorMessage="Profile is missing"
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
      {isLoadingForm === true ? (
        <Spinner type="Oval" color="#002147" height={40} width={40} />
      ) : (
        <Button type="submit" />
      )}
    </form>
  );
}

export default ProfilesForm;
