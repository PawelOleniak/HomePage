import React, { useMemo } from 'react'
import { Form, Field } from 'react-final-form'
import { noop } from "lodash";
import { Input, Select } from "../Templates/InputTemplates";

const required = value => (value ? undefined : 'Required')

export default function AddCategoryForm({ onSubmit = noop, categories, budgets }) {

    const parentCategories = useMemo(
        () => categories ?
            categories.map(category => (
                category.parentCategory
            ))
            : null
        , [categories])

    const parentCategoryOprions = parentCategories
        .filter((value, index, array) => array.findIndex(t => (t.id === value.id)) === index)
        .map(parentCategory => (
            <option key={parentCategory.id} value={parentCategory.id} >{parentCategory.name}</option>
        ))


    const budgetsOptions = useMemo(
        () => typeof budgets.length !== 'undefined' ?

            budgets.map(budget => (
                <option key={budget.id} value={budget.id} >{budget.budget.name}</option>
            ))
            :
            [<option value={0} >test</option>,
            <option key={budgets.id} value={budgets.id} >{budgets.name}</option>]

        , [budgets])

    return (
        <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, form, submitting, pristine, values }) => (

                <form onSubmit={handleSubmit}>
                    <label>Budget</label>
                    <Field name="budgetId" fieldType="Budget " initialValue={1} options={budgetsOptions}
                        component={Select} />
                    <Field name="name" fieldType="Category name " validate={required} component={Input} />
                    <div>
                        {!values.newParentCategory && [
                            <Field name="parentCategoryId" description="Parent category"
                                options={parentCategoryOprions} initialValue={"1"} component={Select}  />]}
                        {values.newParentCategory && [
                            <Field name="newParentCategoryName" description="New parent category Name"
                                placeholder="Name" component={Input} />]}
                        <label>New </label>
                        <Field name="newParentCategory" component="input" type="checkbox" />
                    </div>


                    <label>Budgeted </label>
                    <Field name="budgeted" component="input" type="checkbox" />


                    {values.budgeted && [


                        <Field name="budget" validate={required} step="0.01"
                            fieldType="number" description="Budget Size " parse={value => parseFloat(value, 8)}
                            placeholder="Amount" component={Input} />,
                    ]}


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

                        <pre>{JSON.stringify(values, 0, 2)}</pre>
                    </div>

                </form>
            )}
        />
    )
}

