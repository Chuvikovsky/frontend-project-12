import React, { useState } from "react";
import { useFormik } from "formik";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Button, Form, Card } from "react-bootstrap";
import routes from "../utils/routes";
import { useSelector, useDispatch } from "react-redux";
import { logIn, logOut, setUser } from "../store/authSlice";

export const PageLogin = () => {
  const dispatch = useDispatch();
  const [isAuthFailed, setAuthFailed] = useState(false);
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
    },
    onSubmit: (values) => {
      setAuthFailed(false);
      axios
        .post(routes.loginPath(), values)
        .then((response) => {
          localStorage.setItem("token", JSON.stringify(response.data));
          dispatch(logIn());
          dispatch(setUser({ username: response.data.username }));
          navigate("/");
        })
        .catch((err) => {
          formik.setSubmitting(false);
          console.log(err);
          if (err.isAxiosError && err.response.status === 401) {
            setAuthFailed(true);
            return;
          }
          throw err;
        });
    },
  });

  return (
    <Card style={{ width: "18rem" }}>
      <Form onSubmit={formik.handleSubmit} className="p-3">
        <Form.Group controlId="username">
          <Form.Label>User name</Form.Label>
          <Form.Control
            onChange={formik.handleChange}
            value={formik.values.username}
            placeholder="username"
            name="username"
            isInvalid={isAuthFailed}
            required
          />
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="password"
            name="password"
            isInvalid={isAuthFailed}
            required
            type="password"
          />
          <Form.Control.Feedback type="invalid">
            the username or password is incorrect
          </Form.Control.Feedback>
        </Form.Group>
        <Button type="submit" variant="primary">
          Submit
        </Button>
      </Form>
    </Card>
  );
};
