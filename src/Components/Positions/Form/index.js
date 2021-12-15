import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './form.module.css';
import Spinner from '../../Shared/Spinner';
import Input from '../../Shared/Input';
import Button from '../../Shared/Button';
import { getOnePosition } from '../../../redux/Positions/thunks';
import { getClients } from '../../../redux/Clients/thunks';
import { getProfiles } from '../../../redux/Profiles/thunks';

function PositionsForm({ id, handleSubmit, handleShowModal }) {
  const dispatch = useDispatch();
  const isLoadingForm = useSelector((store) => store.positions.isLoadingForm);
  const clients = useSelector((state) => state.clients.list);
  const profiles = useSelector((state) => state.profiles.list);
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
    dispatch(getClients());
    dispatch(getProfiles());
    if (id) {
      dispatch(getOnePosition(id)).then((data) => {
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
        <select
          name="idClient"
          value={formData.idClient._id}
          disabled={isLoadingForm}
          onChange={handleChange}
        >
          {clients.map((client) => {
            return [
              <option key={client._id} value={client._id}>
                {client.name}
              </option>
            ];
          })}
        </select>
        {error.idClient && <span className={styles.error}>Client is missing</span>}
      </div>
      <div>
        <label>Profile</label>
        <select
          name="idProfile"
          value={formData.idProfile._id}
          disabled={isLoadingForm}
          onChange={handleChange}
        >
          {profiles.map((profile) => {
            return [
              <option key={profile._id} value={profile._id}>
                {profile.name}
              </option>
            ];
          })}
        </select>
        {error.idProfile && <span className={styles.error}>Profile is missing</span>}
      </div>
      <Input
        labelText="Full Name"
        name="name"
        type="text"
        value={formData.name}
        errorMessage="Name is missing"
        error={error.name}
        onChange={handleChange}
        disabled={isLoadingForm}
      />
      <Input
        labelText="Description"
        name="description"
        type="text"
        value={formData.description}
        errorMessage="Description is missing"
        error={error.description}
        onChange={handleChange}
        disabled={isLoadingForm}
      />
      <div>
        <label>Status</label>
        <select
          name="status"
          value={formData.status}
          disabled={isLoadingForm}
          onChange={handleChange}
        >
          <option>DONE</option>
          <option>PENDING</option>
        </select>
        {error.status && <span className={styles.error}>Status is missing</span>}
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
        labelText="ZIP Code"
        name="postalCode"
        type="number"
        value={formData.postalCode}
        errorMessage="Zip Code is missing"
        error={error.postalCode}
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

export default PositionsForm;
