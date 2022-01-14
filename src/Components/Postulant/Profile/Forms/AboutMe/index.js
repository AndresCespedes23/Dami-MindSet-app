import styles from './about.module.css';
import { Form, Field } from 'react-final-form';
import { useSelector } from 'react-redux';
import Button from 'Components/Shared/Button';

function AboutMeForm({ handleSubmit, handleShowModal }) {
  const formData = useSelector((store) => store.postulants.postulant);

  const onSubmit = (formData) => {
    handleSubmit(formData);
    handleShowModal(false);
  };

  return (
    <section>
      <div>
        <h2 className={styles.title}>
          <span className={styles.bold}>About Me</span>
        </h2>
        <Form
          onSubmit={onSubmit}
          initialValues={formData}
          render={(formProps) => (
            <form onSubmit={formProps.handleSubmit}>
              <Field
                name="description"
                component="textarea"
                className={styles.aboutMeInput}
                rows={10}
                placeholder="Tell the world a little bit about yourself"
              />
              <div className={styles.containerFooter}>
                <Button type="submit" />
              </div>
            </form>
          )}
        />
      </div>
    </section>
  );
}

export default AboutMeForm;
