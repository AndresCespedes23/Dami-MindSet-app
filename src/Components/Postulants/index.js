import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getPostulants, deletePostulants } from '../../redux/Postulants/thunks';
import styles from './postulants.module.css';
import Button from '../../Components/Shared/Button';
import Modal from '../Shared/Modal';
import Message from '../Shared/Message';
import Spinner from '../Shared/Spinner';

function Postulants() {
  const postulants = useSelector((store) => store.postulants.list);
  const isLoading = useSelector((store) => store.postulants.isLoading);
  const dispatch = useDispatch();

  const [showModal, setShowModal] = useState(false);
  const [modalType, setModalType] = useState('');
  const [idActive, setIdActive] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [messageType, setMessageType] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    dispatch(getPostulants());
  }, [dispatch]);

  const cleanMessage = () => {
    setShowMessage(false);
    setMessage('');
  };

  const handleClickDelete = (id) => {
    cleanMessage();
    setShowModal(true);
    setIdActive(id);
    setModalType('delete');
  };

  const handleDelete = (id) => {
    dispatch(deletePostulants(id));
  };

  const handleClickUpdate = (id) => {
    cleanMessage();
    setShowModal(true);
    setIdActive(id);
    setModalType('postulants');
  };

  const handleUpdatePostulant = (postulant) => {
    fetch(`${process.env.REACT_APP_API}/candidates/${idActive}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(postulant)
    })
      .then((response) => {
        if (response.status === 200 || response.status === 201) return response.json();
        throw new Error(`HTTP ${response.status}`);
      })
      .then(() => {
        setShowMessage(true);
        setMessageType('success');
        setMessage('Candidate updated');
        getPostulants();
      })
      .catch((err) => {
        console.log(err);
        setShowMessage(true);
        setMessageType('error');
        setMessage('Error updating candidate');
      });
  };

  const handleClickAdd = () => {
    cleanMessage();
    setShowModal(true);
    setModalType('postulants');
    setIdActive('');
  };

  const handleAddPostulant = (postulant) => {
    fetch(`${process.env.REACT_APP_API}/candidates`, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(postulant)
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
        setMessage('Candidate added');
        getPostulants();
      })
      .catch((err) => {
        console.log(err);
        setShowMessage(true);
        setMessageType('error');
        setMessage('Error adding candidate');
      });
  };

  const handleShowModal = () => {
    setShowModal(false);
  };

  const handleShowMessage = () => {
    setShowMessage(false);
  };

  if (isLoading) return <Spinner type="ThreeDots" color="#002147" height={80} width={80} />;

  return (
    <section className={styles.container}>
      <div className={styles.list}>
        <div>
          <h2>Postulants</h2>
          {showMessage && (
            <Message type={messageType} message={message} showMessage={handleShowMessage} />
          )}
          <Button type="addNew" text={'POSTULANT'} onClick={handleClickAdd} />
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Country</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {postulants.map((postulant) => {
              return (
                <tr key={postulant._id}>
                  <td>{postulant.name}</td>
                  <td>{postulant.email}</td>
                  <td>{postulant.phoneNumber}</td>
                  <td>{postulant.country}</td>
                  <td>{postulant.status}</td>
                  <td>
                    <Button type="delete" onClick={() => handleClickDelete(postulant._id)} />
                    <Button type="update" onClick={() => handleClickUpdate(postulant._id)} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {showModal && (
        <Modal
          handleShowModal={handleShowModal}
          modalType={modalType}
          handleSubmit={
            modalType === 'delete'
              ? () => handleDelete(idActive)
              : modalType === 'postulants' && !idActive
              ? handleAddPostulant
              : handleUpdatePostulant
          }
          meta={idActive}
        />
      )}
    </section>
  );
}

export default Postulants;
