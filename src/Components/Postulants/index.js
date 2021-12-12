import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getPostulants,
  deletePostulant,
  addPostulant,
  updatePostulant
} from '../../redux/Postulants/thunks';
import { setShowModal, setShowMessage, setModalType } from '../../redux/Postulants/actions';
import styles from './postulants.module.css';
import Button from '../../Components/Shared/Button';
import Modal from '../Shared/Modal';
import Message from '../Shared/Message';
import Spinner from '../Shared/Spinner';

function Postulants() {
  const postulants = useSelector((store) => store.postulants.list);
  const isLoading = useSelector((store) => store.postulants.isLoading);

  const messageType = useSelector((store) => store.postulants.messageType);
  const message = useSelector((store) => store.postulants.messageText);

  const showModal = useSelector((store) => store.postulants.showModal);
  const showMessage = useSelector((store) => store.postulants.showMessage);
  const modalType = useSelector((store) => store.postulants.modalType);

  const dispatch = useDispatch();

  const [idActive, setIdActive] = useState('');

  useEffect(() => {
    dispatch(getPostulants());
  }, [dispatch]);

  const handleClickDelete = (id) => {
    dispatch(setShowModal(true));
    setIdActive(id);
    dispatch(setModalType('delete'));
  };

  const handleDelete = (id) => {
    dispatch(deletePostulant(id)).then(() => {
      dispatch(setShowMessage(true));
      dispatch(getPostulants());
    });
  };

  const handleClickUpdate = (id) => {
    dispatch(setShowModal(true));
    setIdActive(id);
    dispatch(setModalType('postulants'));
  };

  const handleUpdatePostulant = (postulant) => {
    dispatch(updatePostulant(postulant)).then(() => {
      dispatch(setShowMessage(true));
      dispatch(getPostulants());
    });
  };

  const handleClickAdd = () => {
    dispatch(setShowModal(true));
    setModalType('postulants');
    dispatch(setIdActive(''));
  };

  const handleAddPostulant = (postulant) => {
    dispatch(addPostulant(postulant)).then(() => {
      dispatch(setShowMessage(true));
      dispatch(getPostulants());
    });
  };

  const handleShowModal = () => {
    dispatch(setShowModal(false));
  };

  const handleShowMessage = () => {
    dispatch(setShowMessage(false));
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
