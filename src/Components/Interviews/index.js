import { useState, useEffect } from 'react';
import styles from './interviews.module.css';
import Button from '../Shared/Button/index';
import Modal from '../Shared/Modal/index';

function Interviews() {
  const [interviews, setInterviews] = useState([]);
  const [showModal, setShowModal] = useState(false);

  const handleShowModal = () => {
    setShowModal(!showModal);
  };
  const handleDelete = (id) => {
    console.log(id);
    //CONFIRMACION FALTA
    fetch(`https://basd21-dami-mindset-api-dev.herokuapp.com/api/interviews/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then((response) => response.json())
      .then(() => {
        setInterviews(interviews.filter((interviews) => interviews._id !== id));
      });
  };
  const handleUpdate = (id) => {
    console.log(id);
  };
  const handleAdd = () => {
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
                    <Button type="delete" onClick={() => handleDelete(interview._id)} />
                    <Button type="update" onClick={() => handleUpdate(interview._id)} />
                  </td>
                </tr>
              ];
            })}
          </tbody>
        </table>
      </div>
      <Button type="add" onClick={() => handleAdd()} />
      {showModal && <Modal handleShowModal={handleShowModal} />}
    </section>
  );
}

export default Interviews;
