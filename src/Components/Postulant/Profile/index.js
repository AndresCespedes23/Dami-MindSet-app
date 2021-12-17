import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOnePostulant } from 'redux/Postulants/thunks';
import Button from 'Components/Shared/Button';
// import styles from './profile.modile.css';

function Profile() {
  const postulant = useSelector((state) => state.postulants.postulant);
  const dispatch = useDispatch();
  //personal information

  useEffect(() => {
    dispatch(getOnePostulant('61afbc5bfc13ae06eb0005dd'));
  }, [dispatch]);

  const getAge = (date) => {
    let today = new Date().getFullYear();
    let year = date.split('-')[0];
    return today - year;
  };

  return (
    <section>
      <div>
        <Button type={'back'} />
        <h2>Profile</h2>
      </div>
      <div>
        <div>
          <p>About me</p>
          <Button type={'editInfo'} />
        </div>
        <div>DESCRIPCIÓN de dónde sacaba esto manolo</div>
      </div>
      <div>
        <div>
          <h3>PERSONAL INFORMATION</h3>
          <Button type={'editInfo'} />
        </div>
        <div>
          <div>
            <p>Name:</p>
            <span>{postulant.name}</span>
          </div>
          <div>
            <p>Surname:</p>
            <span>{postulant.surname}</span>
          </div>
          <div>
            <p>Email</p>
            <span>{postulant.email}</span>
          </div>
          <div>
            <p>Date of birth:</p>
            <span>{postulant.dateOfBirth ? postulant.dateOfBirth.split('T')[0] : ''}</span>
          </div>
          <div>
            <p>Age:</p>
            <span>{postulant.dateOfBirth ? getAge(postulant.dateOfBirth) : ''}</span>
          </div>
          <div>
            <p>Phone number:</p>
            <span>{postulant.phoneNumber}</span>
          </div>
          <div>
            <p>Address:</p>
            <span>{postulant.address}</span>
          </div>
          <div>
            <p>City:</p>
            <span>{postulant.city}</span>
          </div>
          <div>
            <p>Postal Code:</p>
            <span>{postulant.zipCode}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
