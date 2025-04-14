import React, { useState } from "react";
import { useFormik } from "formik";
import { useNavigate, Link } from "react-router-dom";
import { Button, Form, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logIn, setUser } from "../store/authSlice";
import { logInRequest } from "../utils/requests";

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
      logInRequest(values) // promise
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
      <h3 style={{ textAlign: "center" }}>Login</h3>
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
        <Button type="submit" variant="primary" className="me-2 mt-2">
          Submit
        </Button>
      </Form>
      <div style={{ textAlign: "center" }}>
        no account? <Link to="/signup">register</Link>
      </div>
    </Card>
  );
};
