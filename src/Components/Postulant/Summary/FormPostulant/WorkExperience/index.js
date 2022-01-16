import styles from './work.module.css';
import { Form, Field } from 'react-final-form';
import { useSelector } from 'react-redux';
import Button from 'Components/Shared/Button';
import Input from 'Components/Shared/Input';

function WorkForm({ handleSubmit, handleShowModal }) {
  const formData = useSelector((store) => store.postulantModule.postulantData);

  const onSubmit = (formData) => {
    handleSubmit(formData);
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
              initialValues={formData}
              render={(formProps) => (
                <form onSubmit={formProps.handleSubmit} className={styles.form}>
                  <div className={styles.flexRow}>
                    <Field
                      label="Company"
                      name="company"
                      component={Input}
                      placeholder="Enter the Company"
                      initialValue={data.company}
                    />
                    <Field
                      label="Start Date"
                      name="startDate"
                      type="date"
                      component={Input}
                      initialValue={data.startDate.split('T')[0]}
                    />
                    <Field
                      label="End Date"
                      name="finishDate"
                      type="date"
                      component={Input}
                      initialValue={data.finishDate.split('T')[0]}
                    />
                  </div>
                  <div className={styles.flexRow}>
                    <Field
                      label="Role"
                      name="role"
                      component={Input}
                      placeholder="Enter your role"
                      initialValue={data.role}
                    />
                  </div>
                  <div className={styles.flexRow}>
                    <Field
                      label="Biggest Accomplishments"
                      name="accomplishments"
                      type="textarea"
                      component={Input}
                      initialValue={data.accomplishments}
                    />
                    <Field
                      label="What did you do?"
                      name="description"
                      type="textarea"
                      component={Input}
                      initialValue={data.description}
                    />
                  </div>
                  <div className={styles.containerFooter}>
                    <Button type="submit" />
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
