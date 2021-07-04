import React from 'react'
import { Form, Field } from 'react-final-form'
import { noop } from "lodash";
import { Input} from "./InputTemplates";

const required = value => (value ? undefined : 'Required')

export default function AddTransactionForm({ onSubmit= noop }) {

    return (
        <Form
            onSubmit= {onSubmit}
            render={({ handleSubmit, form, submitting, pristine, values }) => (
                <form onSubmit={handleSubmit}>
                    <Field name="id" description={"id"} validate={required} component={Input}/>
                    <Field name="name" description={"Budget name"} validate={required} component={Input}/>

                    <Field name="totalAmount" description={"Money amount"} validate={required} step="0.01"
                    fieldType="number" parse={value => parseFloat(value,8)} placeholder="Amount" component={Input}/>

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

