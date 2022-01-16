import styles from './work.module.css';
import { Form, Field } from 'react-final-form';
import { useSelector } from 'react-redux';
import Button from 'Components/Shared/Button';
import Input from 'Components/Shared/Input';
import { useState } from 'react';

function WorkForm({ handleSubmit, handleShowModal }) {
  const formData = useSelector((store) => store.postulants.postulant);
  const [idWork, setIdWork] = useState('');

  const onSubmit = (formValues) => {
    handleSubmit(formValues, idWork);
    handleShowModal(false);
  };

  return (
    <section>
      <div>
        <h2 className={styles.title}>
          <span className={styles.bold}>Work Experience</span>
        </h2>
        {formData.workExperience?.map((data) => {
          return (
            <Form
              key={data._id}
              onSubmit={onSubmit}
              render={(formProps) => (
                <form onSubmit={formProps.handleSubmit} className={styles.form}>
                  <div className={styles.formContent}>
                    <Field
                      label="Company"
                      name="company"
                      component={Input}
                      className={styles.input}
                      placeholder="Enter the Company"
                      initialValue={data.company}
                    />
                    <Field
                      label="Start Date"
                      name="startDate"
                      type="date"
                      component={Input}
                      className={styles.input}
                      initialValue={data.startDate.split('T')[0]}
                    />
                    <Field
                      label="End Date"
                      name="finishDate"
                      type="date"
                      component={Input}
                      className={styles.input}
                      initialValue={data.finishDate.split('T')[0]}
                    />
                  </div>
                  <div>
                    <Field
                      label="Role"
                      name="role"
                      component={Input}
                      className={styles.input}
                      placeholder="Enter your role"
                      initialValue={data.role}
                    />
                  </div>
                  <div className={styles.details}>
                    <Field
                      label="Biggest Accomplishments"
                      name="accomplishments"
                      type="textarea"
                      component={Input}
                      className={styles.input}
                      initialValue={data.accomplishments}
                    />
                    <Field
                      label="What did you do?"
                      name="description"
                      type="textarea"
                      component={Input}
                      className={styles.input}
                      initialValue={data.description}
                    />
                  </div>
                  <div className={styles.containerFooter}>
                    <Button type="submit" onClick={() => setIdWork(data._id)} />
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

export default WorkForm;
