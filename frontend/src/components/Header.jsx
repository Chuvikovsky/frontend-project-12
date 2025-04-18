import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { logOut } from '../store/authSlice';

const Header = () => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { t } = useTranslation();
  const handleClick = () => {
    dispatch(logOut());
  };

  const logInBtn = (
    <button type="button" className="btn btn-primary" onClick={handleClick}>
      {t('logOut')}
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
