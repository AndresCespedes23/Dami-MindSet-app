import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOnePostulant } from 'redux/Postulants/thunks';
import Button from 'Components/Shared/Button';
import style from './profile.module.css';

function Profile() {
  const postulant = useSelector((state) => state.postulants.postulant);
  const dispatch = useDispatch();
  //personal information

  useEffect(() => {
    dispatch(getOnePostulant('61afbc5bfc13ae06eb0005dd'));
    console.log(postulant);
    console.log('education' + postulant.education);
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
          <Button type={'back'} />
          <h2>Profile</h2>
          <span></span>
        </div>
        <div className={style.box}>
          <div className={style.subtitle}>
            <h3>About me</h3>
            <Button type={'editInfo'} />
          </div>
          <div>
            <p>Desription</p>
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
        {/* <div>
          <h3>EDUCATION</h3>
          {postulant.education.map((education) => console.log(education))}
        </div>
         // VER COMO SELECCIONO EL LEVEL EN LA LINEA 86
            return (
              <div key={education._id}>
                <h4>{education.level}</h4>
                <div>
                  <p>Name of the institution:</p>
                  <span>{education.institution}</span>
                </div>
                <div>
                  <p>Speciality:</p>
                  <span>{education.title}</span>
                </div>
                <div>
                  <p>Start Year:</p>
                  <span>
                    {education.startDate ? education.startDate.split('T')[0] : 'not espicified'}
                  </span>
                </div>
                <div>
                  <p>End year:</p>
                  <span>
                    {education.finishDate ? education.finishDate.split('T')[0] : 'not espicified'}{' '}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
        <div>
          <h3>WORK-EXPERIENCE</h3>
          <div>
            {postulant.workExperience.map((experience) => {
              return (
                <div key={experience._id}>
                  <div>
                    <p>Company:</p>
                    <span>{experience.company}</span>
                  </div>
                  <div>
                    <p>Role:</p>
                    <span>{experience.role}</span>
                  </div>
                  <div>
                    <p>Start date:</p>
                    <span>{experience.startDate.split('T')[0]}</span>
                  </div>
                  <div>
                    <p>End Date</p>
                    <span>{experience.finishDate.split('T')[0]}</span>
                  </div>
                  <div>
                    <p>What did you do?:</p>
                    <span>{experience.description}</span>
                  </div>
                  <div>
                    <p>Biggest Accomplishments:</p>
                    <span>{experience.accomplishments}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>*/}
        <div>
          <h3>OTHER INFORMATION</h3>
          <div>
            <p>Nationality:</p>
            <span>{postulant.nationality}</span>
          </div>
          <div>
            <p>ID Number:</p>
            <span>{postulant.dni}</span>
          </div>
          <div>
            <p>Martial Status:</p>
            <span>{postulant.maritalStatus}</span>
          </div>
          <div>
            <p>Drivers license:</p>
            <span>{postulant.driversLicense ? 'Yes' : 'No'}</span>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Profile;
