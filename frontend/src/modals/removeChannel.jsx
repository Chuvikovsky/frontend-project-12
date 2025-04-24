import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { removeChannelRequest } from '../utils/requests.js';
import { closeModal } from '../store/modalSlice.js';

const RemoveChannel = ({ channel, notify }) => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const handleRemove = () => {
    removeChannelRequest(channel.id)
      .then(() => {
        dispatch(closeModal());
        notify('success', 'channelRemoved');
      })
      .catch(() => {
        notify('error', 'networkError');
      });
  };

  return (
    <Modal show>
      <Modal.Header closeButton onHide={() => dispatch(closeModal())}>
        <Modal.Title>
          {t('removeChannel')}
          {' '}
          #
          {' '}
          {channel.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{t('areYouSureQuestion')}</Modal.Body>
      <Modal.Footer>
        <div className="d-flex justify-content-end">
          <Button className="me-2 mt-2" variant="secondary" onClick={() => dispatch(closeModal())}>
            {t('cancel')}
          </Button>
          <Button
            className="me-2 mt-2"
            variant="danger"
            type="submit"
            onClick={handleRemove}
          >
            {t('remove')}
          </Button>
        </div>
      </Modal.Footer>
    </Modal>
  );
};

export default RemoveChannel;
