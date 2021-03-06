import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ResendConfirmation from '../user/ResendConfirmation';
import Modal from '../shared/Modal';

const Help = () => {
  const [openResend, setOpenResend] = useState(null);
  const [submitted, setSubmitted] = useState(null);

  const handleClick = () => {
    setSubmitted(false);
    setOpenResend(true);
  };

  return (
    <div className='container pt-4 pb-2 px-3'>
      <div className='box'>
        <div className='title is-1 has-text-info has-text-centered'>Help / FAQ</div>

        <div className='content'>
          <p className='title is-4 has-text-grey has-text-weight-bold pb-2'>
            How can I contact you.
          </p>
          <p className='subtitle is-6 has-text-dark'>
            By messaging us on Facebook, Twitter, or filling out this form
            <Link to='/Contact' className='has-text-info'>
              {` here.`}
            </Link>
          </p>
        </div>

        <div className='content'>
          <p className='title is-4 has-text-grey has-text-weight-bold pb-2'>
            How do I login, it says my email is not confirmed?
          </p>
          <p className='subtitle is-6 has-text-dark'>
            First, check your email for a link sent from us when you first registered. If that is
            expired or can not be found, you can click
            <span className='has-text-info is-clickable' onClick={handleClick}>
              &nbsp;here&nbsp;
            </span>
            to have a new one sent to the email address you registered with.
          </p>
        </div>

        <div className='content'>
          <p className='title is-4 has-text-grey has-text-weight-bold pb-2'>
            How many leagues can I join?
          </p>
          <p className='subtitle is-6 has-text-dark'>
            The current maximum is 2 per year. Which will reset just before the fall premieres.
          </p>
        </div>

        <div className='content'>
          <p className='title is-4 has-text-grey has-text-weight-bold pb-2'>
            Is it too late to start/join a league?
          </p>
          <p className='subtitle is-6 has-text-dark'>
            Always try to start your leagues before the premieres of new fall shows begin each year,
            but all predictions for a group become final at the same time. So it's never too late to
            get a league started, because you are only competing versus the group you join. Just
            know that if a show has already started for the year, your friends probably already know
            it has as well, and will use any advantage they can to prove their dominance. So do your
            research and don't pick multiple seasons for a show that is on the brink of being
            cancelled.
          </p>
        </div>

        <div className='content'>
          <p className='title is-4 has-text-grey has-text-weight-bold pb-2'>
            How many members can one league have?
          </p>
          <p className='subtitle is-6 has-text-dark'>The current maximum is 10 members.</p>
        </div>

        <div className='content'>
          <p className='title is-4 has-text-grey has-text-weight-bold pb-2'>
            I came up with a great league name, How do I invite people to join my league?
          </p>
          <p className='subtitle is-6 has-text-grey pb-2'>
            Just send them your league ID and the password that you used to create that league. The
            ID can be found in your league's settings page. The league password can also be changed
            from there if you don't want any more random people joining your league. Useful in cases
            where league information is shared on social media sites like Facebook groups, reddit,
            twitter, etc. The commissioner can also kick people from the league, then change the
            league password if so desired.
          </p>
        </div>

        <div className='content'>
          <p className='title is-4 has-text-grey has-text-weight-bold pb-2'>
            Which one has more weight to it when it comes to making predictions, number of episodes
            or seasons?
          </p>
          <p className='subtitle is-6 has-text-dark'>
            Due to varying season lengths for different networks and shows, episodes are the
            stronger indicator of performance. Tie breakers are won by episodes and the under
            prediction. So if someone predicts 5 episodes under the final result, and another person
            predicts 5 episodes over, the under prediction is going to win. For 5 episodes under and
            4 over, the 4 over would win, since it is not a tie.
          </p>
          <p className='subtitle is-6 has-text-dark'>
            To be precise, the current cutoff is 35 episodes or less, you pick episodes. If you
            think 36 episodes+, pick seasons. So if someone picks 35 episodes for a netflix show
            that has 10 episode seasons. They would beat the person who picked 3.5 seasons.
          </p>
        </div>

        <div className='content'>
          <p className='title is-4 has-text-grey has-text-weight-bold pb-2'>
            What do I get for winning?
          </p>
          <p className='subtitle is-6 has-text-dark'>
            Bragging rights, validation for watching so much tv, and maybe even a fun little blurb
            on your resume.
          </p>
        </div>

        {/* <div className='content'>
          <p className='title is-4 has-text-grey has-text-weight-bold pb-2'>
            How can I support this site?
          </p>
          <p className='subtitle is-6 has-text-dark'>
            Donations can be made here. Or given to a random stranger who will hopefully one day
            pass them on to me. The first method is probably faster.
          </p>
          <form action='https://www.paypal.com/cgi-bin/webscr' method='post' target='_top'>
            <input type='hidden' name='cmd' value='_donations' />
            <input type='hidden' name='business' value='FPJLW8P3HNZ7G' />
            <input type='hidden' name='currency_code' value='USD' />
            <input
              type='image'
              src='https://www.paypalobjects.com/en_US/i/btn/btn_donate_SM.gif'
              border='0'
              name='submit'
              title='PayPal - The safer, easier way to pay online!'
              alt='Donate with PayPal button'
            />
            <img
              alt=''
              border='0'
              src='https://www.paypal.com/en_US/i/scr/pixel.gif'
              width='1'
              height='1'
            />
          </form>
        </div> */}

        <div className='content'>
          <p className='title is-4 has-text-grey has-text-weight-bold pb-2'>
            What do premium members get?
          </p>
          <p className='subtitle is-6 has-text-dark'>Whatever they want.</p>
        </div>

        <div className='content'>
          <p className='title is-4 has-text-grey has-text-weight-bold pb-2'>
            How can I become a premium member?
          </p>
          <p className='subtitle is-6 has-text-dark'>You can't.</p>
        </div>

        <div className='content'>
          <p className='title is-4 has-text-grey has-text-weight-bold pb-2'>
            Are you associated with the networks?
          </p>
          <p className='subtitle is-6 has-text-dark'>
            I saw a peacock at the zoo once. Does that count?
          </p>
        </div>

        <div className='content'>
          <p className='title is-4 has-text-grey has-text-weight-bold pb-2'>
            Did anybody really ask any of these questions, or are you just making them up as you go?
          </p>
          <p className='subtitle is-6 has-text-dark'>Yes.</p>
        </div>

        <div className='content'>
          <p className='title is-4 has-text-grey has-text-weight-bold pb-2'>
            Why didn't you stop after the last question? This F.A.Q. seems to be lingering on past
            its point of usefulness.
          </p>
          <p className='subtitle is-6 has-text-dark'>
            I didn't feel like taking my hands off the keyboard, and obviously haven't gone back to
            delete any of these test questions yet.
          </p>
        </div>

        {openResend && (
          <Modal
            title='Request Verification Email'
            stateHandler={setOpenResend}
            success
            form='resendConfirmation'
            submitted={submitted}
          >
            <ResendConfirmation submitted={submitted} setSubmitted={setSubmitted} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default Help;
