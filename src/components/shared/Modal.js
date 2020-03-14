import React, { useEffect, useRef } from 'react';

const Modal = ({ children, title, message, stateHandler, extras }) => {
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

  return (
    <div className='modal is-active'>
      <div className='modal-background' onClick={clearModal}></div>
      <div className='modal-card'>
        <header className='modal-card-head'>
          <p className='modal-card-title has-text-danger'>{title}</p>
        </header>
        <section className='modal-card-body'>
          {message}
          {children}
        </section>
        <footer className='modal-card-foot buttons is-centered'>
          <button ref={inputRef} className='button is-link is-outlined' onClick={clearModal}>
            Close
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Modal;
