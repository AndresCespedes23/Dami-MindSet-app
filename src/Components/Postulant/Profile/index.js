import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOnePostulant } from 'redux/Postulants/thunks';
import Button from 'Components/Shared/Button';
import style from './profile.module.css';

function Profile() {
  const postulant = useSelector((state) => state.postulants.postulant);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOnePostulant('61afbc5bfc13ae06eb0005dd'));
  }, [dispatch]);

  const getAge = (date) => {
    let today = new Date().getFullYear();
    let year = date.split('-')[0];
    return today - year;
  };

  return (
    <section className={style.container}>
      <div className={style.profile}>
        <div className={style.header}>
          <div>
            <Button type={'back'} />
          </div>
          <div className={style.headercolumn}>
            <h2>Profile</h2>
            <img
              className={style.loginphoto}
              src={`${process.env.PUBLIC_URL}/assets/images/nophotouser.png`}
            />
            <h4>{postulant.name}</h4>
            <span>Status</span>
            <p
              className={postulant.status === 'ACTIVE' ? style.statusActive : style.statusInactive}
            >
              {postulant.status}
            </p>
          </div>
          <div></div>
        </div>
        <div className={style.box}>
          <div className={style.subtitle}>
            <h4>About me</h4>
            <Button type={'editInfo'} />
          </div>
          <div>
            <span>{postulant.description}</span>
          </div>
        </div>
        <div className={style.box}>
          <div className={style.subtitle}>
            <h3>PERSONAL INFORMATION</h3>
            <Button type={'editInfo'} />
          </div>
          <div className={style.boxinfo}>
            <div>
              <h4>Name:</h4>
              <span>{postulant.name}</span>
            </div>
            <div>
              <h4>Surname:</h4>
              <span>{postulant.surname}</span>
            </div>
            <div>
              <h4>Email</h4>
              <span>{postulant.email}</span>
            </div>
            <div>
              <h4>Date of birth:</h4>
              <span>{postulant.dateOfBirth ? postulant.dateOfBirth.split('T')[0] : ''}</span>
            </div>
            <div>
              <h4>Age:</h4>
              <span>{postulant.dateOfBirth ? getAge(postulant.dateOfBirth) : ''}</span>
            </div>
            <div>
              <h4>Phone number:</h4>
              <span>{postulant.phoneNumber}</span>
            </div>
            <div>
              <h4>Address:</h4>
              <span>{postulant.address}</span>
            </div>
            <div>
              <h4>City:</h4>
              <span>{postulant.city}</span>
            </div>
            <div>
              <h4>Postal Code:</h4>
              <span>{postulant.zipCode}</span>
            </div>
          </div>
        </div>
        <div className={style.subtitle}>
          <h3>EDUCATION</h3>
          <Button type={'editInfo'} />
        </div>
        <div className={style.box}>
          <div className={style.subtitle}>
            <h4>{`${postulant.education.level} Education`}</h4>
            <Button type={'editInfo'} />
          </div>
          <div className={style.boxinfo}>
            <div>
              <h4>Name of the institution:</h4>
              <span>{postulant.education.institution}</span>
            </div>
            <div>
              <h4>Speciality:</h4>
              <span>{postulant.education.title}</span>
            </div>
            <div>
              <h4>Start Year:</h4>
              <span>
                {postulant.education.startDate
                  ? postulant.education.startDate.split('T')[0]
                  : 'not espicified'}
              </span>
            </div>
            <div>
              <h4>End year:</h4>
              <span>
                {postulant.education.finishDate
                  ? postulant.education.finishDate.split('T')[0]
                  : 'not espicified'}{' '}
              </span>
            </div>
          </div>
        </div>
        <div className={style.subtitle}>
          <h3>WORK-EXPERIENCE</h3>
          <Button type={'editInfo'} />
        </div>
        {/*<div className={style.box}>
          {postulant.workExperience.map((experience) => {
            return (
            <div key={experience._id} className={style.subtitle}>
              <div className={style.subtitle}>
                <h4>`Role as ${experience.role} in ${experience.company}`</h4>
                <Button type={'editInfo'} />
              </div>
              <div className={style.boxinfo}>
                <div>
                  <h4>Start date:</h4>
                  <span>{experience.startDate.split('T')[0]}</span>
                </div>
                <div>
                  <h4>End Date</h4>
                  <span>{experience.finishDate.split('T')[0]}</span>
                </div>
              </div>
              <div>
                <h4>What did you do?:</h4>
                <span>{experience.description}</span>
              </div>
              <div>
                <h4>Biggest Accomplishments:</h4>
                <span>{experience.accomplishments}</span>
              </div>
            </div>
            );
          })}
        </div> */}
        <div className={style.box}>
          <div className={style.subtitle}>
            <h3>OTHER INFORMATION</h3>
            <Button type={'editInfo'} />
          </div>
          <div className={style.boxinfo}>
            <div>
              <h4>Nationality:</h4>
              <span>{postulant.nationality}</span>
            </div>
            <div>
              <h4>ID Number:</h4>
              <span>{postulant.dni}</span>
            </div>
            <div>
              <h4>Martial Status:</h4>
              <span>{postulant.maritalStatus}</span>
            </div>
            <div>
              <h4>Drivers license:</h4>
              <span>{postulant.driversLicense ? 'Yes' : 'No'}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
