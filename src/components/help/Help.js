import React, { useState } from 'react';
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
    <div className='box'>
      <div className='title is-1 has-text-info has-text-centered'>Frequently Asked Questions</div>

      <div className='content'>
        <p className='title is-4 has-text-dark'>
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
        <p className='title is-4 has-text-dark'>How many leagues can I join?</p>
        <p className='subtitle is-6 has-text-dark'>
          The current maximum is 2 per year. Which will reset just before the fall premieres.
        </p>
      </div>

      <div className='content'>
        <p className='title is-4 has-text-dark'>How can I support this site?</p>
        <p className='subtitle is-6 has-text-dark'>
          Donations can be made here. Or given to a random stranger who will hopefully one day pass
          them on to me. The first method is faster.
        </p>
      </div>

      <div className='content'>
        <p className='title is-4 has-text-dark'>How many members can one league have?</p>
        <p className='subtitle is-6 has-text-dark'>The current maximum is 10 members.</p>
      </div>

      <div className='content'>
        <p className='title is-4 has-text-dark'>
          I came up with a great league name, How do I invite people to join my league?
        </p>
        <p className='subtitle is-6 has-text-dark'>
          Just send them your league ID and the password that you used to create the league.
        </p>
      </div>

      <div className='content'>
        <p className='title is-4 has-text-dark'>
          Which one has more weight to it when it comes to making predictions, number of episodes or
          seasons?
        </p>
        <p className='subtitle is-6 has-text-dark'>
          Due to varying season lengths, episodes are the stronger indicator of performance. Price
          is right rules are also in effect for tie breakers. So if someone predicts 5 episodes
          under, and another person predicts 5 episodes over, the under prediction is going to win.
          For 5 under and 4 over, the 4 over would win, since it is not a tie.
        </p>
      </div>

      <div className='content'>
        <p className='title is-4 has-text-dark'>What do I get for winning?</p>
        <p className='subtitle is-6 has-text-dark'>
          Bragging rights, validation for watching so much tv, and maybe even a fun little blurb on
          your resume.
        </p>
      </div>

      <div className='content'>
        <p className='title is-4 has-text-dark'>What do premium members get?</p>
        <p className='subtitle is-6 has-text-dark'>Whatever they want.</p>
      </div>

      <div className='content'>
        <p className='title is-4 has-text-dark'>How can I become a premium member?</p>
        <p className='subtitle is-6 has-text-dark'>You can't.</p>
      </div>

      <div className='content'>
        <p className='title is-4 has-text-dark'>Are you associated with the networks?</p>
        <p className='subtitle is-6 has-text-dark'>I watch tv, but that's about it.</p>
      </div>

      <div className='content'>
        <p className='title is-4 has-text-dark'>I have a great idea for you.</p>
        <p className='subtitle is-6 has-text-dark'>
          Not really a question, but you can contact me here.
        </p>
      </div>

      <div className='content'>
        <p className='title is-4 has-text-dark'>
          Did anybody really ask any of these questions, or are you just making them up as you go?
        </p>
        <p className='subtitle is-6 has-text-dark'>Yes.</p>
      </div>

      <div className='content'>
        <p className='title is-4 has-text-dark'>
          Why didn't you stop after the last question? This F.A.Q. seems to be lingering past its
          point of usefulness.
        </p>
        <p className='subtitle is-6 has-text-dark'>
          I didn't feel like taking my hands off the keyboard, and obviously haven't gone back to
          delete any of these test questions.
        </p>
      </div>

      <div className='content'>
        <p className='title is-4 has-text-dark'>Ok, now it's getting ridiculous. Please Stop.</p>
        <p className='subtitle is-6 has-text-dark'>Ok.</p>
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
  );
};

export default Help;
