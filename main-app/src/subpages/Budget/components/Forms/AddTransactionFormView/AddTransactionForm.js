import React, { useMemo } from 'react';
import { Form, Field } from 'react-final-form';
import { groupBy, noop } from 'lodash';
import { Input, Select } from '../Templates/InputTemplates';

const required = (value) => (value ? undefined : 'Required');

export default function AddTransactionForm({
  onSubmit = noop,
  categories,
  groupedCategoriesBy,
}) {
  const groupedCategoriesByParentName = groupedCategoriesBy
    ? groupBy(categories, groupedCategoriesBy)
    : null;

  const categoryItems = useMemo(
    () =>
      groupedCategoriesByParentName
        ? Object.entries(groupedCategoriesByParentName).map(
            ([parentName, categories]) => (
              <optgroup key={parentName} label={parentName}>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </optgroup>
            )
          )
        : categories.map((category) => (
            <option value={category.id}>{category.name}</option>
          )),
    [groupedCategoriesByParentName, categories]
  );
  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <Field
            name="description"
            fieldType={'Description'}
            validate={required}
            component={Input}
          />

          <Field
            name="amount"
            validate={required}
            step="0.01"
            fieldType="number"
            parse={(value) => parseFloat(value, 8)}
            placeholder="Amount"
            component={Input}
          />

          <Field
            name="categoryId"
            component={Select}
            options={categoryItems}
            validate={required}
            description={'Category'}
          />

          <Field
            name="date"
            fieldType={'Date'}
            validate={required}
            component={Input}
          />

          <div className="buttons">
            <button type="submit" disabled={submitting}>
              Submit
            </button>
            <button
              type="button"
              onClick={form.reset}
              disabled={submitting || pristine}
            >
              Reset
            </button>
          </div>
        </form>
      )}
    />
  );
}
