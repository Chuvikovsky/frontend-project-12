import React from "react";
import { Formik, Form, Field } from "formik";

export const PageNotFound = () => <h3>Page not found (404)</h3>;
export const PageIndex = () => <h3>Index Page</h3>;
export const PageLogin = () => (
  <div>
    <h3>Login Form</h3>
    <Formik
      initialValues={{ username: "", password: "" }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      <Form>
        <label htmlFor="username">User name</label>
        <Field id="username" name="username" placeholder="username"></Field>
        <br />
        <label htmlFor="password">Password</label>
        <Field id="password" name="password" placeholder="password"></Field>
        <br />
        <button type="submit">Submit</button>
      </Form>
    </Formik>
  </div>
);
