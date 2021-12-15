import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './form.module.css';
import Spinner from 'Components/Shared/Spinner';
import Input from 'Components/Shared/Input';
import Button from 'Components/Shared/Button';
import { getOneAdmin } from 'redux/Admins/thunks';

function AdminsForm({ id, handleSubmit, handleShowModal }) {
  const dispatch = useDispatch();
  const isLoadingForm = useSelector((store) => store.positions.isLoadingForm);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: ''
  });

  useEffect(() => {
    if (id) {
      dispatch(getOneAdmin(id)).then((data) => {
        setFormData(data);
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
        disabled={isLoadingForm}
      />
      <Input
        labelText="Email"
        name="email"
        type="email"
        value={formData.email}
        errorMessage="Email is missing"
        error={false}
        onChange={handleChange}
        disabled={isLoadingForm}
      />
      <Input
        labelText="Username"
        name="username"
        type="text"
        value={formData.username}
        errorMessage="Username is missing"
        error={false}
        onChange={handleChange}
        disabled={isLoadingForm}
      />
      <Input
        labelText="Password"
        name="password"
        type="password"
        value={formData.password}
        errorMessage="Password is missing"
        error={false}
        onChange={handleChange}
        disabled={isLoadingForm}
      />
      {isLoadingForm === true ? (
        <Spinner type="Oval" color="#002147" height={40} width={40} />
      ) : (
        <Button type="submit" />
      )}
    </form>
  );
}

export default AdminsForm;
