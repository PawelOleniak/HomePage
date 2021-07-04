export function Input({ input, meta, fieldType="text", step, placeholder, description }){

    return(
            <div>
                <label>{description ? description : fieldType}</label>
                <input {...input} step={step} type={fieldType} placeholder={placeholder? placeholder : fieldType} />
                {meta.error && meta.touched && <span>{meta.error}</span>}
            </div>
    )
}
export function Select({ input, meta, options, description}){

    return(
             <div>
                <label>{description}</label>
                <select {...input}>
                    {options}
                </select>
                {meta.error && meta.touched && <span>{meta.error}</span>}
            </div>
        )
}