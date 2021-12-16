import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getOnePostulant } from 'redux/Postulants/thunks.js';
import styles from './summary.module.css';
import { FaPen, FaAngleLeft, FaAngleRight } from 'react-icons/fa';

function Summary() {
  const postulant = useSelector((state) => state.postulants.postulant);
  const dispatch = useDispatch();
  const [type, setType] = useState('PERSONAL-INFORMATION');

  useEffect(() => {
    dispatch(getOnePostulant('61afbc5bfc13ae06eb0005dd'));
  }, [dispatch]);

  const handleButtonClick = (type) => {
    setType(type);
    console.log(postulant);
  };
  const getAge = (date) => {
    let today = new Date().getFullYear();
    let year = date.split('-')[0];
    return today - year;
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
          <button className={styles.btnNav}>Edit information {<FaPen />}</button>
        </div>
        <div className={styles.containerInfo}>
          {(() => {
            switch (type) {
              case 'PERSONAL-INFORMATION':
                return (
                  <div className={styles.containerPersonal}>
                    <div className={styles.itemPersonal}>
                      <h3 className={styles.titlePersonal}>Name:</h3>
                      <span className={styles.infoPersonal}>{postulant.name}</span>
                    </div>
                    <div className={styles.itemPersonal}>
                      <h3 className={styles.titlePersonal}>Surname:</h3>
                      <span className={styles.infoPersonal}>{postulant.username}</span>
                    </div>
                    <div className={styles.itemPersonalLong}>
                      <h3 className={styles.titlePersonal}>Email:</h3>
                      <span className={styles.infoPersonal}>{postulant.email}</span>
                    </div>
                    <div className={styles.itemPersonal}>
                      <h3 className={styles.titlePersonal}>Date of birth:</h3>
                      <span className={styles.infoPersonal}>
                        {postulant.dateOfBirth.split('T')[0]}
                      </span>
                    </div>
                    <div className={styles.itemPersonal}>
                      <h3 className={styles.titlePersonal}>Age:</h3>
                      <span className={styles.infoPersonal}>{getAge(postulant.dateOfBirth)}</span>
                    </div>
                    <div className={styles.itemPersonal}>
                      <h3 className={styles.titlePersonal}>Phone number:</h3>
                      <span className={styles.infoPersonal}>{postulant.phoneNumber}</span>
                    </div>
                    <div className={styles.itemPersonalLong}>
                      <h3 className={styles.titlePersonal}>Address:</h3>
                      <span className={styles.infoPersonal}>{postulant.address}</span>
                    </div>
                    <div className={styles.itemPersonal}>
                      <h3 className={styles.titlePersonal}>City:</h3>
                      <span className={styles.infoPersonal}>{postulant.city}</span>
                    </div>
                    <div className={styles.itemPersonal}>
                      <h3 className={styles.titlePersonal}>Postal Code:</h3>
                      <span className={styles.infoPersonal}>{postulant.zipCode}</span>
                    </div>
                  </div>
                );
              case 'EDUCATION':
                return <h1>EDUCATION</h1>;
              case 'WORK-EXPERIENCE':
                return <h1>WORK-EXPERIENCE</h1>;
              case 'OTHER-INFORMATION':
                return <h1>OTHER-INFORMATION</h1>;
              case 'AVAILABILITY':
                return <h1>AVAILABILITY</h1>;
              default:
                return null;
            }
          })()}
        </div>
        <div className={styles.containerFooter}>
          <button className={styles.btnBack}>{<FaAngleLeft size={40} />}Back</button>
          <button className={styles.btnNext}>Next {<FaAngleRight size={40} />}</button>
        </div>
      </div>
    </section>
  );
}

export default Summary;
