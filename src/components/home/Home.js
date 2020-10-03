import React from 'react';
import { Link } from 'react-router-dom';
import {
  GiPodiumWinner,
  GiPayMoney,
  GiSportMedal,
  GiSandsOfTime,
  GiThink,
  GiShrug,
} from 'react-icons/gi';

import BattleForFirst from '../../assets/BattleForFirst';

const Home = () => {
  return (
    <div id='home-container'>
      <div id='home-main-fix' className='columns has-text-dark is-centered is-gapless'>
        <div className='column has-text-centered-mobile is-5-tablet is-4-desktop is-relatively-higher'>
          <p className='title has-text-dark is-size-3-mobile is-size-2-desktop pb-2 '>
            Put your TV watching skills to the test.
          </p>
          <p className='subtitle has-text-grey is-size-5-mobile pb-2'>
            Watch trailers for new shows, predict how long they are going to last, and see which one
            of your friends comes out on top.
          </p>
          <Link to='/Auth' className='is-bottom-left pb-5'>
            <button className='button is-info is-rounded is-medium'>Join PredictTV now</button>
          </Link>
        </div>
        <div className='column is-flex is-6-tablet is-5-desktop mt-3 is-smaller-mobile'>
          <BattleForFirst size='100' />
        </div>
      </div>
      <div className='px-5 py-4 has-background-info'>
        <div className='container has-text-centered'>
          <p className='title is-5-mobile is-4 has-text-light'>
            "I enjoy watching TV again! Thanks PredictTV"
          </p>
          <p className='subtitle is-6-mobile is-5 has-text-light'>- Fake Reviewer</p>
        </div>
      </div>
      <div className='section'>
        <div className='container is-widescreen'>
          <h2 className='is-size-3 has-text-weight-semibold has-text-centered has-text-dark pt-2 pb-1'>
            Undecided? Here's some more info and why almost two people use PredictTV
          </h2>
          <div className='columns is-centered has-text-dark is-size-5'>
            <div className='column is-5 features-width'>
              <div className='my-6 is-flex'>
                <div className='m-auto'>
                  <GiPodiumWinner size='30px' color='hsl(204, 86%, 53%)' className='mr-5' />
                </div>

                <div>
                  <p className='has-text-weight-semibold'>
                    Get to prove you are the BEST network exec.
                  </p>
                  <p className='has-text-grey'>
                    Do friends, family members, coworkers, sworn enemies, or random groups of people
                    on the internet think they know more than you? If so, here's your chance to
                    prove them wrong.
                  </p>
                </div>
              </div>
              <div className='my-6 is-flex'>
                <div className='m-auto'>
                  <GiPayMoney size='30px' color='hsl(204, 86%, 53%)' className='mr-5' />
                </div>
                <div>
                  <p className='has-text-weight-semibold'>How much does it cost to play?</p>
                  <p className='has-text-grey'>
                    I'll speak to my manager and see what kind of deal I can work out for you.. He
                    said he doesn't exist. So you better hurry and sign up before he changes his
                    mind.
                  </p>
                </div>
              </div>
              <div className='my-6 is-flex'>
                <div className='m-auto'>
                  <GiSportMedal size='30px' color='hsl(204, 86%, 53%)' className='mr-5' />
                </div>
                <div>
                  <p className='has-text-weight-semibold'>What do I get for winning?</p>
                  <p className='has-text-grey'>
                    Either whatever you make your group members buy for you OR accused of cheating.
                    Probably the latter. People are jelly.
                  </p>
                </div>
              </div>
            </div>
            <div className='column is-5 features-width'>
              <div className='my-6 is-flex '>
                <div className='m-auto'>
                  <GiShrug size='30px' color='hsl(204, 86%, 53%)' className='mr-5' />
                </div>
                <div>
                  <p className='has-text-weight-semibold'>How do I play?</p>
                  <p className='has-text-grey'>
                    New tv shows get released every year. You just have to watch the trailers for
                    them and use your crystal ball to predict how long they are going to last.
                    Simple as that.
                  </p>
                </div>
              </div>
              <div className='my-6 is-flex'>
                <div className='m-auto'>
                  <GiSandsOfTime size='30px' color='hsl(204, 86%, 53%)' className='mr-5' />
                </div>
                <div>
                  <p className='has-text-weight-semibold'>Is it too late to start?</p>
                  <p className='has-text-grey'>
                    You only compete vs the members in your group(max of 10). And your groups
                    predictions all get set in stone at the same time, so it is never too late to
                    get a league going.
                  </p>
                </div>
              </div>
              <div className='my-6 is-flex'>
                <div className='m-auto'>
                  <GiThink size='30px' color='hsl(204, 86%, 53%)' className='mr-5' />
                </div>
                <div>
                  <p className='has-text-weight-semibold'>I still need to know more.</p>
                  <p className='has-text-grey'>
                    Click here to see more of our frequently asked questions. Or here if you want to
                    contact us directly.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
