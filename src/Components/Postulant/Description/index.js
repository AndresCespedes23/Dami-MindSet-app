import styles from './description.module.css';
import Button from 'Components/Shared/Button';
import { Form, Field } from 'react-final-form';
import { useHistory } from 'react-router-dom';

function Description() {
  const history = useHistory();

  const onSubmit = (formValues) => {
    console.log(formValues);
  };
  const handleBackClick = () => {
    history.push('/postulants/sign');
  };
  return (
    <section className={styles.container}>
      <div className={styles.containerSummary}>
        <h2 className={styles.title}>Description</h2>
        <h3 className={styles.subtitle}>
          <span className={styles.bold}>Description</span>(Optional)
        </h3>
        <Form
          onSubmit={onSubmit}
          render={(formProps) => (
            <form onSubmit={formProps.handleSubmit}>
              <Field
                name="description"
                component="textarea"
                className={styles.descriptionInput}
                rows={10}
                placeholder="Tell the world a little bit about yourself"
              />
              <div className={styles.containerFooter}>
                <Button type={'back'} text={'BACK'} onClick={handleBackClick} />
                <Button type={'next'} text={'NEXT'} />
              </div>
            </form>
          )}
        />
      </div>
    </section>
  );
}

export default Description;
