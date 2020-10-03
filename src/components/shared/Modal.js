import React, { useState, useEffect, useRef } from 'react';

const Modal = ({
  children,
  title,
  message,
  stateHandler,
  extras,
  success,
  form,
  submitted,
  trailer,
}) => {
  const [buttonCss, setButtonCss] = useState(null);

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function clearModal() {
    stateHandler(false);
    if (extras) {
      extras(true);
    }
  }

  useEffect(() => {
    if (submitted) {
      setButtonCss('is-hidden');
    }
  }, [submitted]);

  return (
    <div className='modal is-active'>
      <div className='modal-background' onClick={clearModal}></div>
      <div className='modal-card'>
        <header className='modal-card-head'>
          <p className={`modal-card-title has-text-${success ? 'info' : 'danger'}`}>{title}</p>
        </header>

        <section className={`modal-card-body ${trailer ? 'player-wrapper' : ''}`}>
          {message}
          {children}
        </section>

        <footer className='modal-card-foot buttons is-centered'>
          {form && (
            <button
              type='submit'
              form={`${form}`}
              className={`button is-link is-outlined ${buttonCss}`}
            >
              Submit
            </button>
          )}
          <button ref={inputRef} className='button is-link is-outlined' onClick={clearModal}>
            Close
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Modal;
