import React, { useState } from "react";
import { useFormik } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { Button, Form, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { logIn, setUser } from "../store/authSlice";
import { signupRequest } from "../utils/requests";

export const PageSignup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      username: "",
      password: "",
      confirmpassword: "",
    },
    validationSchema: yup.object({
      username: yup
        .string()
        .required("Required")
        .min(3, "Must be at least 3 characters or more")
        .max(20, "Must be 20 characters or less"),
      password: yup
        .string()
        .required("Required")
        .min(6, "Must be at least 6 characters or more"),
      confirmpassword: yup
        .string()
        .required("Required")
        .oneOf([yup.ref("password")], "not equial to password"),
    }),
    onSubmit: (values) => {
      const { username, password } = values;
      signupRequest({ username, password }) // promise
        .then((response) => {
          localStorage.setItem("token", JSON.stringify(response.data));
          dispatch(logIn());
          dispatch(setUser({ username: response.data.username }));
          navigate("/");
        })
        .catch((err) => {
          formik.setSubmitting(false);
          if (err.isAxiosError && err.response.status === 401) {
            return;
          }
          if (err.isAxiosError && err.response.status === 409) {
            formik.errors.username = "User already exists";
            return;
          }
          throw err;
        });
    },
  });

  return (
    <Card style={{ width: "18rem" }}>
      <h3 style={{ textAlign: "center" }}>Signup</h3>
      <Form onSubmit={formik.handleSubmit} className="p-3">
        <Form.Group controlId="username">
          <Form.Label>User name</Form.Label>
          <Form.Control
            onChange={formik.handleChange}
            value={formik.values.username}
            placeholder="username"
            name="username"
            isInvalid={formik.touched.username && formik.errors.username}
            required
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.username}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Label>Password</Form.Label>
          <Form.Control
            onChange={formik.handleChange}
            value={formik.values.password}
            placeholder="password"
            name="password"
            isInvalid={formik.touched.password && formik.errors.password}
            required
            type="password"
          />
          <Form.Control.Feedback type="invalid">
            {formik.errors.password}
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group controlId="confirmpassword">
          <Form.Label>Confirm password</Form.Label>
          <Form.Control
            onChange={formik.handleChange}
            value={formik.values.confirmpassword}
            placeholder="confirm password"
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
        <Button type="submit" variant="primary" className="me-2 mt-2">
          Register
        </Button>
      </Form>
    </Card>
  );
};
