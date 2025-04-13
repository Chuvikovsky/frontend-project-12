import React from "react";
import { Modal, Button } from "react-bootstrap";
import { removeChannelRequest } from "../../utils/requests.js";

const RemoveChannel = ({ channel, onHide }) => {
  const handleRemove = () => {
    console.log("handleRemove");
    removeChannelRequest(channel.id) // promise
      .then(() => {
        onHide();
      })
      .catch((err) => console.log(err));
  };

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>Remove Channel # {channel.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <div className="d-flex justify-content-end">
          <Button className="me-2 mt-2" variant="danger" onClick={onHide}>
            Cancel
          </Button>
          <Button
            className="me-2 mt-2"
            variant="primary"
            type="submit"
            onClick={handleRemove}
          >
            Remove
          </Button>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default RemoveChannel;
