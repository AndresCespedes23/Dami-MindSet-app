import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOnePostulant, updatePostulant } from 'redux/Postulants/thunks';
import { setShowModal, setModalType } from 'redux/Postulants/actions';
import Button from 'Components/Shared/Button';
import style from './profile.module.css';
import Spinner from 'Components/Shared/Spinner';
import Modal from 'Components/Postulant/Profile/Modal';
import { useHistory } from 'react-router-dom';

function Profile() {
  const [idActive, setIdActive] = useState('');
  const postulant = useSelector((store) => store.postulants.postulant);
  const showModal = useSelector((state) => state.postulants.showModal);
  const modalType = useSelector((state) => state.postulants.modalType);
  const isLoading = useSelector((store) => store.postulants.isLoading);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getOnePostulant(sessionStorage.getItem('id')));
  }, [dispatch]);

  const getAge = (date) => {
    let today = new Date().getFullYear();
    let year = date.split('-')[0];
    return today - year;
  };
  const isChecked = (key) => {
    return postulant.availability?.some((element) => element.key === key);
  };

  const handleClickUpdateAboutMe = (id) => {
    dispatch(setModalType('about'));
    setIdActive(id);
    dispatch(setShowModal(true));
  };
  const handleUpdateAboutMe = (newPostulant) => {
    dispatch(updatePostulant(newPostulant, idActive)).then(() => {
      dispatch(getOnePostulant(sessionStorage.getItem('id')));
    });
  };
  const handleClickUpdatePersonalInfo = (id) => {
    dispatch(setModalType('personalInfo'));
    setIdActive(id);
    dispatch(setShowModal(true));
  };
  const handleUpdatePostulants = (postulant) => {
    dispatch(updatePostulant(postulant, idActive)).then(() => {
      dispatch(getOnePostulant(sessionStorage.getItem('id')));
    });
  };
  const handleClickUpdateEducation = (id) => {
    dispatch(setModalType('education'));
    setIdActive(id);
    dispatch(setShowModal(true));
  };
  const handleUpdateEducation = (education, idEducation) => {
    const index = postulant.education.findIndex((x) => x._id == idEducation);
    postulant.education[index] = education;
    dispatch(updatePostulant(postulant, idActive)).then(() => {
      dispatch(getOnePostulant(sessionStorage.getItem('id')));
    });
  };
  const handleClickUpdateWork = (id) => {
    dispatch(setModalType('work'));
    setIdActive(id);
    dispatch(setShowModal(true));
  };
  const handleUpdateWork = (work, idWork) => {
    const index = postulant.workExperience.findIndex((x) => x._id == idWork);
    postulant.workExperience[index] = work;
    dispatch(updatePostulant(postulant, idActive)).then(() => {
      dispatch(getOnePostulant(sessionStorage.getItem('id')));
    });
  };
  const handleClickUpdateCourses = (id) => {
    dispatch(setModalType('courses'));
    setIdActive(id);
    dispatch(setShowModal(true));
  };
  const handleUpdateCourse = (course, idCourse) => {
    const index = postulant.courses.findIndex((x) => x._id == idCourse);
    index !== -1 ? (postulant.courses[index] = course) : postulant.courses.push(course);
    dispatch(updatePostulant(postulant, idActive)).then(() => {
      dispatch(getOnePostulant(sessionStorage.getItem('id')));
    });
  };
  const handleClickUpdateOtherInfo = (id) => {
    dispatch(setModalType('otherInfo'));
    setIdActive(id);
    dispatch(setShowModal(true));
  };
  const handleUpdateOtherInfo = (postulant) => {
    dispatch(updatePostulant(postulant, idActive)).then(() => {
      dispatch(getOnePostulant(sessionStorage.getItem('id')));
    });
  };
  const handleClickUpdateAvailability = (id) => {
    dispatch(setModalType('availability'));
    setIdActive(id);
    dispatch(setShowModal(true));
  };
  const handleUpdateAvailability = (postulant) => {
    dispatch(updatePostulant(postulant, idActive)).then(() => {
      dispatch(getOnePostulant(sessionStorage.getItem('id')));
    });
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
            <Button type={'back'} onClick={() => history.push('/postulants/home')} />
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
                      {`Since ${data.startDate?.split('T')[0]} to ${
                        data.finishDate?.split('T')[0]
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
        <div className={style.box}>
          <div className={style.subtitle}>
            <h3>AVAILABILITY</h3>
            <Button
              type={'editInfo'}
              onClick={() => handleClickUpdateAvailability(postulant._id)}
            />
          </div>
          <div className={style.boxinfo}>
            <table border="1" className={style.tableSummary}>
              <thead>
                <tr>
                  <td>Day</td>
                  <td>Monday</td>
                  <td>Tuesday</td>
                  <td>Wednesday</td>
                  <td>Thursday</td>
                  <td>Friday</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>06:00</td>
                  <td>
                    <input
                      key="1"
                      type="checkbox"
                      id="monday-06"
                      value="monday-06"
                      disabled
                      checked={isChecked('monday-06')}
                    />
                  </td>
                  <td>
                    <input
                      key="2"
                      type="checkbox"
                      id="tuesday-06"
                      value="tuesday-06"
                      disabled
                      checked={isChecked('tuesday-06')}
                    />
                  </td>
                  <td>
                    <input
                      key="3"
                      type="checkbox"
                      id="wednesday-06"
                      value="wednesday-06"
                      disabled
                      checked={isChecked('wednesday-06')}
                    />
                  </td>
                  <td>
                    <input
                      key="4"
                      type="checkbox"
                      id="thursday-06"
                      value="thursday-06"
                      disabled
                      checked={isChecked('thursday-06')}
                    />
                  </td>
                  <td>
                    <input
                      key="5"
                      type="checkbox"
                      id="friday-06"
                      value="friday-06"
                      disabled
                      checked={isChecked('friday-06')}
                    />
                  </td>
                </tr>
                <tr>
                  <td>07:00</td>
                  <td>
                    <input
                      key="6"
                      type="checkbox"
                      id="monday-07"
                      value="monday-07"
                      disabled
                      checked={isChecked('monday-07')}
                    />
                  </td>
                  <td>
                    <input
                      key="7"
                      type="checkbox"
                      id="tuesday-07"
                      value="tuesday-07"
                      disabled
                      checked={isChecked('tuesday-07')}
                    />
                  </td>
                  <td>
                    <input
                      key="8"
                      type="checkbox"
                      id="wednesday-07"
                      value="wednesday-07"
                      disabled
                      checked={isChecked('wednesday-07')}
                    />
                  </td>
                  <td>
                    <input
                      key="9"
                      type="checkbox"
                      id="thursday-07"
                      value="thursday-07"
                      disabled
                      checked={isChecked('thursday-07')}
                    />
                  </td>
                  <td>
                    <input
                      key="10"
                      type="checkbox"
                      id="friday-07"
                      value="friday-07"
                      disabled
                      checked={isChecked('friday-07')}
                    />
                  </td>
                </tr>
                <tr>
                  <td>08:00</td>
                  <td>
                    <input
                      key="11"
                      type="checkbox"
                      id="monday-08"
                      value="monday-08"
                      disabled
                      checked={isChecked('monday-08')}
                    />
                  </td>
                  <td>
                    <input
                      key="12"
                      type="checkbox"
                      id="tuesday-08"
                      value="tuesday-08"
                      disabled
                      checked={isChecked('tuesday-08')}
                    />
                  </td>
                  <td>
                    <input
                      key="13"
                      type="checkbox"
                      id="wednesday-08"
                      value="wednesday-08"
                      disabled
                      checked={isChecked('wednesday-08')}
                    />
                  </td>
                  <td>
                    <input
                      key="14"
                      type="checkbox"
                      id="thursday-08"
                      value="thursday-08"
                      disabled
                      checked={isChecked('thursday-08')}
                    />
                  </td>
                  <td>
                    <input
                      key="15"
                      type="checkbox"
                      id="friday-08"
                      value="friday-08"
                      disabled
                      checked={isChecked('friday-08')}
                    />
                  </td>
                </tr>
                <tr>
                  <td>09:00</td>
                  <td>
                    <input
                      key="16"
                      type="checkbox"
                      id="monday-09"
                      value="monday-09"
                      disabled
                      checked={isChecked('monday-09')}
                    />
                  </td>
                  <td>
                    <input
                      key="17"
                      type="checkbox"
                      id="tuesday-09"
                      value="tuesday-09"
                      disabled
                      checked={isChecked('tuesday-09')}
                    />
                  </td>
                  <td>
                    <input
                      key="18"
                      type="checkbox"
                      id="wednesday-09"
                      value="wednesday-09"
                      disabled
                      checked={isChecked('wednesday-09')}
                    />
                  </td>
                  <td>
                    <input
                      key="19"
                      type="checkbox"
                      id="thursday-09"
                      value="thursday-09"
                      disabled
                      checked={isChecked('thursday-09')}
                    />
                  </td>
                  <td>
                    <input
                      key="20"
                      type="checkbox"
                      id="friday-09"
                      value="friday-09"
                      disabled
                      checked={isChecked('friday-09')}
                    />
                  </td>
                </tr>
                <tr>
                  <td>10:00</td>
                  <td>
                    <input
                      key="21"
                      type="checkbox"
                      id="monday-10"
                      value="monday-10"
                      disabled
                      checked={isChecked('monday-10')}
                    />
                  </td>
                  <td>
                    <input
                      key="22"
                      type="checkbox"
                      id="tuesday-10"
                      value="tuesday-10"
                      disabled
                      checked={isChecked('tuesday-10')}
                    />
                  </td>
                  <td>
                    <input
                      key="23"
                      type="checkbox"
                      id="wednesday-10"
                      value="wednesday-10"
                      disabled
                      checked={isChecked('wednesday-10')}
                    />
                  </td>
                  <td>
                    <input
                      key="24"
                      type="checkbox"
                      id="thursday-10"
                      value="thursday-10"
                      disabled
                      checked={isChecked('thursday-10')}
                    />
                  </td>
                  <td>
                    <input
                      key="25"
                      type="checkbox"
                      id="friday-10"
                      value="friday-10"
                      disabled
                      checked={isChecked('friday-10')}
                    />
                  </td>
                </tr>
                <tr>
                  <td>11:00</td>
                  <td>
                    <input
                      key="26"
                      type="checkbox"
                      id="monday-11"
                      value="monday-11"
                      disabled
                      checked={isChecked('monday-11')}
                    />
                  </td>
                  <td>
                    <input
                      key="27"
                      type="checkbox"
                      id="tuesday-11"
                      value="tuesday-11"
                      disabled
                      checked={isChecked('tuesday-11')}
                    />
                  </td>
                  <td>
                    <input
                      key="28"
                      type="checkbox"
                      id="wednesday-11"
                      value="wednesday-11"
                      disabled
                      checked={isChecked('wednesday-11')}
                    />
                  </td>
                  <td>
                    <input
                      key="29"
                      type="checkbox"
                      id="thursday-11"
                      value="thursday-11"
                      disabled
                      checked={isChecked('thursday-11')}
                    />
                  </td>
                  <td>
                    <input
                      key="30"
                      type="checkbox"
                      id="friday-11"
                      value="friday-11"
                      disabled
                      checked={isChecked('friday-11')}
                    />
                  </td>
                </tr>
                <tr>
                  <td>12:00</td>
                  <td>
                    <input
                      key="31"
                      type="checkbox"
                      id="monday-12"
                      value="monday-12"
                      disabled
                      checked={isChecked('monday-12')}
                    />
                  </td>
                  <td>
                    <input
                      key="32"
                      type="checkbox"
                      id="tuesday-12"
                      value="tuesday-12"
                      disabled
                      checked={isChecked('tuesday-12')}
                    />
                  </td>
                  <td>
                    <input
                      key="33"
                      type="checkbox"
                      id="wednesday-12"
                      value="wednesday-12"
                      disabled
                      checked={isChecked('wednesday-12')}
                    />
                  </td>
                  <td>
                    <input
                      key="34"
                      type="checkbox"
                      id="thursday-12"
                      value="thursday-12"
                      disabled
                      checked={isChecked('thursday-12')}
                    />
                  </td>
                  <td>
                    <input
                      key="35"
                      type="checkbox"
                      id="friday-12"
                      value="friday-12"
                      disabled
                      checked={isChecked('friday-12')}
                    />
                  </td>
                </tr>
                <tr>
                  <td>13:00</td>
                  <td>
                    <input
                      key="36"
                      type="checkbox"
                      id="monday-13"
                      value="monday-13"
                      disabled
                      checked={isChecked('monday-13')}
                    />
                  </td>
                  <td>
                    <input
                      key="37"
                      type="checkbox"
                      id="tuesday-13"
                      value="tuesday-13"
                      disabled
                      checked={isChecked('tuesday-13')}
                    />
                  </td>
                  <td>
                    <input
                      key="38"
                      type="checkbox"
                      id="wednesday-13"
                      value="wednesday-13"
                      disabled
                      checked={isChecked('wednesday-13')}
                    />
                  </td>
                  <td>
                    <input
                      key="39"
                      type="checkbox"
                      id="thursday-13"
                      value="thursday-13"
                      disabled
                      checked={isChecked('thursday-13')}
                    />
                  </td>
                  <td>
                    <input
                      key="40"
                      type="checkbox"
                      id="friday-13"
                      value="friday-13"
                      disabled
                      checked={isChecked('friday-13')}
                    />
                  </td>
                </tr>
                <tr>
                  <td>14:00</td>
                  <td>
                    <input
                      key="41"
                      type="checkbox"
                      id="monday-14"
                      value="monday-14"
                      disabled
                      checked={isChecked('monday-14')}
                    />
                  </td>
                  <td>
                    <input
                      key="42"
                      type="checkbox"
                      id="tuesday-14"
                      value="tuesday-14"
                      disabled
                      checked={isChecked('tuesday-14')}
                    />
                  </td>
                  <td>
                    <input
                      key="43"
                      type="checkbox"
                      id="wednesday-14"
                      value="wednesday-14"
                      disabled
                      checked={isChecked('wednesday-14')}
                    />
                  </td>
                  <td>
                    <input
                      key="44"
                      type="checkbox"
                      id="thursday-14"
                      value="thursday-14"
                      disabled
                      checked={isChecked('thursday-14')}
                    />
                  </td>
                  <td>
                    <input
                      key="45"
                      type="checkbox"
                      id="friday-14"
                      value="friday-14"
                      disabled
                      checked={isChecked('friday-14')}
                    />
                  </td>
                </tr>
                <tr>
                  <td>15:00</td>
                  <td>
                    <input
                      key="46"
                      type="checkbox"
                      id="monday-15"
                      value="monday-15"
                      disabled
                      checked={isChecked('monday-15')}
                    />
                  </td>
                  <td>
                    <input
                      key="47"
                      type="checkbox"
                      id="tuesday-15"
                      value="tuesday-15"
                      disabled
                      checked={isChecked('tuesday-15')}
                    />
                  </td>
                  <td>
                    <input
                      key="48"
                      type="checkbox"
                      id="wednesday-15"
                      value="wednesday-15"
                      disabled
                      checked={isChecked('wednesday-15')}
                    />
                  </td>
                  <td>
                    <input
                      key="49"
                      type="checkbox"
                      id="thursday-15"
                      value="thursday-15"
                      disabled
                      checked={isChecked('thursday-15')}
                    />
                  </td>
                  <td>
                    <input
                      key="50"
                      type="checkbox"
                      id="friday-15"
                      value="friday-15"
                      disabled
                      checked={isChecked('friday-15')}
                    />
                  </td>
                </tr>
                <tr>
                  <td>16:00</td>
                  <td>
                    <input
                      key="51"
                      type="checkbox"
                      id="monday-16"
                      value="monday-16"
                      disabled
                      checked={isChecked('monday-16')}
                    />
                  </td>
                  <td>
                    <input
                      key="52"
                      type="checkbox"
                      id="tuesday-16"
                      value="tuesday-16"
                      disabled
                      checked={isChecked('tuesday-16')}
                    />
                  </td>
                  <td>
                    <input
                      key="53"
                      type="checkbox"
                      id="wednesday-16"
                      value="wednesday-16"
                      disabled
                      checked={isChecked('wednesday-16')}
                    />
                  </td>
                  <td>
                    <input
                      key="54"
                      type="checkbox"
                      id="thursday-16"
                      value="thursday-16"
                      disabled
                      checked={isChecked('thursday-16')}
                    />
                  </td>
                  <td>
                    <input
                      key="55"
                      type="checkbox"
                      id="friday-16"
                      value="friday-16"
                      disabled
                      checked={isChecked('friday-16')}
                    />
                  </td>
                </tr>
                <tr>
                  <td>17:00</td>
                  <td>
                    <input
                      key="56"
                      type="checkbox"
                      id="monday-17"
                      value="monday-17"
                      disabled
                      checked={isChecked('monday-17')}
                    />
                  </td>
                  <td>
                    <input
                      key="57"
                      type="checkbox"
                      id="tuesday-17"
                      value="tuesday-17"
                      disabled
                      checked={isChecked('tuesday-17')}
                    />
                  </td>
                  <td>
                    <input
                      key="58"
                      type="checkbox"
                      id="wednesday-17"
                      value="wednesday-17"
                      disabled
                      checked={isChecked('wednesday-17')}
                    />
                  </td>
                  <td>
                    <input
                      key="59"
                      type="checkbox"
                      id="thursday-17"
                      value="thursday-17"
                      disabled
                      checked={isChecked('thursday-17')}
                    />
                  </td>
                  <td>
                    <input
                      key="60"
                      type="checkbox"
                      id="friday-17"
                      value="friday-17"
                      disabled
                      checked={isChecked('friday-17')}
                    />
                  </td>
                </tr>
                <tr>
                  <td>18:00</td>
                  <td>
                    <input
                      key="61"
                      type="checkbox"
                      id="monday-18"
                      value="monday-18"
                      disabled
                      checked={isChecked('monday-18')}
                    />
                  </td>
                  <td>
                    <input
                      key="62"
                      type="checkbox"
                      id="tuesday-18"
                      value="tuesday-18"
                      disabled
                      checked={isChecked('tuesday-18')}
                    />
                  </td>
                  <td>
                    <input
                      key="63"
                      type="checkbox"
                      id="wednesday-18"
                      value="wednesday-18"
                      disabled
                      checked={isChecked('wednesday-18')}
                    />
                  </td>
                  <td>
                    <input
                      key="64"
                      type="checkbox"
                      id="thursday-18"
                      value="thursday-18"
                      disabled
                      checked={isChecked('thursday-18')}
                    />
                  </td>
                  <td>
                    <input
                      key="65"
                      type="checkbox"
                      id="friday-18"
                      value="friday-18"
                      disabled
                      checked={isChecked('friday-18')}
                    />
                  </td>
                </tr>
                <tr>
                  <td>19:00</td>
                  <td>
                    <input
                      key="66"
                      type="checkbox"
                      id="monday-19"
                      value="monday-19"
                      disabled
                      checked={isChecked('monday-19')}
                    />
                  </td>
                  <td>
                    <input
                      key="67"
                      type="checkbox"
                      id="tuesday-19"
                      value="tuesday-19"
                      disabled
                      checked={isChecked('tuesday-19')}
                    />
                  </td>
                  <td>
                    <input
                      key="68"
                      type="checkbox"
                      id="wednesday-19"
                      value="wednesday-19"
                      disabled
                      checked={isChecked('wednesday-19')}
                    />
                  </td>
                  <td>
                    <input
                      key="69"
                      type="checkbox"
                      id="thursday-19"
                      value="thursday-19"
                      disabled
                      checked={isChecked('thursday-19')}
                    />
                  </td>
                  <td>
                    <input
                      key="70"
                      type="checkbox"
                      id="friday-19"
                      value="friday-19"
                      disabled
                      checked={isChecked('friday-19')}
                    />
                  </td>
                </tr>
                <tr>
                  <td>20:00</td>
                  <td>
                    <input
                      key="71"
                      type="checkbox"
                      id="monday-20"
                      value="monday-20"
                      disabled
                      checked={isChecked('monday-20')}
                    />
                  </td>
                  <td>
                    <input
                      key="72"
                      type="checkbox"
                      id="tuesday-20"
                      value="tuesday-20"
                      disabled
                      checked={isChecked('tuesday-20')}
                    />
                  </td>
                  <td>
                    <input
                      key="73"
                      type="checkbox"
                      id="wednesday-20"
                      value="wednesday-20"
                      disabled
                      checked={isChecked('wednesday-20')}
                    />
                  </td>
                  <td>
                    <input
                      key="74"
                      type="checkbox"
                      id="thursday-20"
                      value="thursday-20"
                      disabled
                      checked={isChecked('thursday-20')}
                    />
                  </td>
                  <td>
                    <input
                      key="75"
                      type="checkbox"
                      id="friday-20"
                      value="friday-20"
                      disabled
                      checked={isChecked('friday-20')}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal
          handleShowModal={handleShowModal}
          modalType={modalType}
          handleSubmit={
            modalType === 'education'
              ? handleUpdateEducation
              : modalType === 'about'
              ? handleUpdateAboutMe
              : modalType === 'work'
              ? handleUpdateWork
              : modalType === 'courses'
              ? handleUpdateCourse
              : modalType === 'otherInfo'
              ? handleUpdateOtherInfo
              : modalType === 'availability'
              ? handleUpdateAvailability
              : handleUpdatePostulants
          }
          meta={idActive}
        />
      )}
    </section>
  );
}

export default Profile;
