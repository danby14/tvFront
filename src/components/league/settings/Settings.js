import React, { useContext } from 'react';

import { AuthContext } from '../../context/auth-context';

import Commissioner from './Commissioner';
import UserSettings from './UserSettings';

function Settings({ league }) {
  const auth = useContext(AuthContext);

  const commissioner = league.commissioner[0].toString();
  return (
    <div className='container has-text-dark has-text-centered'>
      {auth.userId === commissioner ? <Commissioner /> : <UserSettings />}
    </div>
  );
}

export default Settings;
