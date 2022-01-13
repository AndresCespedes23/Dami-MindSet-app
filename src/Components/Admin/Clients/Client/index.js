import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'Components/Shared/Button';
import style from './client.module.css';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import Modal from 'Components/Shared/Modal';
import { setShowModal, setShowMessage, setModalType } from 'redux/Positions/actions';
import { Link, useHistory } from 'react-router-dom';
// import Spinner from 'Components/Shared/Spinner';
import { getOneClients, updateClient } from 'redux/Clients/thunks';
import { addPositions, getClientPositions } from 'redux/Positions/thunks';

function Client() {
  const client = useSelector((store) => store.clients.client);
  const clientPositions = useSelector((store) => store.positions.list);
  const showModal = useSelector((state) => state.clients.showModal);
  const modalType = useSelector((state) => state.clients.modalType);
  // const isLoadingClient = useSelector((state) => state.clients.isLoading);
  // const isLoadingPosition = useSelector((state) => state.positions.isLoading);
  const history = useHistory();
  const [idActive, setIdActive] = useState('');

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOneClients(id));
    dispatch(getClientPositions(id));
  }, [dispatch]);

  const handleShowModal = () => {
    dispatch(setShowModal(false));
    dispatch(getOneClients(id));
  };
  const handleClickUpdate = () => {
    setIdActive(id);
    dispatch(setModalType('clients'));
    dispatch(setShowModal(true));
  };

  const handleUpdateClient = (client) => {
    dispatch(updateClient(client, id)).then(() => {
      dispatch(setShowMessage(true));
      dispatch(getOneClients(id));
    });
    setIdActive('');
  };
  const handleClickAddPosition = () => {
    dispatch(setModalType('positions'));
    dispatch(setShowModal(true));
  };
  const handleAddPosition = (position) => {
    position.idClient = id;
    dispatch(addPositions(position)).then(() => {
      dispatch(setShowMessage(true));
      dispatch(getClientPositions(id));
    });
    setIdActive('');
  };
  const goDetails = (id) => {
    history.push(`/admin/position/${id}`);
  };
  // if (isLoadingClient || isLoadingPosition) return <Spinner type="ThreeDots" color="#002147" height={80} width={80} />;
  return (
    <section className={style.container}>
      <div className={style.profile}>
        <div className={style.header}>
          <Link to="/admin/clients">
            <div>
              <Button type={'backBtnAdmin'} />
            </div>
          </Link>
          <div className={style.headercolumn}>
            <h2 className={style.mainTile}>Client</h2>
          </div>
          <div></div>
        </div>
        <div className={style.footer}>
          <Button type={'editInfo'} onClick={handleClickUpdate} />
        </div>
        <div className={style.personContainer}>
          <div className={style.boxImg}>
            <img
              className={style.loginphoto}
              src={`${process.env.PUBLIC_URL}/assets/images/nophotouser.png`}
            />
            <h3 className={style.nameTitle}>{client.name}</h3>
            <span className={style[client.isDeleted?.toString()]}>
              {client.isDeleted === true ? 'INACTIVE' : 'ACTIVE'}
            </span>
          </div>
          <div className={style.boxInfo}>
            <div className={style.columnContainer}>
              <div className={style.infoContainer}>
                <h4 className={style.titleInfo}>Name:</h4>
                <span className={style.infoData}>{client.name}</span>
              </div>
              <div className={style.infoContainer}>
                <h4 className={style.titleInfo}>Email:</h4>
                <span className={style.infoData}>{client.email}</span>
              </div>
              <div className={style.infoContainer}>
                <h4 className={style.titleInfo}>Contact:</h4>
                <span className={style.infoData}>{client.phoneNumber}</span>
              </div>
              <div className={style.infoContainer}>
                <h4 className={style.titleInfo}>CUIT:</h4>
                <span className={style.infoData}>{client.cuit}</span>
              </div>
              <div className={style.infoContainer}>
                <h4 className={style.titleInfo}>Address:</h4>
                <span className={style.infoData}>{client.address}</span>
              </div>
              <div className={style.infoContainer}>
                <h4 className={style.titleInfo}>Activity:</h4>
                <span className={style.infoData}>{client.activity}</span>
              </div>
            </div>
          </div>
        </div>
        <div className={style.positionContainer}>
          <div className={style.positionHeader}>
            <h4 className={style.positionTitle}>Open Positions</h4>
            <Button type="addNew" onClick={handleClickAddPosition} />
          </div>
          <div className={style.positionTable}>
            <table className={style.table}>
              <tbody>
                {clientPositions.map((position) => {
                  return (
                    <tr key={position._id}>
                      <td>{position.name}</td>
                      <td>{position.idProfile.length ? position.idProfile[0].name : ''}</td>
                      <td className={style.btnContainer}>
                        <button
                          className={style.btnDetails}
                          onClick={() => goDetails(position._id)}
                        >
                          DETAILS
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
      {showModal && (
        <Modal
          handleShowModal={handleShowModal}
          modalType={modalType}
          handleSubmit={modalType === 'clients' ? handleUpdateClient : handleAddPosition}
          meta={idActive}
          fixData={id}
        />
      )}
    </section>
  );
}

export default Client;
