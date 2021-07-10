import React from 'react';
import { Form, Field } from 'react-final-form';
import { noop } from 'lodash';
import { Input } from '../Templates/InputTemplates';
import { Button } from 'components';

const required = (value) => (value ? undefined : 'Required');

export default function AddBudgetForm({ onSubmit = noop }) {
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine }) => (
        <form onSubmit={handleSubmit}>
          <Field name="name" description={'Budget name'} validate={required} component={Input} />

          <Field
            name="totalAmount"
            description={'Money amount'}
            validate={required}
            step="0.01"
            fieldType="number"
            parse={(value) => parseFloat(value, 8)}
            placeholder="Amount"
            component={Input}
          />

          <div className="buttons">
            <Button
              type="button"
              variant={'inline'}
              style={{ marginRight: '30px' }}
              onClick={form.reset}
              disabled={submitting || pristine}
            >
              Reset
            </Button>
            <Button type="submit" variant={'inline'} primary disabled={submitting}>
              Submit
            </Button>
          </div>
        </form>
      )}
    />
  );
}
