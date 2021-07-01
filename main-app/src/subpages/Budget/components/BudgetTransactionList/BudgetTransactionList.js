import React, { useMemo } from 'react'
import { List, ListItem } from './BudgetTransactionListCss'
import { connect } from 'react-redux';
import { groupBy } from 'lodash';
import { formatCurrency, formatDate } from "utils";

function BudgetTransactionList({ transactions, allCategories, budgetedCategories, selectedCategory }) {

    const filteredBySelectedCategory = useMemo(
        () => {
            if(typeof selectedCategory === 'undefined'){
                return transactions
            }
            if(selectedCategory === null){
                return transactions
                    .filter(transaction => {
                        const hasBudgetedCategory = budgetedCategories
                            .some(budgetedCategory => budgetedCategory.categoryId === transaction.categoryId)
                        return !hasBudgetedCategory
                    })
            }

            return transactions
            .filter(transaction => {
                try{const Category = allCategories
                        .find(category=> transaction.categoryId === category.id);

                    const parentCategoryName=Category.parentCategory.name

                    return parentCategoryName === selectedCategory
                }catch(error){
                    return false
                }
            })
    },
    [ selectedCategory, budgetedCategories, allCategories, transactions ]
    );

    const groupedTransactions = useMemo(
        () =>groupBy(
            filteredBySelectedCategory,
            transaction => new Date(transaction.date).getUTCDate()
    ),
    [ filteredBySelectedCategory ]
    )

    return (
        <List >
          {Object.entries(groupedTransactions).map(([key,transactions]) => (
              <li key={key}>
                <ul >
                    { transactions.map(transaction =>(
                        <ListItem key={transaction.description}>
                            <div>{transaction.description}</div>
                            <div>{formatCurrency(transaction.amount)}</div>
                            <div>{formatDate(transaction.date)}</div>
                            <div>
                                {(allCategories.find(category=> transaction.categoryId === category.id) || {}).name}
                            </div>

                        </ListItem>
                    ))}
                </ul>
              </li>
          ))}
        </List>
    )
}

export default connect(state => ({
    transactions: state.budget.budget.transactions,
    allCategories: state.common.allCategories,
    selectedCategory: state.budget.SelectedCategoryId,
    budgetedCategories: state.budget.budgetedCategories
}))(BudgetTransactionList)