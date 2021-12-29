import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOnePostulant } from 'redux/Postulants/thunks';
import Button from 'Components/Shared/Button';
import style from './postulantProfile.module.css';
import Spinner from 'Components/Shared/Spinner';
import { useHistory, useParams } from 'react-router-dom';

function PostulantProfile() {
  const postulant = useSelector((store) => store.postulants.postulant);
  const isLoading = useSelector((store) => store.postulants.isLoading);
  const { id } = useParams();
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getOnePostulant(id)).then((response) => {
      console.log(postulant);
      console.log(response);
      if (response) {
        history.push('/psychologist/postulants/search');
      }
      //   if(Object.keys(postulant).length !== 0 && !isLoadingForm) REDIRECT to search postulant?
    });
  }, [dispatch]);

  const getAge = (date) => {
    let today = new Date().getFullYear();
    let year = date.split('-')[0];
    return today - year;
  };

  if (isLoading) return <Spinner type="ThreeDots" color="#002147" height={80} width={80} />;

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
              className={
                postulant.status === 'ACTIVE'
                  ? style.statusActive
                  : postulant.status === 'INACTIVE'
                  ? style.statusInactive
                  : style.statusPending
              }
            >
              {postulant.status}
            </p>
          </div>
          <div></div>
        </div>
        <div className={style.box}>
          <div className={style.subtitle}>
            <h4>About</h4>
          </div>
          <div>
            <span>{postulant.description}</span>
          </div>
        </div>
        <div className={style.box}>
          <div className={style.subtitle}>
            <h3>PERSONAL INFORMATION</h3>
          </div>
          <div className={style.boxinfo}>
            <div>
              <h4>Name:</h4>
              <span>{postulant.name}</span>
            </div>
            <div>
              <h4>Username:</h4>
              <span>{postulant.username}</span>
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
        <h3>EDUCATION</h3>
        <div className={style.box}>
          {postulant.education?.map((data) => {
            return (
              <div key={data._id} className={style.box}>
                <div className={style.subtitle}>
                  <h5>{`${data.level} Education`}</h5>
                </div>
                <div className={style.boxinfo}>
                  <div>
                    <h4>Name of the institution:</h4>
                    <span>{data.institution}</span>
                  </div>
                  <div>
                    <h4>Speciality:</h4>
                    <span>{data.title}</span>
                  </div>
                  <div>
                    <h4>Start year:</h4>
                    <span>{data.startDate.split('T')[0]}</span>
                  </div>
                  <div>
                    <h4>End year:</h4>
                    <span>{data.finishDate.split('T')[0]}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <h3>WORK-EXPERIENCE</h3>
        <div className={style.box}>
          {postulant.workExperience?.map((data) => {
            return (
              <div key={data._id} className={style.box}>
                <div className={style.subtitle}>
                  <h5>{`${data.role} in ${data.company}`}</h5>
                </div>
                <div className={style.workExperience}>
                  <div>
                    <span>
                      {`Since ${data.startDate.split('T')[0]} to ${data.finishDate.split('T')[0]}`}
                    </span>
                  </div>
                  <div>
                    <h4>What did you do?:</h4>
                    <span>{data.description}</span>
                  </div>
                  <div>
                    <h4>Biggest Accomplishments:</h4>
                    <span>{data.accomplishments}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={style.box}>
          <div className={style.subtitle}>
            <h3>OTHER INFORMATION</h3>
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

export default PostulantProfile;
