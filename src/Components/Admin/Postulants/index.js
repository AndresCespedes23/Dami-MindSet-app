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

  const [type, setType] = useState('PENDING-INTERVIEW');

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

  const handleButtonClick = (type) => {
    setType(type);
  };

  const handleDissabled = (id, postulant) => {
    setIdActive(id);
    dispatch(updatePostulant(postulant, id)).then(() => {
      dispatch(getPostulants());
    });
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
        <div className={styles.containerButtons}>
          <button
            className={type === 'PENDING-INTERVIEW' ? styles.btnSectionActive : styles.btnSection}
            onClick={() => handleButtonClick('PENDING-INTERVIEW')}
          >
            Pending interview
          </button>
          <button
            className={type === 'ACTIVE' ? styles.btnSectionActive : styles.btnSection}
            onClick={() => handleButtonClick('ACTIVE')}
          >
            Active
          </button>
          <button
            className={type === 'UNAVAILABLE' ? styles.btnSectionActive : styles.btnSection}
            onClick={() => handleButtonClick('UNAVAILABLE')}
          >
            Unavailable
          </button>
          <button
            className={type === 'INACTIVE' ? styles.btnSectionActive : styles.btnSection}
            onClick={() => handleButtonClick('INACTIVE')}
          >
            Inactive
          </button>
        </div>
        <table className={styles.table}>
          {(() => {
            switch (type) {
              case 'PENDING-INTERVIEW':
                return (
                  <tbody>
                    {postulants.map((postulant) => {
                      if (postulant.status === 'PENDING INTERVIEW') {
                        return (
                          <tr key={postulant._id}>
                            <td>{postulant.name}</td>
                            <td>{postulant.status}</td>
                            <td>
                              <button
                                className={styles.redBtn}
                                onClick={() =>
                                  handleDissabled(postulant._id, {
                                    ...postulant,
                                    status: 'ACTIVE'
                                  })
                                }
                              >
                                CANCEL INTERVIEW
                              </button>
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                );
              case 'ACTIVE':
                return (
                  <tbody>
                    {postulants.map((postulant) => {
                      if (postulant.status === 'ACTIVE') {
                        return (
                          <tr key={postulant._id}>
                            <td>{postulant.name}</td>
                            <td>{postulant.status}</td>
                            <td>
                              <button
                                className={styles.redBtn}
                                onClick={() =>
                                  handleDissabled(postulant._id, {
                                    ...postulant,
                                    status: 'INACTIVE'
                                  })
                                }
                              >
                                DEACTIVATE
                              </button>
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                );
              case 'UNAVAILABLE':
                return (
                  <tbody>
                    {postulants.map((postulant) => {
                      console.log(postulant);
                      if (postulant.status === 'DISABLED') {
                        return (
                          <tr key={postulant._id}>
                            <td>{postulant.name}</td>

                            <td>
                              <button
                                className={styles.redBtn}
                                onClick={() =>
                                  handleDissabled(postulant._id, {
                                    ...postulant,
                                    status: 'ACTIVE'
                                  })
                                }
                              >
                                ACTIVATE
                              </button>
                              <Button
                                type="delete"
                                onClick={() => handleClickDelete(postulant._id)}
                              />
                              <Button
                                type="update"
                                onClick={() => handleClickUpdate(postulant._id)}
                              />
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                );
              case 'INACTIVE':
                return (
                  <tbody>
                    {postulants.map((postulant) => {
                      if (postulant.status === 'INACTIVE') {
                        console.log(postulant);
                        return (
                          <tr key={postulant._id}>
                            <td>{postulant.name}</td>
                            <td>{postulant.email}</td>
                            <td>{postulant.status}</td>
                            <td>
                              <button
                                className={styles.redBtn}
                                onClick={() =>
                                  handleDissabled(postulant._id, {
                                    ...postulant,
                                    status: 'DISABLED'
                                  })
                                }
                              >
                                Make Unavailable
                              </button>
                            </td>
                          </tr>
                        );
                      }
                    })}
                  </tbody>
                );
            }
          })()}
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
