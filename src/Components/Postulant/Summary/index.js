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
                        {postulant.dateOfBirth ? postulant.dateOfBirth.split('T')[0] : ''}
                      </span>
                    </div>
                    <div className={styles.itemPersonal}>
                      <h3 className={styles.titlePersonal}>Age:</h3>
                      <span className={styles.infoPersonal}>
                        {postulant.dateOfBirth ? getAge(postulant.dateOfBirth) : ''}
                      </span>
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
                return (
                  <div>
                    {postulant.education.map((education) => {
                      return (
                        <div className={styles.containerPersonal} key={education._id}>
                          <h2 className={styles.titleEducation}>{education.level}</h2>
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
                    {postulant.workExperience.map((experience) => {
                      return (
                        <div className={styles.containerPersonal} key={experience._id}>
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
                              {experience.startDate.split('T')[0]}
                            </span>
                          </div>
                          <div className={styles.itemPersonal}>
                            <h3 className={styles.titlePersonal}>End date:</h3>
                            <span className={styles.infoPersonal}>
                              {experience.finishDate.split('T')[0]}
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
                    <div className={styles.itemPersonal}>
                      <h3 className={styles.titlePersonal}>Nationality:</h3>
                      <span className={styles.infoPersonal}>{postulant.nationality}</span>
                    </div>
                    <div className={styles.itemPersonal}>
                      <h3 className={styles.titlePersonal}>ID Number:</h3>
                      <span className={styles.infoPersonal}>{postulant.dni}</span>
                    </div>
                    <div className={styles.itemPersonal}>
                      <h3 className={styles.titlePersonal}>Marital Status:</h3>
                      <span className={styles.infoPersonal}>{postulant.maritalStatus}</span>
                    </div>
                    <div className={styles.itemPersonal}>
                      <h3 className={styles.titlePersonal}>Drivers license:</h3>
                      <span className={styles.infoPersonal}>
                        {postulant.driversLicense ? 'Yes' : 'No'}
                      </span>
                    </div>
                    <div className={styles.itemPersonalColumn}>
                      <h3 className={styles.titlePersonal}>Description</h3>
                      <span className={styles.infoPersonal}>{postulant.description}</span>
                    </div>
                  </div>
                );
              case 'AVAILABILITY':
                return (
                  <div className={styles.containerPersonal}>
                    <table border="1">
                      <tr>
                        <td>Day</td>
                        <td>Monday</td>
                        <td>Tuesday</td>
                        <td>Wednesday</td>
                        <td>Thursday</td>
                        <td>Friday</td>
                      </tr>
                      <tr>
                        <td>6:00</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>7:00</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>8:00</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>9:00</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>10:00</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>11:00</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>12:00</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>13:00</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>14:00</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>15:00</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>16:00</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>17:00</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>18:00</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>19:00</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                      <tr>
                        <td>20:00</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    </table>
                  </div>
                );
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
