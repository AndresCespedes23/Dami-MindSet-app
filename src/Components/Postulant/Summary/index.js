import styles from './summary.module.css';
import { FaPen, FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import { useState } from 'react';

function Summary() {
  const [type, setType] = useState('PERSONAL-INFORMATION');

  const handleButtonClick = (type) => {
    setType(type);
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
                      <span className={styles.infoPersonal}>Jhon</span>
                    </div>
                    <div className={styles.itemPersonal}>
                      <h3 className={styles.titlePersonal}>Surname:</h3>
                      <span className={styles.infoPersonal}>Doe</span>
                    </div>
                    <div className={styles.itemPersonalLong}>
                      <h3 className={styles.titlePersonal}>Email:</h3>
                      <span className={styles.infoPersonal}>johndoe@gmail.com</span>
                    </div>
                    <div className={styles.itemPersonal}>
                      <h3 className={styles.titlePersonal}>Date of birth:</h3>
                      <span className={styles.infoPersonal}>16/09/1982</span>
                    </div>
                    <div className={styles.itemPersonal}>
                      <h3 className={styles.titlePersonal}>Age:</h3>
                      <span className={styles.infoPersonal}>39</span>
                    </div>
                    <div className={styles.itemPersonal}>
                      <h3 className={styles.titlePersonal}>Phone number:</h3>
                      <span className={styles.infoPersonal}>341435697</span>
                    </div>
                    <div className={styles.itemPersonalLong}>
                      <h3 className={styles.titlePersonal}>Address:</h3>
                      <span className={styles.infoPersonal}>Cordoba 1764, 11th floor</span>
                    </div>
                    <div className={styles.itemPersonal}>
                      <h3 className={styles.titlePersonal}>City:</h3>
                      <span className={styles.infoPersonal}>Rosario</span>
                    </div>
                    <div className={styles.itemPersonal}>
                      <h3 className={styles.titlePersonal}>Postal Code:</h3>
                      <span className={styles.infoPersonal}>2000</span>
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
