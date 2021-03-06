import React, { useMemo } from 'react';
import { Form, Field } from 'react-final-form';
import { noop } from 'lodash';
import { Input, Select } from '../Templates/InputTemplates';
import { Button } from 'components';
import { CheckboxWrapper } from '../Templates/InputTemplatesCss';
const required = (value) => (value ? undefined : 'Required');

export default function AddCategoryForm({ onSubmit = noop, categories, budgets, selectedBudgetId }) {
  const parentCategories = useMemo(
    () => (categories ? categories.map((category) => category.parentCategory) : null),
    [categories]
  );

  const parentCategoryOptions = useMemo(
    () =>
      parentCategories
        .filter((value, index, array) => array.findIndex((t) => t.id === value.id) === index)
        .map((parentCategory) => (
          <option key={parentCategory.id} value={parentCategory.id}>
            {parentCategory.name}
          </option>
        )),
    [parentCategories]
  );

  const budgetsOptions = useMemo(
    () =>
      typeof budgets.length !== 'undefined'
        ? budgets.map((budget) => (
            <option key={budget.id} value={budget.id}>
              {budget.name}
            </option>
          ))
        : [
            <option value={0}>test</option>,
            <option key={budgets.id} value={budgets.id}>
              {budgets.name}
            </option>,
          ],

    [budgets]
  );

  return (
    <Form
      onSubmit={onSubmit}
      render={({ handleSubmit, form, submitting, pristine, values }) => (
        <form onSubmit={handleSubmit}>
          <CheckboxWrapper>
            <label>New </label>
            <Field name="newParentCategory" component="input" type="checkbox" />

            <label>New budgeted category </label>
            <Field name="budgeted" component="input" type="checkbox" />
          </CheckboxWrapper>

          <Field
            description="Budget"
            name="budgetId"
            fieldType="Budget "
            initialValue={selectedBudgetId}
            options={budgetsOptions}
            component={Select}
          />
          <Field name="name" fieldType="Category name " validate={required} component={Input} />

          {!values.newParentCategory ? (
            <Field
              key={'parentCategoryId'}
              name="parentCategoryId"
              description="Parent category"
              options={parentCategoryOptions}
              initialValue={'1'}
              component={Select}
            />
          ) : null}
          {values.newParentCategory && [
            <Field
              name="newParentCategoryName"
              description="New parent category Name"
              placeholder="Name"
              component={Input}
            />,
          ]}

          {values.budgeted && [
            <Field
              name="budget"
              validate={required}
              step="0.01"
              fieldType="number"
              description="Budget Size "
              parse={(value) => parseFloat(value, 8)}
              placeholder="Amount"
              component={Input}
            />,
          ]}

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
