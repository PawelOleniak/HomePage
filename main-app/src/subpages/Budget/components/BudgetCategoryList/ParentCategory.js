import React from 'react'

import { ParentCategory as Root} from './BudgetCategoryListCss';

export default function ParentCategory({ name, onClick }) {
    return (
        <Root onClick={onClick}>
            {name}
        </Root>
    )
}
