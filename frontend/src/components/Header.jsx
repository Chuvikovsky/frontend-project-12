import React from "react";
import { logOut } from "../store/authSlice";
import { useDispatch } from "react-redux";
// import { Button } from "react-bootstrap";

const Header = () => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(logOut());
  };
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a className="navbar-brand" href="/">
          Hexlet Chat
        </a>
        <button type="button" className="btn btn-primary" onClick={handleClick}>
          Выйти
        </button>
      </div>
    </nav>
  );
};

export { Header };
