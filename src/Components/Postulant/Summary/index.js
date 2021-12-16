import styles from './summary.module.css';
import { FaPen } from 'react-icons/fa';
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
                return <h1>PERSONAL</h1>;
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
      </div>
    </section>
  );
}

export default Summary;
