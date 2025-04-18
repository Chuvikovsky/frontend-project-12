import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import useAuth from '../utils/useAuth';

const Header = () => {
  const { t } = useTranslation();
  const auth = useAuth();

  const logInBtn = (
    <button
      type="button"
      className="btn btn-primary"
      onClick={() => auth.logOut()}
    >
      {t('logOut')}
    </button>
  );

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link to="/">{t('logoHexChat')}</Link>
        {auth.user.isLoggedIn ? logInBtn : null}
      </div>
    </nav>
  );
};

export default Header;
