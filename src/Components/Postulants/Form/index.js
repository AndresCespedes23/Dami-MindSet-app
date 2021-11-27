/* import { useState } from 'react'; */
import styles from './form.module.css';

function Form({ handleSubmit }) {
  /* const [candidate, setCandidate] = useState({}); */

  // Aca va la request de POST

  // Hacer una request para buscar por ID unico aca o en handleUpdate del Postulants/index

  return (
    <form className={styles.form}>
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
      <button type="submit" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}

export default Form;
