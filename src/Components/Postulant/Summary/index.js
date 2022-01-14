import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOnePostulant } from 'redux/Postulants/thunks.js';
import { setShowModal, setModalType } from 'redux/Postulants/actions';
import {
  setPersonalInfo,
  setEducationInfo,
  setExperienceInfo,
  setOtherInfo,
  setAvailability
} from 'redux/PostulantModule/actions';
import Modal from 'Components/Postulant/Summary/Modal';
import styles from './summary.module.css';
import Button from 'Components/Shared/Button';
import { Link } from 'react-router-dom';
import { registerPostulant } from 'redux/PostulantModule/thunks.js';

function Summary() {
  const postulantData = useSelector((state) => state.postulantModule.postulantData);
  const showModal = useSelector((state) => state.postulants.showModal);
  const modalType = useSelector((state) => state.postulants.modalType);
  const [idActive, setIdActive] = useState('');
  const dispatch = useDispatch();
  const [type, setType] = useState('PERSONAL-INFORMATION');

  useEffect(() => {
    dispatch(getOnePostulant(sessionStorage.getItem('id')));
  }, [dispatch]);

  const handleClickUpdatePersonalInfo = (id) => {
    dispatch(setModalType('personal-info'));
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

  const handleClickUpdateOtherInfo = (id) => {
    dispatch(setModalType('other'));
    setIdActive(id);
    dispatch(setShowModal(true));
  };
  const handleClickUpdateAvailability = (id) => {
    dispatch(setModalType('availability'));
    setIdActive(id);
    dispatch(setShowModal(true));
  };
  const handleUpdatePersonalInfo = (postulantData) => {
    dispatch(setPersonalInfo(postulantData));
  };
  const handleUpdateEducation = (postulantData) => {
    dispatch(setEducationInfo(postulantData.education));
  };
  const handleUpdateWork = (postulantData) => {
    dispatch(setExperienceInfo(postulantData.workExperience));
  };
  const handleUpdateOtherInfo = (postulantData) => {
    dispatch(setOtherInfo(postulantData));
  };
  const handleUpdateAvailability = (postulantData) => {
    dispatch(setAvailability(postulantData.availability));
  };

  const handleShowModal = () => {
    dispatch(setShowModal(false));
  };

  const handleButtonClick = (type) => {
    setType(type);
  };

  const handleRegister = () => {
    dispatch(registerPostulant(postulantData, sessionStorage.getItem('id')));
  };

  const getAge = (date) => {
    let today = new Date().getFullYear();
    let year = date.split('-')[0];
    return today - year;
  };
  const isChecked = (key) => {
    return postulantData.availability.some((element) => element.key === key);
  };
  return (
    <section className={styles.container}>
      <div className={styles.containerSummary}>
        <div className={styles.containerButtons}>
          <button
            className={
              type === 'PERSONAL-INFORMATION' ? styles.btnSectionActive : styles.btnSection
            }
            onClick={() => handleButtonClick('PERSONAL-INFORMATION')}
          >
            Personal Information
          </button>
          <button
            className={type === 'EDUCATION' ? styles.btnSectionActive : styles.btnSection}
            onClick={() => handleButtonClick('EDUCATION')}
          >
            Education
          </button>
          <button
            className={type === 'WORK-EXPERIENCE' ? styles.btnSectionActive : styles.btnSection}
            onClick={() => handleButtonClick('WORK-EXPERIENCE')}
          >
            Work Experience
          </button>
          <button
            className={type === 'OTHER-INFORMATION' ? styles.btnSectionActive : styles.btnSection}
            onClick={() => handleButtonClick('OTHER-INFORMATION')}
          >
            Other Information
          </button>
          <button
            className={type === 'AVAILABILITY' ? styles.btnSectionActive : styles.btnSection}
            onClick={() => handleButtonClick('AVAILABILITY')}
          >
            Availability
          </button>
        </div>
        <div className={styles.containerNav}>
          <h2 className={styles.titleNav}>Summary</h2>
        </div>
        <div className={styles.containerInfo}>
          {(() => {
            switch (type) {
              case 'PERSONAL-INFORMATION':
                return (
                  <div className={styles.containerPersonal}>
                    <div className={styles.itemPersonal}>
                      <h3 className={styles.titlePersonal}>Name:</h3>
                      <span className={styles.infoPersonal}>{postulantData.name}</span>
                    </div>
                    <div className={styles.itemPersonal}>
                      <h3 className={styles.titlePersonal}>Username:</h3>
                      <span className={styles.infoPersonal}>{postulantData.username}</span>
                    </div>
                    <div className={styles.itemPersonalLong}>
                      <h3 className={styles.titlePersonal}>Email:</h3>
                      <span className={styles.infoPersonal}>{postulantData.email}</span>
                    </div>
                    <div className={styles.itemPersonal}>
                      <h3 className={styles.titlePersonal}>Date of birth:</h3>
                      <span className={styles.infoPersonal}>
                        {postulantData.dateOfBirth ? postulantData.dateOfBirth.split('T')[0] : ''}
                      </span>
                    </div>
                    <div className={styles.itemPersonal}>
                      <h3 className={styles.titlePersonal}>Age:</h3>
                      <span className={styles.infoPersonal}>
                        {postulantData.dateOfBirth ? getAge(postulantData.dateOfBirth) : ''}
                      </span>
                    </div>
                    <div className={styles.itemPersonal}>
                      <h3 className={styles.titlePersonal}>Phone number:</h3>
                      <span className={styles.infoPersonal}>{postulantData.phoneNumber}</span>
                    </div>
                    <div className={styles.itemPersonalLong}>
                      <h3 className={styles.titlePersonal}>Address:</h3>
                      <span className={styles.infoPersonal}>{postulantData.address}</span>
                    </div>
                    <div className={styles.itemPersonal}>
                      <h3 className={styles.titlePersonal}>City:</h3>
                      <span className={styles.infoPersonal}>{postulantData.city}</span>
                    </div>
                    <div className={styles.itemPersonal}>
                      <h3 className={styles.titlePersonal}>Postal Code:</h3>
                      <span className={styles.infoPersonal}>{postulantData.zipCode}</span>
                    </div>
                    <Button
                      type={'editInfo'}
                      onClick={() => handleClickUpdatePersonalInfo(postulantData._id)}
                    />
                  </div>
                );
              case 'EDUCATION':
                return (
                  <div>
                    {postulantData.education?.map((education) => {
                      return (
                        <div className={styles.containerPersonal} key={education._id}>
                          <h2 className={styles.titleEducation}>{education.level}</h2>
                          <Button
                            type={'editInfo'}
                            onClick={() => handleClickUpdateEducation(education._id)}
                          />
                          <div className={styles.itemPersonalLong}>
                            <h3 className={styles.titlePersonal}>Name of the institution:</h3>
                            <span className={styles.infoPersonal}>{education.institution}</span>
                          </div>
                          <div className={styles.itemPersonalLong}>
                            <h3 className={styles.titlePersonal}>Speciality:</h3>
                            <span className={styles.infoPersonal}>{education.title}</span>
                          </div>
                          <div className={styles.itemPersonal}>
                            <h3 className={styles.titlePersonal}>Start year:</h3>
                            <span className={styles.infoPersonal}>
                              {education.startDate ? education.startDate.split('T')[0] : ''}
                            </span>
                          </div>
                          <div className={styles.itemPersonal}>
                            <h3 className={styles.titlePersonal}>End year:</h3>
                            <span className={styles.infoPersonal}>
                              {education.finishDate ? education.finishDate.split('T')[0] : ''}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              case 'WORK-EXPERIENCE':
                return (
                  <div>
                    {postulantData.workExperience?.map((experience) => {
                      return (
                        <div className={styles.containerPersonal} key={experience._id}>
                          <Button
                            type={'editInfo'}
                            onClick={() => handleClickUpdateWork(experience._id)}
                          />
                          <div className={styles.itemPersonalLong}>
                            <h3 className={styles.titlePersonal}>Company:</h3>
                            <span className={styles.infoPersonal}>{experience.company}</span>
                          </div>
                          <div className={styles.itemPersonalLong}>
                            <h3 className={styles.titlePersonal}>Role:</h3>
                            <span className={styles.infoPersonal}>{experience.role}</span>
                          </div>
                          <div className={styles.itemPersonal}>
                            <h3 className={styles.titlePersonal}>Start date:</h3>
                            <span className={styles.infoPersonal}>
                              {experience.startDate?.split('T')[0]}
                            </span>
                          </div>
                          <div className={styles.itemPersonal}>
                            <h3 className={styles.titlePersonal}>End date:</h3>
                            <span className={styles.infoPersonal}>
                              {experience.finishDate?.split('T')[0]}
                            </span>
                          </div>
                          <div className={styles.itemPersonalColumn}>
                            <h3 className={styles.titlePersonal}>What did you do?</h3>
                            <span className={styles.infoPersonal}>{experience.description}</span>
                          </div>
                          <div className={styles.itemPersonalColumn}>
                            <h3 className={styles.titlePersonal}>Biggest Accomplishments</h3>
                            <span className={styles.infoPersonal}>
                              {experience.accomplishments}
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              case 'OTHER-INFORMATION':
                return (
                  <div className={styles.containerPersonal}>
                    <Button
                      type={'editInfo'}
                      onClick={() => handleClickUpdateOtherInfo(postulantData._id)}
                    />
                    <div className={styles.itemPersonal}>
                      <h3 className={styles.titlePersonal}>Nationality:</h3>
                      <span className={styles.infoPersonal}>{postulantData.nationality}</span>
                    </div>
                    <div className={styles.itemPersonal}>
                      <h3 className={styles.titlePersonal}>ID Number:</h3>
                      <span className={styles.infoPersonal}>{postulantData.dni}</span>
                    </div>
                    <div className={styles.itemPersonal}>
                      <h3 className={styles.titlePersonal}>Marital Status:</h3>
                      <span className={styles.infoPersonal}>{postulantData.maritalStatus}</span>
                    </div>
                    <div className={styles.itemPersonal}>
                      <h3 className={styles.titlePersonal}>Drivers license:</h3>
                      <span className={styles.infoPersonal}>
                        {postulantData.driversLicense ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className={styles.itemPersonalColumn}>
                      <h3 className={styles.titlePersonal}>Description</h3>
                      <span className={styles.infoPersonalDescription}>
                        {postulantData.description}
                      </span>
                    </div>
                  </div>
                );
              case 'AVAILABILITY':
                return (
                  <div className={styles.containerPersonal}>
                    <Button
                      type={'editInfo'}
                      onClick={() => handleClickUpdateAvailability(postulantData._id)}
                    />
                    <table border="1" className={styles.tableSummary}>
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
                );
              default:
                return null;
            }
          })()}
        </div>
        <div className={styles.containerFooter}>
          <Link to="/postulants/availability">
            <Button type={'back'} text={'BACK'} />
          </Link>
          <Link to="/postulants/profile">
            <Button type={'next'} text={'FINISH'} onClick={handleRegister} />
          </Link>
        </div>
      </div>
      {showModal && (
        <Modal
          handleShowModal={handleShowModal}
          modalType={modalType}
          handleSubmit={
            modalType === 'personal-info'
              ? handleUpdatePersonalInfo
              : modalType === 'education'
              ? handleUpdateEducation
              : modalType === 'work'
              ? handleUpdateWork
              : modalType === 'other'
              ? handleUpdateOtherInfo
              : handleUpdateAvailability
          }
          meta={idActive}
        />
      )}
    </section>
  );
}

export default Summary;
