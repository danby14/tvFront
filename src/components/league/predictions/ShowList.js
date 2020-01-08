import React from 'react';
import Show from './Show';
// import MyForm from './MyForm';
// import UserPrediction from './UserPrediction';
import { Field, Form } from 'react-final-form';

const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

const onSubmit = async values => {
  await sleep(300);
  console.log(JSON.stringify(values));
};

const ShowList = ({ sList }) => {
  return (
    <div>
      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <div>
              {sList.map((name, i) => {
                return (
                  <div key={name}>
                    <div className='pList'>
                      <Show showName={name} />

                      {/* <MyForm showName={name} /> */}
                      <Field name={name} component='select'>
                        <option value='blank'>Make Prediction</option>
                        <option value='1'>1 E</option>
                        <option value='2'>2 E</option>
                        <option value='3'>3 E</option>
                      </Field>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className=''>
              <button type='submit'>Submit</button>
            </div>
          </form>
        )}
      />
    </div>
  );
};

export default ShowList;
