import { Form, Field } from 'react-final-form';
import styles from './courses.module.css';
import Button from 'Components/Shared/Button';
import Input from 'Components/Shared/Input';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom';
import { setCoursesInfo } from 'redux/PostulantModule/actions';
import { useDispatch } from 'react-redux';

function Courses() {
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = (formValues) => {
    console.log(formValues);
    if (formValues) {
      dispatch(setCoursesInfo(formValues));
      history.push('/postulants/work');
    }
  };

  const handleAdd = (formProps) => {
    dispatch(setCoursesInfo(formProps.values));
    formProps.form.reset();
  };

  return (
    <section className={styles.container}>
      <div className={styles.containerSummary}>
        <h2 className={styles.title}>Courses and Other Trainings</h2>
        <Form
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
                />
                <div className={styles.inputColumn}>
                  <Field
                    label="Organization / Institution"
                    name="organization"
                    type="text"
                    placeholder="Enter the name of the institution"
                    component={Input}
                  />
                  <div className={styles.timeDurationInputs}>
                    <div className={styles.dateInput}>
                      <Field label="End date" name="endData" component={Input} type="date" />
                    </div>
                    <div>
                      <Field
                        label="Duration"
                        name="duration"
                        type="number"
                        component={Input}
                        placeholder="Duration in hs"
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
                  />
                </div>
              </div>
              <div className={styles.containerFooter}>
                <Link to="/postulants/work">
                  <Button type={'back'} text={'BACK'} />
                </Link>
                <Link to="/postulants/courses">
                  <Button type="addNew" onClick={() => handleAdd(formProps)} />
                </Link>
                <Button type={'next'} text={'NEXT'} />
              </div>
            </form>
          )}
        />
      </div>
    </section>
  );
}

export default Courses;
