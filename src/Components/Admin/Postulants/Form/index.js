import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styles from './form.module.css';
import Spinner from 'Components/Shared/Spinner';
import Input from 'Components/Shared/Input';
import Button from 'Components/Shared/Button';
import { getOnePostulant } from 'redux/Postulants/thunks';

function PostulantsForm({ id, handleSubmit, handleShowModal }) {
  const dispatch = useDispatch();
  const isLoadingForm = useSelector((store) => store.postulants.isLoadingForm);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    password: '',
    gender: '',
    address: '',
    phoneNumber: '',
    dateOfBirth: '',
    zipCode: '',
    city: '',
    state: '',
    country: '',
    dni: ''
  });
  const [error, setIsError] = useState({
    name: false,
    email: false,
    username: false,
    password: false,
    gender: false,
    address: false,
    phoneNumber: false,
    dateOfBirth: false,
    zipCode: false,
    city: false,
    state: false,
    country: false,
    dni: false
  });

  useEffect(() => {
    if (id) {
      dispatch(getOnePostulant(id)).then((data) => {
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
    const newCandidate = {
      name: event.target[0].value,
      email: event.target[1].value,
      username: event.target[2].value,
      password: event.target[3].value,
      gender: event.target[4].value,
      address: event.target[5].value,
      phoneNumber: event.target[6].value,
      dateOfBirth: event.target[7].value.split('T')[0],
      zipCode: event.target[8].value,
      city: event.target[9].value,
      state: event.target[10].value,
      country: event.target[11].value,
      dni: event.target[12].value
    };

    for (let key in newCandidate) {
      if (newCandidate[key] === '') {
        setIsError({ ...error, [key]: true });
        return;
      } else {
        setIsError({ ...error, [key]: false });
      }
    }

    handleSubmit(newCandidate);
    handleShowModal(false);
  };

  return (
    <form className={styles.form} onSubmit={onSubmit}>
      <div>
        <Input
          labelText="Name"
          name="name"
          type="text"
          value={formData.name}
          errorMessage="Name is missing"
          error={error.name}
          onChange={handleChange}
          disabled={isLoadingForm}
        />
        <Input
          labelText="Email"
          name="email"
          type="email"
          value={formData.email}
          errorMessage="Email is missing"
          error={error.email}
          onChange={handleChange}
          disabled={isLoadingForm}
        />
        <Input
          labelText="Username"
          name="username"
          type="text"
          value={formData.username}
          errorMessage="Username is missing"
          error={error.username}
          onChange={handleChange}
          disabled={isLoadingForm}
        />
        <Input
          labelText="Password"
          name="password"
          type="password"
          value={formData.password}
          errorMessage="Password is missing"
          error={error.password}
          onChange={handleChange}
          disabled={isLoadingForm}
        />
        <div>
          <label>Gender</label>
          <select name="gender" value={formData.gender} onChange={handleChange}>
            <option value="male" key="m">
              Male
            </option>
            <option value="female" key="f">
              Female
            </option>
            <option value="other" key="o">
              Other
            </option>
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
          disabled={isLoadingForm}
        />
        <Input
          labelText="Phone Number"
          name="phoneNumber"
          type="number"
          value={formData.phoneNumber}
          errorMessage="Phone Number is missing"
          error={error.phoneNumber}
          onChange={handleChange}
          disabled={isLoadingForm}
        />
      </div>
      <div>
        <Input
          labelText="Date of Birth"
          name="dateOfBirth"
          type="date"
          value={formData.dateOfBirth}
          errorMessage="Date of Birth is missing"
          error={error.dateOfBirth}
          onChange={handleChange}
          disabled={isLoadingForm}
        />
        <Input
          labelText="Zip Code"
          name="zipCode"
          type="number"
          value={formData.zipCode}
          errorMessage="Zip Code is missing"
          error={error.zipCode}
          onChange={handleChange}
          disabled={isLoadingForm}
        />
        <Input
          labelText="City"
          name="city"
          type="text"
          value={formData.city}
          errorMessage="City is missing"
          error={error.city}
          onChange={handleChange}
          disabled={isLoadingForm}
        />
        <Input
          labelText="State"
          name="state"
          type="text"
          value={formData.state}
          errorMessage="State is missing"
          error={error.state}
          onChange={handleChange}
          disabled={isLoadingForm}
        />
        <Input
          labelText="Country"
          name="country"
          type="text"
          value={formData.country}
          errorMessage="Country is missing"
          error={error.country}
          onChange={handleChange}
          disabled={isLoadingForm}
        />
        <Input
          labelText="DNI"
          name="dni"
          type="text"
          value={formData.dni}
          errorMessage="DNI is missing"
          error={error.dni}
          onChange={handleChange}
          disabled={isLoadingForm}
        />
      </div>
      {isLoadingForm === true ? (
        <Spinner type="Oval" color="#002147" height={40} width={40} />
      ) : (
        <Button type="submit" />
      )}
    </form>
  );
}

export default PostulantsForm;
