import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  getPositions,
  addPositions,
  updatePositions,
  deletePositions
} from 'redux/Positions/thunks';
import { setShowModal, setShowMessage, setModalType } from 'redux/Positions/actions';
import styles from './positions.module.css';
import Button from 'Components/Shared/Button';
import Modal from 'Components/Shared/Modal';
import Message from 'Components/Shared/Message';
import Spinner from 'Components/Shared/Spinner';
import { useHistory } from 'react-router-dom';

function Positions() {
  const showModal = useSelector((state) => state.positions.showModal);
  const modalType = useSelector((state) => state.positions.modalType);
  const [idActive, setIdActive] = useState('');
  const showMessage = useSelector((state) => state.positions.showMessage);
  const message = useSelector((state) => state.positions.messageText);
  const messageType = useSelector((state) => state.positions.messageType);
  const positions = useSelector((state) => state.positions.list);
  const isLoading = useSelector((state) => state.positions.isLoading);
  const dispatch = useDispatch();
  const history = useHistory();

  useEffect(() => {
    dispatch(getPositions());
  }, [dispatch]);

  const handleClickDelete = (id) => {
    dispatch(setShowModal(true));
    setIdActive(id);
    dispatch(setModalType('delete'));
  };

  const handleDelete = (id) => {
    dispatch(deletePositions(id)).then(() => {
      dispatch(setShowMessage(true));
      dispatch(getPositions());
    });
  };

  const handleClickUpdate = (id) => {
    dispatch(setModalType('positions'));
    setIdActive(id);
    dispatch(setShowModal(true));
  };

  const handleUpdatePosition = (position) => {
    dispatch(updatePositions(position, idActive)).then(() => {
      dispatch(setShowMessage(true));
      dispatch(getPositions());
    });
  };

  const handleClickAdd = () => {
    dispatch(setModalType('positions'));
    setIdActive('');
    dispatch(setShowModal(true));
  };

  const handleAddPosition = (position) => {
    dispatch(addPositions(position)).then(() => {
      dispatch(setShowMessage(true));
      dispatch(getPositions());
    });
  };

  const handleShowModal = () => {
    dispatch(setShowModal(false));
  };

  const handleShowMessage = () => {
    dispatch(setShowMessage(false));
  };
  const handleClickInfo = (id) => {
    history.push(`/admin/position/${id}`);
  };

  if (isLoading) return <Spinner type="ThreeDots" color="#002147" height={80} width={80} />;

  return (
    <section className={styles.container}>
      <div className={styles.list}>
        <div className={styles.boxTitle}>
          <h2>Positions</h2>
          {showMessage && (
            <Message type={messageType} message={message} showMessage={handleShowMessage} />
          )}
          <Button type="addNew" text={'POSITION'} onClick={handleClickAdd} />
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Position Name</th>
              <th>Profile Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {positions.map((position) => {
              return (
                <tr key={position._id}>
                  <td>{position.name}</td>
                  <td>{position.idProfile.length ? position.idProfile[0].name : ''}</td>
                  <td
                    className={
                      position.status === 'DONE' ? styles.statusDone : styles.statusPending
                    }
                  >
                    {position.status}
                  </td>
                  <td>
                    <Button type="delete" onClick={() => handleClickDelete(position._id)} />
                    <Button type="update" onClick={() => handleClickUpdate(position._id)} />
                    <Button type="info" onClick={() => handleClickInfo(position._id)} />
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
              : modalType === 'positions' && !idActive
              ? handleAddPosition
              : handleUpdatePosition
          }
          meta={idActive}
        />
      )}
    </section>
  );
}

export default Positions;
