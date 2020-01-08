import React from 'react';
import { Field, Form } from 'react-final-form';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  await sleep(300);
  console.log(JSON.stringify(values));
};

const MyForm = ({ showName }) => (
  <Form
    onSubmit={onSubmit}
    render={({ handleSubmit, form, submitting, pristine, values }) => (
      <form id='exampleForm' onSubmit={handleSubmit}>
        <div>
          <Field name={showName} component='select'>
            <option value='blank'>Make Prediction</option>
            <option value='1'>1 E</option>
            <option value='2'>2 E</option>
            <option value='3'>3 E</option>
          </Field>
        </div>

        <div className=''>
          <button type='submit'>Submit</button>
        </div>
      </form>
    )}
  />
);

export default MyForm;
