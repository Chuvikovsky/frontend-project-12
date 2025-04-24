import React, { useState } from 'react';
import { useFormik } from 'formik';
import { useNavigate, Link } from 'react-router-dom';
import { Button, Form, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { logInRequest } from '../utils/requests';
import { logIn } from '../store/authSlice';
import { setToken } from '../utils/localStorage';

const PageLogin = () => {
  const [isAuthFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    onSubmit: (values) => {
      setAuthFailed(false);
      return logInRequest(values)
        .then((response) => {
          setToken(JSON.stringify(response.data));
          dispatch(logIn(response.data.username));
          navigate('/');
        })
        .catch((err) => {
          formik.setSubmitting(false);
          if (err.isAxiosError && err.response.status === 401) {
            setAuthFailed(true);
            return;
          }
          toast.error(t('networkError'));
        });
    },
  });

  return (
    <div className="row justify-content-center">
      <Card>
        <h3>{t('login')}</h3>
        <Form onSubmit={formik.handleSubmit} className="p-3">
          <Form.Group controlId="username" className="mb-3">
            <Form.Label className="sr-only">{t('userNick')}</Form.Label>
            <Form.Control
              onChange={formik.handleChange}
              value={formik.values.username}
              placeholder={t('userNick')}
              name="username"
              isInvalid={isAuthFailed}
              required
            />
          </Form.Group>
          <Form.Group controlId="password">
            <Form.Label className="sr-only">{t('password')}</Form.Label>
            <Form.Control
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder={t('password')}
              name="password"
              isInvalid={isAuthFailed}
              required
              type="password"
            />
            <Form.Control.Feedback type="invalid">
              {t('incorrectLogin')}
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            className="me-2 mt-2"
            disabled={formik.isSubmitting}
          >
            {t('logInBtn')}
          </Button>
        </Form>
        <div style={{ textAlign: 'center' }}>
          {t('noAccountQuestion')}
          {' '}
          <Link to="/signup">
            {t('registration')}
          </Link>
        </div>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default PageLogin;
