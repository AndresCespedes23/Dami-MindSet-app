import Message from 'Components/Shared/Message';
import Modal from 'Components/Shared/Modal';
import Spinner from 'Components/Shared/Spinner';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setShowMessage, setShowModal } from 'redux/Postulants/actions';
import { searchPostulants } from 'redux/Postulants/thunks';
import {
  addPostulant,
  deletePostulant,
  getPostulants,
  updatePostulant
} from 'redux/Postulants/thunks';
import styles from './postulants.module.css';
import { useHistory } from 'react-router-dom';

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
  const history = useHistory();
  const [isSearch, setIsSearch] = useState(false);
  const [inputSearch, setInputSearch] = useState('');

  const [type, setType] = useState('PENDING-INTERVIEW');

  useEffect(() => {
    dispatch(getPostulants());
  }, [dispatch]);

  const handleDelete = (id) => {
    dispatch(deletePostulant(id)).then(() => {
      dispatch(setShowMessage(true));
      dispatch(getPostulants());
    });
  };

  const handleUpdatePostulant = (postulant) => {
    dispatch(updatePostulant(postulant, idActive)).then(() => {
      dispatch(setShowMessage(true));
      dispatch(getPostulants());
    });
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
  const handleClickInfo = (id) => {
    history.push(`/admin/postulant/${id}`);
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
  const handleChange = (e) => {
    setInputSearch(e.target.value);
  };
  const handleEnter = (e) => {
    if (e.code === 'Enter') {
      dispatch(searchPostulants(inputSearch));
      setIsSearch(true);
    }
  };
  const handleSubmit = () => {
    dispatch(searchPostulants(inputSearch));
    setIsSearch(true);
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
        </div>
        <section className={styles.container}>
          <div className={styles.containerInterviews}>
            <div className={styles.containerNav}>
              <div className={styles.searchContainer}>
                <div className={styles.itemPersonalColumn}>
                  <h2 className={styles.searchTitle}>Search Postulant</h2>
                  <input
                    className={styles.searchInput}
                    placeholder="Postulant"
                    value={inputSearch}
                    onChange={handleChange}
                    onKeyPress={handleEnter}
                  />
                </div>
                <div>
                  <button type="submit" className={styles.searchBtn} onClick={handleSubmit}>
                    SEARCH
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.postulantContent}>
              {!isSearch ? (
                <></>
              ) : isLoading ? (
                <Spinner type="ThreeDots" color="#002147" height={80} width={80} />
              ) : postulants.length ? (
                <></>
              ) : (
                <h3 className={styles.notFoundMessage}>Postulants not found</h3>
              )}
            </div>
          </div>
        </section>
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
                            <td>{postulant.email}</td>
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
                              <button
                                className={styles.redBtn}
                                onClick={() => handleClickInfo(postulant._id)}
                              >
                                DETAILS
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
                            <td>{postulant.email}</td>
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
                              </button>{' '}
                              <button
                                className={styles.redBtn}
                                onClick={() => handleClickInfo(postulant._id)}
                              >
                                DETAILS
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
                      if (postulant.status === 'DISABLED') {
                        return (
                          <tr key={postulant._id}>
                            <td>{postulant.name}</td>
                            <td>{postulant.email}</td>
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
                              </button>{' '}
                              <button
                                className={styles.redBtn}
                                onClick={() => handleClickInfo(postulant._id)}
                              >
                                DETAILS
                              </button>
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
                              </button>{' '}
                              <button
                                className={styles.redBtn}
                                onClick={() => handleClickInfo(postulant._id)}
                              >
                                DETAILS
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
