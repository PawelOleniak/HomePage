import React, { useMemo } from 'react'
import { List } from './BudgetTransactionListCss'
import { connect } from 'react-redux';
import { groupBy } from 'lodash';
import { TransactionItem } from "./TransactionItem";

function BudgetTransactionList({ transactions, allCategories, budgetedCategories,
selectedCategory, selectTransaction }) {

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
                <TransactionItem transactions={transactions} allCategories={allCategories} />
              </li>
          ))}
        </List>
    )
}

export default connect(state => ({
    transactions: state.budgets.budget.transactions,
    allCategories: state.common.allCategories,
    selectedCategory: state.budgets.SelectedCategoryId,
    budgetedCategories: state.budgets.budgetedCategories,
}))(BudgetTransactionList)