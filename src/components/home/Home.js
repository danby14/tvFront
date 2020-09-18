import React from 'react';
import BattleForFirst from '../../assets/BattleForFirst';

const Home = () => {
  return (
    <div className='columns has-text-grey-dark is-size-3 is-mobile'>
      <div className='column'></div>
      <div className='column has-text-grey-dark is-size-5 is-11-mobile is-1-tablet is-9-desktop is-1-widescreen is-6-fullhd'>
        <div className='has-text-centered pb-3'>
          <BattleForFirst size={72} />
        </div>
        <div className='pb-5'>
          <p className='is-size-4 has-text-weight-bold'>
            Prove you are the BEST network exec out there.
          </p>
          <p className=''>
            Do friends, family members, coworkers, sworn enemies, or random groups of people on the
            internet think they know more than you? If so, here's your chance to prove them wrong.
          </p>
        </div>

        <div>
          <p className='is-size-4 has-text-weight-bold'>How?</p>
          <p className='pb-3'>
            New tv shows get released every year. You see the trailers for them and know right then
            and there which ones are going to live on in infamy and which ones will be cancelled
            before the pilot airs.
          </p>
          <p className='pb-3'>Why didn't the networks listen to you?</p>
          <p className='pb-3'>
            Well, here's your chance to predict how long these new shows will last. Then compare
            your results to those friends, family, coworkers, and so-called experts on the internet
            that said you were all talk.
          </p>
        </div>
        <button>Sign Up Now</button>
      </div>
      <div className='column'></div>
    </div>
  );
};

export default Home;
