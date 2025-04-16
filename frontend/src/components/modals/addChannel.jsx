import React, { useEffect, useRef } from "react";
import { Modal, Form, Button } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import { useSelector } from "react-redux";
import {
  addChannelRequest,
  renameChannelRequest,
} from "../../utils/requests.js";
import { useTranslation } from "react-i18next";
import filter from "../../utils/profany.js";

const getAllChannelNames = () => {
  const channels = useSelector((state) => state.channels.channelsList);
  const names = channels.map((ch) => ch.name);
  return names;
};

const AddChannel = ({ channel = null, onHide, notify }) => {
  const isAddModal = channel === null;
  const inputRef = useRef(null);
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      channelname: isAddModal ? "" : channel.name,
    },
    validationSchema: yup.object({
      channelname: yup
        .string()
        .required(t("required"))
        .min(3, t("min3Characters"))
        .max(20, t("max20Characters"))
        .notOneOf(getAllChannelNames(), t("sameChannelName")),
    }),
    validateOnChange: false,
    onSubmit: (values) => {
      const filteredName = filter(values.channelname);
      if (filteredName !== values.channelname) {
        formik.setErrors({ channelname: t("forbiddenWord") });
        formik.setValues({ channelname: filteredName });
        formik.setSubmitting(false);
        return;
      }
      if (isAddModal) {
        return addChannelRequest(filteredName) // promise
          .then(() => {
            onHide();
            notify("success", "channelCreated");
          })
          .catch(() => {
            formik.setSubmitting(false);
            notify("error", "networkError");
          });
      } else {
        return renameChannelRequest({
          channelId: channel.id,
          channelname: filteredName,
        }) // promise
          .then(() => {
            onHide();
            notify("success", "channelRenamed");
          })
          .catch(() => {
            formik.setSubmitting(false);
            notify("error", "networkError");
          });
      }
    },
  });

  useEffect(() => {
    inputRef.current.select();
    inputRef.current.focus();
  }, []);

  return (
    <>
      <Modal show>
        <Modal.Header closeButton onHide={onHide}>
          <Modal.Title>
            {isAddModal ? t("addChannel") : t("renameChannel")}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={formik.handleSubmit}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder={t("channelName")}
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
                  {t("cancel")}
                </Button>
                <Button
                  className="me-2 mt-2"
                  variant="primary"
                  type="submit"
                  disabled={formik.isSubmitting}
                >
                  {t("send")}
                </Button>
              </div>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddChannel;
