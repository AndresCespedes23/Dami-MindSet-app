import styles from './courses.module.css';
import { Form, Field } from 'react-final-form';
import { useSelector } from 'react-redux';
import Input from 'Components/Shared/Input';
import Button from 'Components/Shared/Button';
import { useState } from 'react';

function CoursesForm({ handleSubmit, handleShowModal }) {
  const formData = useSelector((store) => store.postulants.postulant);
  const [idCourse, setIdCourse] = useState('');

  const onSubmit = (formValues) => {
    handleSubmit(formValues, idCourse);
    handleShowModal(false);
  };

  return (
    <section>
      <div>
        <h2 className={styles.title}>
          <span className={styles.bold}>Courses</span>
        </h2>
        {formData.courses?.map((data) => {
          return (
            <Form
              key={data._id}
              onSubmit={onSubmit}
              render={(formProps) => (
                <form onSubmit={formProps.handleSubmit}>
                  <div className={styles.formContent}>
                    <Field
                      label="Name of the course or training"
                      name="name"
                      component={Input}
                      type="text"
                      placeholder="Enter the name of the course or training"
                      initialValue={data.name}
                    />
                    <div className={styles.inputColumn}>
                      <Field
                        label="Organization / Institution"
                        name="organization"
                        type="text"
                        placeholder="Enter the name of the institution"
                        component={Input}
                        initialValue={data.organization}
                      />
                      <div className={styles.timeDurationInputs}>
                        <div className={styles.dateInput}>
                          <Field
                            label="End date"
                            name="endData"
                            component={Input}
                            type="date"
                            initialValue={data.endData}
                          />
                        </div>
                        <div>
                          <Field
                            label="Duration"
                            name="duration"
                            type="number"
                            component={Input}
                            placeholder="Duration in hs"
                            initialValue={data.duration}
                          />
                        </div>
                      </div>
                    </div>
                    <div className={styles.descriptionInput}>
                      <Field
                        label="Description"
                        name="description"
                        component={Input}
                        type="textarea"
                        placeholder="Describe briefly what the course or training was about and what was the main knowledge you gained from it"
                        initialValue={data.description}
                      />
                    </div>
                  </div>
                  <div className={styles.containerFooter}>
                    <Button type="submit" onClick={() => setIdCourse(data._id)} />
                  </div>
                </form>
              )}
            />
          );
        })}
      </div>
    </section>
  );
}

export default CoursesForm;
