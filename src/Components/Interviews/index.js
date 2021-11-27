import { useState, useEffect } from 'react';
import styles from './interviews.module.css';
import Button from '../Shared/Button/index';
import Modal from '../Shared/Modal/index';
import { FaCheckCircle, FaClock } from 'react-icons/fa';

function Interviews() {
  const [interviews, setInterviews] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [idActive, setIdActive] = useState('');

  useEffect(() => {
    fetch(`http://localhost:5000/api/interviews`)
      .then((response) => response.json())
      .then((response) => {
        setInterviews(response);
      });
  }, []);

  const handleShowModal = () => {
    setShowModal(false);
  };

  const handleDeleteClick = (id) => {
    //CONFIRMACION FALTA
    setShowModal(true);
    setIdActive(id);
    setModalType('delete');
  };

  const handleDeleteInterview = (id) => {
    fetch(`http://localhost:5000/api/interviews/${id}`, {
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

  const handleUpdateClick = (id) => {
    setShowModal(true);
    setIdActive(id);
    setModalType('interviews');
  };
  const handleUpdateInterview = (interview) => {
    //METODO DE UPDATE
    console.log(interview);
  };
  const handleAddClick = () => {
    setShowModal(true);
    setIdActive(null);
    setModalType('interviews');
  };
  const handleAddInterview = (interview) => {
    fetch(`http://localhost:5000/api/interviews`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(interview)
    })
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
                  <td className={styles[interview.status.toLowerCase()]}>
                    {interview.status === 'DONE' ? <FaCheckCircle /> : <FaClock />}
                  </td>
                  <td>
                    <Button type="delete" onClick={() => handleDeleteClick(interview._id)} />
                    <Button type="update" onClick={() => handleUpdateClick(interview._id)} />
                  </td>
                </tr>
              ];
            })}
          </tbody>
        </table>
      </div>
      <Button type="add" onClick={handleAddClick} />
      {showModal && (
        <Modal
          handleShowModal={handleShowModal}
          modalType={modalType}
          handleSubmit={
            modalType === 'delete'
              ? () => handleDeleteInterview(idActive)
              : modalType === 'postulants'
              ? handleUpdateInterview(idActive)
              : handleAddInterview
          }
          meta={idActive}
        />
      )}
    </section>
  );
}

export default Interviews;
