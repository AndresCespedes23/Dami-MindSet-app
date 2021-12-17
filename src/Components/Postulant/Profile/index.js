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

  return (
    <section>
      <div>
        <Button type={'back'} text={'BACK'} />
        <h2>Profile</h2>
      </div>
      <div>
        <div>
          <p>About me</p>
          <div>Edit</div>
        </div>
        <div>DESCRIPCIÓN de dónde sacaba esto manolo</div>
      </div>
      <div>
        <div>
          <h3>PERSONAL INFORMATION</h3>
          <div>Edit</div>
        </div>
        <p>Name: </p>
        <span>{postulant.name}</span>
      </div>
    </section>
  );
}

export default Profile;
