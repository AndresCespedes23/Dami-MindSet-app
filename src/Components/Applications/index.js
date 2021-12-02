import { useState, useEffect } from 'react';
import styles from './applications.module.css';
import Button from '../Shared/Button';
import Modal from '../Shared/Modal';
import Message from '../Shared/Message';
import Table from '../Shared/Table/Table';

function Applications() {
  const [applications, setApplications] = useState([]); // this is for "fetch"
  const [showModal, setShowModal] = useState(false); // modal
  const [modalType, setModalType] = useState(''); // modal for add, update and delete
  const [idActive, setIdActive] = useState(''); // modal for update and delete
  const [showMessage, setShowMessage] = useState(false); // (true/false)
  const [messageType, setMessageType] = useState(''); // ('error'/'success')
  const [message, setMessage] = useState(''); // (string)

  const getApplications = () => {
    fetch(`${process.env.REACT_APP_API}/applications`)
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then((response) => {
        setApplications(response);
      })
      .catch((err) => {
        setMessageType('error');
        setMessage('Error:', err);
      });
  };

  useEffect(() => {
    getApplications();
  }, []);

  // ----------- ADD -----------
  const handleClickAdd = () => {
    setShowModal(true); // this is for open the modal
    setIdActive('');
    setModalType('applications');
  };

  const handleAddApplication = (application) => {
    fetch(`${process.env.REACT_APP_API}/applications`, {
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
        if (response.errors || response.code) {
          setShowMessage(true);
          setMessageType('error');
          setMessage('Error with parameters');
          return;
        }
        setShowMessage(true);
        setMessageType('success');
        setMessage('Application added');
        getApplications();
      })
      .catch((err) => {
        console.log(err);
        setShowMessage(true);
        setMessageType('error');
      });
  };

  // ----------- DELETE -----------
  const handleClickDelete = (id) => {
    setShowModal(true);
    setIdActive(id);
    setModalType('delete');
  };

  const handleDelete = (id) => {
    fetch(`${process.env.REACT_APP_API}/applications/${id}`, {
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
        setShowMessage(true);
        setMessageType('success');
        setMessage('Application deleted');
        setApplications(applications.filter((application) => application._id !== id));
      })
      .catch((error) => {
        console.log(error);
        setShowMessage(true);
        setMessageType('error');
      });
  };

  // ----------- UPDATE(EDIT) -----------
  const handleClickUpdate = (id) => {
    setShowModal(true);
    setIdActive(id);
    setModalType('applications');
  };

  const handleUpdateApplication = (application) => {
    fetch(`${process.env.REACT_APP_API}/applications/${idActive}`, {
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
        setShowMessage(true);
        setMessageType('success');
        setMessage('Application updated');
        setApplications(
          applications.map((application) => (application._id === idActive ? response : application))
        );
      })
      .catch((err) => {
        console.log(err);
        setShowMessage(true);
        setMessageType('error');
      });
  };

  // -----------MODAL AND MESSAGES-----------
  const handleShowModal = () => {
    setShowModal(false);
  };

  const handleShowMessage = () => {
    setShowMessage(false);
  };
  //Array con los th de cada tabla, cada uno pone los de su recurso
  const tableHeaders = [
    'Position',
    'Candidate',
    'Interview Date',
    'Result',
    'Date',
    'Status',
    'Actions'
  ];
  //Array con los td de cada tabla, cada uno pone los de su recurso
  const tableData = [
    'idPosition.name',
    'idCandidate.name',
    'idInterview.dateTime',
    'result',
    'dateTime',
    'status'
  ];

  return (
    <section className={styles.container}>
      <h2>Applications</h2>
      {showMessage && (
        <Message type={messageType} message={message} showMessage={handleShowMessage} />
      )}
      <Table
        headers={tableHeaders}
        elements={applications}
        tableData={tableData}
        deleteAction={handleClickDelete}
        updateAction={handleClickUpdate}
      />
      <Button type="add" onClick={handleClickAdd} />
      {showModal && (
        <Modal
          handleShowModal={handleShowModal} // to show modal
          modalType={modalType} // this is for manage the actions
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
