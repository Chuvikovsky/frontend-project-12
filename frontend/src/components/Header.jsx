import React from "react";
import { logOut } from "../store/authSlice";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const handleClick = () => {
    dispatch(logOut());
  };

  const logInBtn = (
    <button type="button" className="btn btn-primary" onClick={handleClick}>
      Выйти
    </button>
  );

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link to="/">Hexlet Chat</Link>
        {isLoggedIn ? logInBtn : null}
      </div>
    </nav>
  );
};

export { Header };
