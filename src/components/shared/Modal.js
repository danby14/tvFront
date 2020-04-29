import React, { useState, useEffect, useRef } from 'react';

const Modal = ({ children, title, message, stateHandler, extras, success, form }) => {
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

  function hideSubmitButton() {
    // need a context variable or callback that gets set to true when form is submitted without errors before uncommenting below code
    // setButtonCss('is-hidden');
  }

  return (
    <div className='modal is-active'>
      <div className='modal-background' onClick={clearModal}></div>
      <div className='modal-card'>
        <header className='modal-card-head'>
          <p className={`modal-card-title has-text-${success ? 'info' : 'danger'}`}>{title}</p>
        </header>

        <section className='modal-card-body'>
          {message}
          {children}
        </section>

        <footer className='modal-card-foot buttons is-centered'>
          {form && (
            <button
              type='submit'
              form={`${form}`}
              className={`button is-link is-outlined ${buttonCss}`}
              onClick={hideSubmitButton}
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
