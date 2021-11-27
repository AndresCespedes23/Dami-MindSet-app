import styles from './form.module.css';

function PostulantsForm({ id, handleSubmit, handleShowModal }) {
  const onSubmit = (event) => {
    event.preventDefault();
    const newCandidate = {
      name: event.target[0].value,
      email: event.target[1].value,
      username: event.target[2].value,
      password: event.target[3].value,
      gender: event.target[4].value,
      address: event.target[5].value,
      phoneNumber: event.target[6].value,
      dateOfBirth: event.target[7].value,
      zipCode: event.target[8].value,
      city: event.target[9].value,
      state: event.target[10].value,
      country: event.target[11].value,
      dni: event.target[12].value
    };
    handleSubmit(newCandidate);
    handleShowModal();
  };
  console.log(id);
  return (
    <form className={styles.form} onSubmit={onSubmit}>
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
      <div className={styles.formField}>
        <label>Address</label>
        <input type="text" />
      </div>
      <div className={styles.formField}>
        <label>Phone Number</label>
        <input type="number" />
      </div>
      <div className={styles.formField}>
        <label>Date of Birth</label>
        <input type="date" />
      </div>
      <div className={styles.formField}>
        <label>Zip Code</label>
        <input type="number" />
      </div>
      <div className={styles.formField}>
        <label>City</label>
        <input type="text" />
      </div>
      <div className={styles.formField}>
        <label>State</label>
        <input type="text" />
      </div>
      <div className={styles.formField}>
        <label>Country</label>
        <input type="text" />
      </div>
      <div className={styles.formField}>
        <label>DNI</label>
        <input type="number" />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
}

export default PostulantsForm;
