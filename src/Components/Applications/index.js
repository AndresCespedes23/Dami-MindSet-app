import { useState, useEffect } from 'react';
import styles from './applications.module.css';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';
/* import Message from '../Shared/Message'; */

function Applications() {
  const [applications, setApplications] = useState([]); //esto es para el fetch
  const [showModal, setShowModal] = useState(false); // modal
  const [modalType, setModalType] = useState(''); // modal para las acciones
  const [idActive, setIdActive] = useState(''); // esto esta para las acciones que no sean ADD
  // const [showMessage, setShowMessage] // (true/false) ESTOS STATUS C/ MSG SON PARA EL DELETE
  // const [messageType, setMessageType] // ('error'; 'success' ) ESTOS STATUS C/ MSG SON PARA EL DELETE
  // const [message, setMessage] // (string) ESTOS STATUS C/ MSG SON PARA EL DELETE

  useEffect(() => {
    // fetch(`${process.env.REACT_APP_API}/applications`)
    fetch('http://localhost:4000/api/applications')
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then((response) => {
        setApplications(response);
      });
  }, []);

  // ----------- ADD -----------
  const handleClickAdd = () => {
    setShowModal(true); //abre el modal al tocar el botton add
    setModalType('applications');
    setIdActive('');
  };

  const handleAddApplication = (application) => {
    // fetch(`${process.env.REACT_APP_API}/applications`, {
    fetch('http://localhost:4000/api/applications', {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(application)
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then((response) => {
        console.log(response);
        // messages
        // messages
        // messages
        setApplications([...applications, response]);
      })
      .catch((err) => {
        console.log(err); //falta codigo -------------------------------------------------
        // messages
        // messages
        // messages
      });
  };

  // ----------- DELETE -----------
  const handleClickDelete = (id) => {
    setShowModal(true);
    setIdActive(id);
    setModalType('delete');
  };

  const handleDelete = (id) => {
    // fetch(`${process.env.REACT_APP_API}/applications/${id}`, {
    fetch(`http://localhost:4000/api/applications/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      }
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then(() => {
        // AQUI LOS STATES PARA EL MENSAJE
        // AQUI LOS STATES PARA EL MENSAJE
        // AQUI LOS STATES PARA EL MENSAJE
        setApplications(applications.filter((application) => application._id !== id));
      })
      .catch((error) => {
        console.log(error);
        //message
        //message
      });
  };

  // ----------- UPDATE(EDIT) -----------
  const handleClickUpdate = (id) => {
    setShowModal(true);
    setIdActive(id);
    setModalType('applications');
  };

  const handleUpdateApplication = (application) => {
    // fetch(`${process.env.REACT_APP_API}/applications/${idActive}`, {
    fetch(`http://localhost:4000/api/applications/${idActive}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(application)
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then((response) => {
        console.log(response);
        // messages
        // messages
        // messages
        setApplications(
          applications.map((application) => (application._id === idActive ? response : application))
        );
      })
      .catch((err) => {
        console.log(err);
        // messages
        // messages
      });
  };

  // -----------MODAL AND MESSAGES-----------
  const handleShowModal = () => {
    setShowModal(false); // para que el modal este desactivado por defecto
  };

  return (
    <section className={styles.container}>
      <h2>Applications</h2>
      {
        // llamada a LOS STATUS MESSAGES
      }
      <div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Position</th>
              <th>Candidate</th>
              <th>Interview Date</th>
              <th>Result</th>
              <th>Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {applications.map((application) => {
              return [
                <tr key={application._id}>
                  <td>{application.idPosition ? application.idPosition.name : 'ID deleted'}</td>
                  <td>{application.idCandidate ? application.idCandidate.name : 'ID deleted'}</td>
                  <td>
                    {application.idInterview ? application.idInterview.dateTime : 'ID deleted'}
                  </td>
                  <td>{application.result}</td>
                  <td>{application.dateTime}</td>
                  <td>{application.status}</td>
                  <td>
                    <Button type="update" onClick={() => handleClickUpdate(application._id)} />
                    <Button type="delete" onClick={() => handleClickDelete(application._id)} />
                  </td>
                </tr>
              ];
            })}
          </tbody>
        </table>
      </div>
      <Button type="add" onClick={handleClickAdd} />
      {showModal && (
        <Modal
          handleShowModal={handleShowModal} //hasta acá es para que el modal aparezca basicamente
          modalType={modalType} //esto sería para manejar las acciones
          handleSubmit={
            modalType === 'delete'
              ? () => handleDelete(idActive)
              : modalType === 'applications' && !idActive
              ? handleAddApplication
              : handleUpdateApplication
          }
          meta={idActive}
        />
      )}
    </section>
  );
}

export default Applications;
