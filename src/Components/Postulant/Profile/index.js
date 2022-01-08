import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOnePostulant, updatePostulant, updateEducation } from 'redux/Postulants/thunks';
import { setShowModal, setModalType } from 'redux/Postulants/actions';
import Button from 'Components/Shared/Button';
import style from './profile.module.css';
import Spinner from 'Components/Shared/Spinner';
import Modal from 'Components/Postulant/Profile/Modal';

function Profile() {
  const [idActive, setIdActive] = useState('');
  const postulant = useSelector((store) => store.postulants.postulant);
  const showModal = useSelector((state) => state.postulants.showModal);
  const modalType = useSelector((state) => state.postulants.modalType);
  const isLoading = useSelector((store) => store.postulants.isLoading);
  const dispatch = useDispatch();
  //'61cdb8aacb6158d321969398'
  useEffect(() => {
    dispatch(getOnePostulant('61cdb8aacb6158d321969398' /*sessionStorage.getItem('id')*/));
  }, [dispatch]);

  const getAge = (date) => {
    let today = new Date().getFullYear();
    let year = date.split('-')[0];
    return today - year;
  };

  const handleUpdatePostulants = (postulant) => {
    dispatch(updatePostulant(postulant, idActive)).then(() => {
      dispatch(getOnePostulant('61cdb8aacb6158d321969398' /*sessionStorage.getItem('id')*/));
    });
  };

  const handleUpdateEducation = (postulant) => {
    dispatch(updateEducation(postulant, idActive)).then(() => {
      dispatch(getOnePostulant('61cdb8aacb6158d321969398' /*sessionStorage.getItem('id')*/));
    });
  };

  const handleClickUpdateAboutMe = (id) => {
    dispatch(setModalType('about'));
    setIdActive(id);
    dispatch(setShowModal(true));
  };

  const handleClickUpdatePersonalInfo = (id) => {
    dispatch(setModalType('personal info'));
    setIdActive(id);
    dispatch(setShowModal(true));
  };

  const handleClickUpdateEducation = (id) => {
    dispatch(setModalType('education'));
    setIdActive(id);
    dispatch(setShowModal(true));
  };

  const handleClickUpdateWork = (id) => {
    dispatch(setModalType('work'));
    setIdActive(id);
    dispatch(setShowModal(true));
  };

  const handleClickUpdateCourses = (id) => {
    dispatch(setModalType('courses'));
    setIdActive(id);
    dispatch(setShowModal(true));
  };

  const handleClickUpdateOtherInfo = (id) => {
    dispatch(setModalType('other info'));
    setIdActive(id);
    dispatch(setShowModal(true));
  };

  const handleShowModal = () => {
    dispatch(setShowModal(false));
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
            <h4>About me</h4>
            <Button type={'editInfo'} onClick={() => handleClickUpdateAboutMe(postulant._id)} />
          </div>
          <div>
            <span>{postulant.description}</span>
          </div>
        </div>
        <div className={style.box}>
          <div className={style.subtitle}>
            <h3>PERSONAL INFORMATION</h3>
            <Button
              type={'editInfo'}
              onClick={() => handleClickUpdatePersonalInfo(postulant._id)}
            />
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
                  <Button
                    type={'editInfo'}
                    onClick={() => handleClickUpdateEducation(postulant._id)}
                  />
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
                  <h5>{`${data?.role} in ${data?.company}`}</h5>
                  <Button type={'editInfo'} onClick={() => handleClickUpdateWork(postulant._id)} />
                </div>
                <div className={style.workExperience}>
                  <div>
                    <span>
                      {`Since ${data?.startDate.split('T')[0]} to ${
                        data?.finishDate.split('T')[0]
                      }`}
                    </span>
                  </div>
                  <div>
                    <h4>What did you do?:</h4>
                    <span>{data?.description}</span>
                  </div>
                  <div>
                    <h4>Biggest Accomplishments:</h4>
                    <span>{data?.accomplishments}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <h3>COURSES</h3>
        <div className={style.box}>
          {postulant.courses?.map((data) => {
            return (
              <div key={data._id} className={style.box}>
                <div className={style.subtitle}>
                  <div></div>
                  <Button
                    type={'editInfo'}
                    onClick={() => handleClickUpdateCourses(postulant._id)}
                  />
                </div>
                <div className={style.workExperience}>
                  <div>
                    <h4>Name:</h4>
                    <span>{data?.name}</span>
                  </div>
                  <div>
                    <h4>Organization:</h4>
                    <span>{data?.organization}</span>
                  </div>
                  <div>
                    <h4>Duration:</h4>
                    <span>{data?.duration}</span>
                  </div>
                  <div>
                    <h4>Description:</h4>
                    <span>{data?.description}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <div className={style.box}>
          <div className={style.subtitle}>
            <h3>OTHER INFORMATION</h3>
            <Button type={'editInfo'} onClick={() => handleClickUpdateOtherInfo(postulant._id)} />
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
      {showModal && (
        <Modal
          handleShowModal={handleShowModal}
          modalType={modalType}
          handleSubmit={
            modalType === 'education' && !idActive
              ? () => handleUpdateEducation
              : handleUpdatePostulants
          }
        />
      )}
    </section>
  );
}

export default Profile;
