import styles from './form.module.css';

function PostulantsForm({ id, handleSubmit }) {
  console.log(id);
  return (
    <form className={styles.form} onSubmit={() => handleSubmit({ name: 'das' })}>
      <div className={styles.formField}>
        <label>Name</label>
        <input type="text" />
      </div>
      <div className={styles.formField}>
        <label>Email</label>
        <input type="text" />
      </div>
      <div className={styles.formField}>
        <label>Username</label>
        <input type="text" />
      </div>
      <div className={styles.formField}>
        <label>Password</label>
        <input type="password" />
      </div>
      <div className={styles.formField}>
        <label>Gender</label>
        <select>
          <option value="male" key="m">
            Male
          </option>
          <option value="female" key="f">
            Female
          </option>
          <option value="Other" key="o">
            Other
          </option>
        </select>
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default PostulantsForm;
