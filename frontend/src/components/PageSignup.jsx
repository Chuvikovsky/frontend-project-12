import React from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { Button, Form, Card } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { ToastContainer, toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { signupRequest } from '../utils/requests';
import { logIn } from '../store/authSlice';
import { setToken } from '../utils/localStorage';

const PageSignup = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
      confirmpassword: '',
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .required(t('required'))
        .min(3, t('from3to20Characters'))
        .max(20, t('from3to20Characters')),
      password: yup
        .string()
        .required(t('required'))
        .min(6, t('min6Characters')),
      confirmpassword: yup
        .string()
        .required(t('required'))
        .oneOf([yup.ref('password')], t('samePassword')),
    }),
    onSubmit: (values) => {
      const { username, password } = values;
      return signupRequest({ username, password })
        .then((response) => {
          setToken(JSON.stringify(response.data));
          dispatch(logIn(response.data.username));
          navigate('/');
        })
        .catch((err) => {
          formik.setSubmitting(false);
          if (err.isAxiosError && err.response.status === 401) {
            return;
          }
          if (err.isAxiosError && err.response.status === 409) {
            formik.errors.username = t('sameUser');
            return;
          }
          toast.error(t('networkError'));
        });
    },
  });

  return (
    <div className="row justify-content-center">
      <Card>
        <h3>{t('registration')}</h3>
        <Form onSubmit={formik.handleSubmit} className="p-3">
          <Form.Group controlId="username" className="mb-3">
            <Form.Label className="sr-only">{t('userName')}</Form.Label>
            <Form.Control
              onChange={formik.handleChange}
              value={formik.values.username}
              placeholder={t('userName')}
              name="username"
              isInvalid={formik.touched.username && formik.errors.username}
              required
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.username}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="password" className="mb-3">
            <Form.Label className="sr-only">{t('password')}</Form.Label>
            <Form.Control
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder={t('password')}
              name="password"
              isInvalid={formik.touched.password && formik.errors.password}
              required
              type="password"
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.password}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group controlId="confirmpassword" className="mb-3">
            <Form.Label className="sr-only">{t('confirmPassword')}</Form.Label>
            <Form.Control
              onChange={formik.handleChange}
              value={formik.values.confirmpassword}
              placeholder={t('confirmPassword')}
              name="confirmpassword"
              isInvalid={
                formik.touched.confirmpassword && formik.errors.confirmpassword
              }
              required
              type="password"
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.confirmpassword}
            </Form.Control.Feedback>
          </Form.Group>
          <Button
            type="submit"
            variant="primary"
            className="me-2 mt-2"
            disabled={formik.isSubmitting}
          >
            {t('register')}
          </Button>
        </Form>
      </Card>
      <ToastContainer />
    </div>
  );
};

export default PageSignup;
