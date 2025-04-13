import React, { useEffect, useRef } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import {
  addChannelRequest,
  renameChannelRequest,
} from "../../utils/requests.js";

const getAllChannelNames = () => {
  const channels = useSelector((state) => state.channels.channelsList);
  const names = channels.map((ch) => ch.name);
  return names;
};

const AddChannel = ({ channel = null, onHide }) => {
  const isAddModal = channel === null;
  const inputRef = useRef(null);
  const formik = useFormik({
    initialValues: {
      channelname: isAddModal ? "" : channel.name,
    },
    validationSchema: yup.object({
      channelname: yup
        .string()
        .required("Required")
        .min(3, "Must be at least 3 characters or more")
        .max(20, "Must be 20 characters or less")
        .notOneOf(getAllChannelNames(), "This channel name is already used"),
    }),
    validateOnChange: false,
    onSubmit: (values) => {
      if (isAddModal) {
        addChannelRequest(values.channelname) // promise
          .then(() => {
            onHide();
          })
          .catch((err) => {
            console.log(err);
          });
      } else {
        renameChannelRequest({
          channelId: channel.id,
          channelname: values.channelname,
        }) // promise
          .then(() => {
            onHide();
          })
          .catch((err) => console.log(err));
      }
    },
  });

  useEffect(() => {
    inputRef.current.select();
    inputRef.current.focus();
  }, []);

  return (
    <Modal show>
      <Modal.Header closeButton onHide={onHide}>
        <Modal.Title>
          {isAddModal ? "Add Channel" : "Rename Channel"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="channel name"
              name="channelname"
              onChange={formik.handleChange}
              value={formik.values.channelname}
              ref={inputRef}
              isInvalid={
                formik.touched.channelname && formik.errors.channelname
              }
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.channelname}
            </Form.Control.Feedback>
            <div className="d-flex justify-content-end">
              <Button className="me-2 mt-2" variant="danger" onClick={onHide}>
                Cancel
              </Button>
              <Button className="me-2 mt-2" variant="primary" type="submit">
                {isAddModal ? "Add" : "Rename"}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
