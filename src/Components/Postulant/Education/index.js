import { Form, Field } from 'react-final-form';
import styles from './education.module.css';
import Button from 'Components/Shared/Button';
import Input from 'Components/Shared/Input';
import Select from 'Components/Shared/Select';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import { useHistory } from 'react-router-dom';
import { setEducationInfo } from 'redux/PostulantModule/actions';
import { useDispatch } from 'react-redux';

function Education() {
  const history = useHistory();
  const dispatch = useDispatch();

  const onSubmit = (formValues) => {
    if (formValues) {
      dispatch(setEducationInfo(formValues));
      history.push('/postulants/work');
    }
  };

  const handleAdd = (formProps) => {
    dispatch(setEducationInfo(formProps.values));
    formProps.form.reset();
  };

  const required = (value) => (value ? undefined : 'Required');

  return (
    <section className={styles.container}>
      <div className={styles.containerSummary}>
        <h2 className={styles.title}>Education</h2>
        <Form
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
                  validate={required}
                />
                <Field
                  label="Name of the institution"
                  name="institution"
                  component={Input}
                  type="text"
                  placeholder="Enter the name of the institution"
                  validate={required}
                />
                <Field
                  label="Title"
                  name="title"
                  component={Input}
                  type="text"
                  placeholder="Enter the title/specialty"
                  validate={required}
                />
                <div className={styles.inputColumn}>
                  <div>
                    <Field
                      label="Start Date"
                      name="startDate"
                      component={Input}
                      type="date"
                      placeholder="YYYY"
                      validate={required}
                    />
                  </div>
                  <div>
                    <Field
                      label="Finish Date"
                      name="finishDate"
                      type="date"
                      component={Input}
                      placeholder="YYYY"
                    />
                  </div>
                </div>
              </div>
              <div className={styles.containerFooter}>
                <Link to="/postulants/personal-info">
                  <Button type={'back'} text={'BACK'} />
                </Link>
                <Button type="addNew" onClick={() => handleAdd(formProps)} />
                <Button type={'next'} text={'NEXT'} />
              </div>
            </form>
          )}
        />
      </div>
    </section>
  );
}

export default Education;
