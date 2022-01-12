import Button from 'Components/Shared/Button';
import Message from 'Components/Shared/Message';
import Modal from 'Components/Shared/Modal';
import Spinner from 'Components/Shared/Spinner';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setModalType, setShowMessage, setShowModal } from 'redux/Postulants/actions';
import {
  addPostulant,
  deletePostulant,
  getPostulants,
  updatePostulant
} from 'redux/Postulants/thunks';
import styles from './postulants.module.css';

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
    dispatch(setModalType('postulants'));
    setIdActive(id);
    dispatch(setShowModal(true));
  };

  const handleUpdatePostulant = (postulant) => {
    dispatch(updatePostulant(postulant, idActive)).then(() => {
      dispatch(setShowMessage(true));
      dispatch(getPostulants());
    });
  };

  const handleClickAdd = () => {
    dispatch(setModalType('postulants'));
    setIdActive('');
    dispatch(setShowModal(true));
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
  function handleChangeView(view) {
    var i;
    var x = document.getElementsByClassName(view);
    for (i = 0; i < x.length; i++) {
      x[i].style.display = 'none';
    }
    document.getElementById(view).style.display = 'block';
  }

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
        <div>
          <div>
            <button
              className={(styles.topNav, styles.pendingInterview)}
              onClick={() => handleChangeView('PendingInterview')}
            >
              Pending Interview
            </button>
          </div>
          <div>
            <button
              className={(styles.topNav, styles.Unavailable)}
              onClick={() => handleChangeView('Unavaliable')}
            >
              Unavailable
            </button>
          </div>
          <div>
            <button
              className={(styles.topNav, styles.Active)}
              onClick={() => handleChangeView('Active')}
            >
              Active
            </button>
          </div>
          <div>
            <button
              className={(styles.topNav, styles.Disabled)}
              onClick={() => handleChangeView('Disabled')}
            >
              Disabled
            </button>
          </div>
        </div>
        <table className={styles.table}>
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
