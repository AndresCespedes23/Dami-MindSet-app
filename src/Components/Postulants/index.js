import { useState, useEffect } from 'react';
import styles from './postulants.module.css';
/* import Modal from '../../../components/Modal' */

function Postulants() {
  const [postulants, setPostulants] = useState([]);
  /* const [showModal, setShowModal] = useState(false); */

  useEffect(() => {
    // Cambiar por variable de entorno
    fetch(`https://basd21-dami-mindset-api-dev.herokuapp.com/api/candidates`)
      .then((response) => response.json())
      .then((response) => {
        setPostulants(response);
      });
  }, []);

  return (
    <section className={styles.container}>
      <h2>Postulants</h2>
      {postulants.map((postulants) => console.log(postulants))}
    </section>
  );
}

export default Postulants;
