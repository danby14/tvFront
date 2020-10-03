import React, { useContext } from 'react';

import { AuthContext } from '../../context/auth-context';

import Commissioner from './Commissioner';
import UserSettings from './UserSettings';

function Settings({ league, members, lid, networks, changes, toggles }) {
  const auth = useContext(AuthContext);

  const commissioner = league.commissioner[0].toString();
  return (
    <div className='container has-text-dark'>
      {auth.userId === commissioner ? (
        <Commissioner
          league={league}
          members={members}
          lid={lid}
          networks={networks}
          changes={changes}
          toggles={toggles}
        />
      ) : (
        <UserSettings league={league} members={members} lid={lid} />
      )}
    </div>
  );
}

export default Settings;
