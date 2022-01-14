import styles from './education.module.css';
import { Form, Field } from 'react-final-form';
import { useSelector } from 'react-redux';
import Button from 'Components/Shared/Button';
import Input from 'Components/Shared/Input';
import Select from 'Components/Shared/Select';

function EducationForm({ handleSubmit, handleShowModal }) {
  const formData = useSelector((store) => store.postulantModule.postulantData);
  const isLoadingForm = useSelector((store) => store.postulants.isLoadingForm);

  const onSubmit = (formData) => {
    handleSubmit(formData);
    handleShowModal(false);
  };
  return (
    <section>
      <div>
        <h2 className={styles.title}>
          <span className={styles.bold}>Education</span>
        </h2>
        {formData.education?.map((data) => {
          return (
            <Form
              key={data._id}
              onSubmit={onSubmit}
              render={(formProps) => (
                <form onSubmit={formProps.handleSubmit}>
                  <div className={styles.flexRow}>
                    <Field
                      component={Select}
                      label="Level"
                      name="level"
                      options={[
                        { value: 'primary', text: 'primary' },
                        { value: 'secondary', text: 'secondary' },
                        { value: 'tertiary', text: 'tertiary' },
                        { value: 'university', text: 'university' }
                      ]}
                      initialValue={data.level}
                      disabled={formProps.submitting || isLoadingForm}
                    />
                    <Field
                      label="Name of the institution"
                      name="institution"
                      component={Input}
                      type="text"
                      placeholder="Enter the name of the institution"
                      initialValue={data.institution}
                      disabled={formProps.submitting || isLoadingForm}
                    />
                    <Field
                      label="Title"
                      name="title"
                      component={Input}
                      type="text"
                      placeholder="Enter the title/specialty"
                      initialValue={data.title}
                      disabled={formProps.submitting || isLoadingForm}
                    />
                  </div>
                  <div className={styles.flexRow}>
                    <Field
                      label="Start Date"
                      name="startDate"
                      component={Input}
                      type="date"
                      placeholder="YYYY"
                      initialValue={data.startDate.split('T')[0]}
                      disabled={formProps.submitting || isLoadingForm}
                    />
                  </div>
                  <div className={styles.flexRow}>
                    <Field
                      label="Finish Date"
                      name="finishDate"
                      type="date"
                      component={Input}
                      placeholder="YYYY"
                      initialValue={data.finishDate.split('T')[0]}
                      disabled={formProps.submitting || isLoadingForm}
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

export default EducationForm;
