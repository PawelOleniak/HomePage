import React from 'react'

import { CategoryItem as Root} from './BudgetCategoryListCss';

export default function CategoryItem({ name }) {
    return (
        <Root >
            {name}
        </Root>
    )
}
