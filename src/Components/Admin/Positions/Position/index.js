import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from 'Components/Shared/Button';
import style from './position.module.css';
import { useParams } from 'react-router-dom/cjs/react-router-dom.min';
import { getOnePosition, updatePositions } from 'redux/Positions/thunks';
import Modal from 'Components/Shared/Modal';
import { setShowModal, setShowMessage, setModalType } from 'redux/Positions/actions';
import { Link } from 'react-router-dom';
import Spinner from 'Components/Shared/Spinner';

function Position() {
  const position = useSelector((store) => store.positions.position);
  const showModal = useSelector((state) => state.positions.showModal);
  const modalType = useSelector((state) => state.positions.modalType);
  const isLoading = useSelector((state) => state.positions.isLoading);

  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOnePosition(id));
  }, [dispatch]);

  const handleShowModal = () => {
    dispatch(setShowModal(false));
    dispatch(getOnePosition(id));
  };
  const handleClickUpdate = () => {
    dispatch(setModalType('positions'));
    dispatch(setShowModal(true));
  };

  const handleUpdatePosition = (position) => {
    dispatch(updatePositions(position, id)).then(() => {
      dispatch(setShowMessage(true));
      dispatch(getOnePosition(id));
    });
  };
  if (isLoading) return <Spinner type="ThreeDots" color="#002147" height={80} width={80} />;
  return (
    <section className={style.container}>
      <div className={style.profile}>
        <div className={style.header}>
          <Link to="/admin/positions">
            <div>
              <Button type={'backBtnAdmin'} />
            </div>
          </Link>
          <div className={style.headercolumn}>
            <h2>Position</h2>
          </div>
          <div></div>
        </div>

        <div className={style.box}>
          <div className={style.info}>
            <div className={style.flexRow}>
              <div className={style.infoColumn}>
                <div>
                  <h4 className={style.infoType}>Position:</h4>
                  <span>{position.name}</span>
                </div>
                <div>
                  <h4 className={style.infoType}>Client:</h4>
                  <span>{position.idClient?.name}</span>
                </div>
                <div>
                  <h4 className={style.infoType}>Profiles:</h4>
                  {position.idProfile?.map((profile) => {
                    return <span key={profile._id}>{profile.name}</span>;
                  })}
                </div>
              </div>
              <div className={style.statusBox}>
                <span>Status</span>
                <p
                  className={
                    position.status === 'DONE'
                      ? style.statusActive
                      : position.status === 'PENDING'
                      ? style.statusInactive
                      : style.statusPending
                  }
                >
                  {position.status}
                </p>
              </div>
            </div>
            <div className={style.infoColumn}>
              <div>
                <h4 className={style.infoType}>Location:</h4>
                <span>
                  {position.address}, {position.city}, {position.postalCode}
                </span>
              </div>
              <div>
                <h4 className={style.infoType}>About:</h4>
                <span>{position.description}</span>
              </div>
            </div>
          </div>
          <div className={style.footer}>
            <Button type={'editInfo'} onClick={handleClickUpdate} />
          </div>
        </div>
      </div>
      {showModal && (
        <Modal
          handleShowModal={handleShowModal}
          modalType={modalType}
          handleSubmit={handleUpdatePosition}
          meta={id}
        />
      )}
    </section>
  );
}

export default Position;
