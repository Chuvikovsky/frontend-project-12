import { useEffect, useRef } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  addChannelRequest,
  renameChannelRequest,
} from '../utils/requests.js';
import {
  addChannel,
  changeChannel,
  channelSelectors,
} from '../store/channelsSlice.js';
import { closeModal } from '../store/modalSlice.js';
import filter from '../utils/profany.js';

const AddChannel = ({ channel = null, notify }) => {
  const isAddModal = channel === null;
  const inputRef = useRef(null);
  const dispatch = useDispatch();
  const { t } = useTranslation();

  const allChannelNames = useSelector(channelSelectors.selectAll).map(
    ch => ch.name,
  );

  const formik = useFormik({
    initialValues: {
      channelname: isAddModal ? '' : channel.name,
    },
    validationSchema: yup.object({
      channelname: yup
        .string()
        .required(t('required'))
        .min(3, t('from3to20Characters'))
        .max(20, t('from3to20Characters'))
        .notOneOf(allChannelNames, t('sameChannelName')),
    }),
    validateOnChange: false,
    onSubmit: (values) => {
      const filteredName = filter(values.channelname);
      return isAddModal
        ? addChannelRequest(filteredName)
            .then((response) => {
              dispatch(addChannel(response.data));
              return response;
            })
            .then((response) => {
              dispatch(changeChannel(response.data.id));
              dispatch(closeModal());
              notify('success', 'channelCreated');
            })
            .catch(() => {
              formik.setSubmitting(false);
              notify('error', 'networkError');
            })
        : renameChannelRequest({
            channelId: channel.id,
            channelname: filteredName,
          })
            .then(() => {
              dispatch(closeModal());
              notify('success', 'channelRenamed');
            })
            .catch(() => {
              formik.setSubmitting(false);
              notify('error', 'networkError');
            });
    },
  });

  useEffect(() => {
    inputRef.current.select();
    inputRef.current.focus();
  }, []);

  return (
    <Modal show>
      <Modal.Header closeButton>
        <Modal.Title>
          {isAddModal ? t('addChannel') : t('renameChannel')}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group controlId="channelname">
            <Form.Label className="sr-only">{t('channelName')}</Form.Label>
            <Form.Control
              type="text"
              placeholder={t('channelName')}
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
              <Button
                className="me-2 mt-2"
                variant="secondary"
                onClick={() => dispatch(closeModal())}
              >
                {t('cancel')}
              </Button>
              <Button
                className="me-2 mt-2"
                variant="primary"
                type="submit"
                disabled={formik.isSubmitting}
              >
                {t('send')}
              </Button>
            </div>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddChannel;
