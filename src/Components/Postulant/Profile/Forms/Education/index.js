import styles from './education.module.css';
import { Form, Field } from 'react-final-form';
import { useSelector } from 'react-redux';
import Input from 'Components/Shared/Input';
import Select from 'Components/Shared/Select';
import Button from 'Components/Shared/Button';

function EducationForm({ handleSubmit, handleShowModal }) {
  const formData = useSelector((store) => store.postulants.postulant);
  const educations = formData?.education;

  for (var i = 0; i < educations.length; i += 1) {
    console.log(educations[i]._id);
  }

  const onSubmit = (formValues) => {
    handleSubmit(formValues);
    handleShowModal(false);
  };
  return (
    <section>
      <div>
        <h2 className={styles.title}>
          <span className={styles.bold}>Education</span>
        </h2>
        {educations?.map((data) => {
          return (
            <Form
              key={data._id}
              initialValues={formData}
              onSubmit={onSubmit}
              render={(formProps) => (
                <form onSubmit={formProps.handleSubmit}>
                  <div className={styles.formContent}>
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
                      disabled={formProps.submitting}
                      initialValue={data.level}
                    />
                    <Field
                      label="Name of the institution"
                      name="institution"
                      component={Input}
                      type="text"
                      placeholder="Enter the name of the institution"
                      initialValue={data.institution}
                    />
                    <Field
                      label="Title"
                      name="title"
                      component={Input}
                      type="text"
                      placeholder="Enter the title/specialty"
                      initialValue={data.title}
                    />
                    <div className={styles.inputColumn}>
                      <div>
                        <Field
                          label="Start Date"
                          name="startDate"
                          component={Input}
                          type="date"
                          placeholder="YYYY"
                          initialValue={data.startDate.split('T')[0]}
                        />
                      </div>
                      <div>
                        <Field
                          label="Finish Date"
                          name="finishDate"
                          type="date"
                          component={Input}
                          placeholder="YYYY"
                          initialValue={data.finishDate.split('T')[0]}
                        />
                      </div>
                    </div>
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
