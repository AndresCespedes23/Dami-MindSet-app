import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './form.module.css';
import Spinner from 'Components/Shared/Spinner';
import Input from 'Components/Shared/Input';
import Button from 'Components/Shared/Button';
import { getOneProfile } from 'redux/Profiles/thunks';

function ProfilesForm({ id, handleSubmit, handleShowModal }) {
  const isLoadingForm = useSelector((store) => store.profiles.isLoadingForm);
  const dispatch = useDispatch();
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
      dispatch(getOneProfile(id)).then((data) => {
        setFormData(data);
      });
    }
  }, [dispatch]);

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
