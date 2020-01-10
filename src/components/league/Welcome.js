import React from 'react';

const Welcome = () => {
  return (
    <div>
      <h1>Welcome to {league.leagueName}. </h1>
      <div>
        <h3>members:</h3>
        {members.map(member => (
          <p key={member.memberId}>{member.username}</p>
        ))}
      </div>
      <div>
        <h3>commissioner:</h3>
        {commissioner.username}
      </div>
    </div>
  );
};

export default Welcome;
