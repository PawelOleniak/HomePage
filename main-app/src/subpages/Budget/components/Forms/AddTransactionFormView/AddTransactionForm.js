import React, { useMemo } from 'react';
import { Form, Field } from 'react-final-form';
import { groupBy, noop } from 'lodash';
import { Input, Select } from '../Templates/InputTemplates';
import { Button } from 'components';

const required = (value) => (value ? undefined : 'Required');

export default function AddTransactionForm({ onSubmit = noop, categories, groupedCategoriesBy, editedTransaction }) {
  const groupedCategoriesByParentName = groupedCategoriesBy ? groupBy(categories, groupedCategoriesBy) : null;

  const categoryItems = useMemo(
    () =>
      groupedCategoriesByParentName
        ? Object.entries(groupedCategoriesByParentName).map(([parentName, categories]) => (
            <optgroup key={parentName} label={parentName}>
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </optgroup>
          ))
        : categories.map((category) => <option value={category.id}>{category.name}</option>),
    [groupedCategoriesByParentName, categories]
  );
  categoryItems.push(
    <optgroup key={'0'} label={'Uncategorized'}>
      <option value={'0'} key={'0'}>
        null
      </option>
    </optgroup>
  );
  const d = editedTransaction ? new Date(editedTransaction.date) : null;
  const editedTransactionDate = editedTransaction
    ? `${d.getFullYear()}-${d.getMonth() + 1 < 10 ? '0' : ''}${d.getMonth() + 1}-${d.getDate()}`
    : null;
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="description"
            fieldType={'Description'}
            validate={required}
            initialValue={editedTransaction ? editedTransaction.description : null}
            component={Input}
          />

          <Field
            name="amount"
            validate={required}
            step="0.01"
            fieldType="number"
            parse={(value) => parseFloat(value, 8)}
            placeholder="Amount"
            initialValue={editedTransaction ? editedTransaction.amount : null}
            component={Input}
          />

          <Field
            name="categoryId"
            component={Select}
            options={categoryItems}
            initialValue={editedTransaction ? editedTransaction.categoryId : '0'}
            description={'Category'}
          />

          <Field
            name="date"
            fieldType={'Date'}
            initialValue={editedTransaction ? editedTransactionDate : null}
            validate={required}
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
