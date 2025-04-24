import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ButtonGroup, Dropdown } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import getModal from '../modals/index';
import { changeChannel } from '../store/channelsSlice';
import { setModalType } from '../store/modalSlice';

const Channels = ({ channels, inputRef }) => {
  // const [modalInfo, setModalInfo] = useState({ type: null, item: null });
  const dispatch = useDispatch();
  const { t } = useTranslation();
  const notify = (type, text) => {
    toast[type](t(text), { toastId: 'channel', containerId: 'channel' });
  };
  const currentChannelId = useSelector(
    (state) => state.channels.currentChannelId,
  );
  const handleChangeChannel = (channel) => {
    dispatch(changeChannel(channel.id));
  };

  // const onHide = () => {
  //   setModalInfo({ type: null, item: null });
  // };

  const renderModal = () => {
    const { type, channel } = useSelector((state) => state.modal);
    if (type === null) {
      return null;
    }
    const Modal = getModal(type);
    return <Modal channel={channel} notify={notify} />;
  };

  const channelClass = (id) => {
    const selectedChannel = id === currentChannelId ? ' btn-secondary' : '';
    return `w-100 rounded-0 text-start btn${selectedChannel}`;
  };

  const showNonRemovableChannel = (ch) => (
    <button
      type="button"
      className={channelClass(ch.id)}
      onClick={() => handleChangeChannel(ch)}
    >
      #
      {' '}
      {ch.name}
    </button>
  );

  const showRemovableChannel = (ch) => (
    <Dropdown as={ButtonGroup} className="w-100">
      <button
        type="button"
        className={channelClass(ch.id)}
        onClick={() => handleChangeChannel(ch)}
      >
        #
        {' '}
        {ch.name}
      </button>
      <Dropdown.Toggle
        split
        id="dropdown-split-basic"
        variant={ch.id === currentChannelId ? 'secondary' : 'light'}
        aria-label={t('channelManagement')}
      >
        <span className="sr-only">{t('channelManagement')}</span>
      </Dropdown.Toggle>
      <Dropdown.Menu>
        <Dropdown.Item
          onClick={() => dispatch(setModalType({ type: 'removing', channel: ch }))}
        >
          {t('remove')}
        </Dropdown.Item>
        <Dropdown.Item
          onClick={() => dispatch(setModalType({ type: 'renaming', channel: ch }))}
        >
          {t('rename')}
        </Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>
  );

  useEffect(() => {
    inputRef.current.focus();
  }, [currentChannelId, inputRef]);

  return (
    <>
      <div className="d-flex mt-1 justify-content-between mb-2 ps-4 pe-2 p-4">
        <b>{t('channels')}</b>
        <button
          type="button"
          className="p-0 text-primary btn btn-group-vertical"
          onClick={() => dispatch(setModalType({ type: 'adding', item: null }))}
        >
          +
        </button>
        {renderModal()}
      </div>
      <ul className="nav flex-column nav-pills nav-fill px-2 mb-3 overflow-auto h-100 d-block">
        {channels.map((ch) => (
          <li key={ch.id} className="nav-item w-100">
            {ch.removable
              ? showRemovableChannel(ch)
              : showNonRemovableChannel(ch)}
          </li>
        ))}
      </ul>
      <ToastContainer containerId="channel" />
    </>
  );
};

export default Channels;
