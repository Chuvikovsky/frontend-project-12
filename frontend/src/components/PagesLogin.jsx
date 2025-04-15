import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logIn, setUser } from "../store/authSlice";
import { logInRequest } from "../utils/requests";
import { useTranslation } from "react-i18next";
import { ToastContainer, toast } from "react-toastify";

export const PageLogin = () => {
  const dispatch = useDispatch();
  const [isAuthFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();
  const { t } = useTranslation();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      setAuthFailed(false);
      logInRequest(values) // promise
        .then((response) => {
          localStorage.setItem("token", JSON.stringify(response.data));
          dispatch(logIn());
          dispatch(setUser({ username: response.data.username }));
          navigate("/");
        })
        .catch((err) => {
          formik.setSubmitting(false);
          if (err.isAxiosError && err.response.status === 401) {
            setAuthFailed(true);
            return;
          }
          toast.error(t("networkError"));
        });
    },
  });

  return (
    <>
      <Card style={{ width: "18rem" }}>
        <h3 style={{ textAlign: "center" }}>{t("login")}</h3>
        <Form onSubmit={formik.handleSubmit} className="p-3">
          <Form.Group controlId="username" className="mb-3">
            {/*<Form.Label>{t("userName")}</Form.Label> */}
            <Form.Control
              onChange={formik.handleChange}
              value={formik.values.username}
              placeholder={t("userName")}
              name="username"
              isInvalid={isAuthFailed}
              required
            />
          </Form.Group>
          <Form.Group controlId="password">
            {/*<Form.Label>{t("password")}</Form.Label> */}
            <Form.Control
              onChange={formik.handleChange}
              value={formik.values.password}
              placeholder={t("password")}
              name="password"
              isInvalid={isAuthFailed}
              required
              type="password"
            />
            <Form.Control.Feedback type="invalid">
              {t("incorrectLogin")}
            </Form.Control.Feedback>
          </Form.Group>
          <Button type="submit" variant="primary" className="me-2 mt-2">
            {t("logInBtn")}
          </Button>
        </Form>
        <div style={{ textAlign: "center" }}>
          {t("noAccountQuestion")} <Link to="/signup">{t("registration")}</Link>
        </div>
      </Card>
      <ToastContainer />
    </>
  );
};
