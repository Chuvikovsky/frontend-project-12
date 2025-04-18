import { useContext } from 'react';

import authContext from '../store/authContext';

const useAuth = () => useContext(authContext);

export default useAuth;
