import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { removeChannelRequest } from '../../utils/requests.js';

const RemoveChannel = ({ channel, onHide, notify }) => {
  const { t } = useTranslation();
  const handleRemove = () => {
    removeChannelRequest(channel.id) // promise
      .then(() => {
        onHide();
        notify('success', 'channelRemoved');
      })
      .catch(() => {
        notify('error', 'networkError');
      });
  };

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>
          {t('removeChannel')} # {channel.name}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{t('areYouSureQuestion')}</Modal.Body>
      <Modal.Footer>
        <div className="d-flex justify-content-end">
          <Button className="me-2 mt-2" variant="secondary" onClick={onHide}>
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
