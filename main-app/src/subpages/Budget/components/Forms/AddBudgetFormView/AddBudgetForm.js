import React from 'react'
import { Form, Field } from 'react-final-form'
import { noop } from "lodash";
import { Input } from "../Templates/InputTemplates";

const required = value => (value ? undefined : 'Required')

export default function AddBudgetForm({ onSubmit = noop }) {

    return (
        <Form
            onSubmit={onSubmit}
            render={({ handleSubmit, form, submitting, pristine }) => (
                <form onSubmit={handleSubmit}>
                    <Field name="name" description={"Budget name"} validate={required} component={Input} />

                    <Field name="totalAmount" description={"Money amount"} validate={required} step="0.01"
                        fieldType="number" parse={value => parseFloat(value, 8)} placeholder="Amount" component={Input} />

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
    )
}

