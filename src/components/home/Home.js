import React from 'react';
import { Link } from 'react-router-dom';

import BattleForFirst from '../../assets/BattleForFirst';

const Home = () => {
  return (
    <div className='columns is-gapless has-text-grey-dark is-size-3'>
      <div className='column'></div>
      <div className='column has-text-grey-dark is-size-6 is-size-5-desktop is-10-tablet is-8-desktop is-7-widescreen is-6-fullhd has-text-justified'>
        <div className='has-text-centered pb-3'>
          <BattleForFirst size={65} />
        </div>
        <div className='pb-5'>
          <p className='is-size-5 is-size-4-desktop has-text-weight-bold pb-2'>
            Prove you are the BEST network exec out there.
          </p>
          <p className=''>
            Do friends, family members, coworkers, sworn enemies, or random groups of people on the
            internet think they know more than you? If so, here's your chance to prove them wrong.
          </p>
        </div>

        <div className='pb-5'>
          <p className='is-size-5 is-size-4-desktop has-text-weight-bold pb-2'>How?</p>
          <p className='pb-3'>
            New tv shows get released every year. You see the trailers for them and know right then
            and there which ones are going to live on in infamy and which ones will get cancelled
            before the pilot even airs.
          </p>
          <p className=''>
            Well, here's your chance to predict how long these new shows will last and be able to
            compare those results with those of your friends, family, coworkers, and so-called
            experts from the internet who said you were all talk.
          </p>
        </div>
        <div className='pb-2'>
          <p className='is-size-5 is-size-4-desktop has-text-weight-bold pb-2'>
            Is it too late to start?
          </p>
          <p className='pb-5'>
            You only compete vs the members in your group(max of 10). And since your groups
            predictions all get set in stone at the same time, it is never too late in the year to
            get a league going.
          </p>
          <p className='is-size-5 is-size-4-desktop has-text-weight-bold pb-5'>So don't delay..</p>
          <p className='has-text-centered'>
            <Link to='/Auth' className=''>
              <button className='button is-info is-rounded'>Start Predicting Today!</button>
            </Link>
          </p>
        </div>
      </div>
      <div className='column'></div>
    </div>
  );
};

export default Home;
