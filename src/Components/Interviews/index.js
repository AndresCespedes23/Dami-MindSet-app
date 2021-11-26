import { useState, useEffect } from 'react';
import styles from './interviews.module.css';
import Button from '../Shared/Button/index';
import Modal from '../Shared/Modal/index';

function Interviews() {
  const [interviews, setInterviews] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = (e) => {
    console.log(e);
    setShowModal(!showModal);
  };

  useEffect(() => {
    fetch(`https://basd21-dami-mindset-api-dev.herokuapp.com/api/interviews`)
      .then((response) => response.json())
      .then((response) => {
        setInterviews(response);
      });
  }, []);

  return (
    <section className={styles.container}>
      <h2>Interviews</h2>
      <div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Candidate</th>
              <th>Client</th>
              <th>Position</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {interviews.map((interview) => {
              return [
                <tr key={interview._id}>
                  <td>{interview.idCandidate}</td>
                  <td>{interview.idClient}</td>
                  <td>{interview.idPosition}</td>
                  <td>{interview.dateTime}</td>
                  <td>{interview.status}</td>
                  <td>
                    <Button type="delete" onClick={handleShowModal} />
                    <Button type="update" onClick={handleShowModal} />
                  </td>
                </tr>
              ];
            })}
          </tbody>
        </table>
      </div>
      <Button type="add" onClick={handleShowModal} />
      {showModal && <Modal handleShowModal={handleShowModal} />}
    </section>
  );
}

export default Interviews;
