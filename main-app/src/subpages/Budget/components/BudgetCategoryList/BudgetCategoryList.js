import React, { useRef, useMemo, useCallback } from 'react';
import { connect } from "react-redux";
import { groupBy } from 'lodash';
import { ToggleableList } from 'components/ToggleableList';
import ParentCategory from './ParentCategory';
import CategoryItem from './CategoryItem';
import { useTranslation } from 'react-i18next';
import { selectCategory } from "data/actions/budgetActions"
import 'styled-components/macro';

function BudgetCategoryList  ({
    budgetedCategories, allCategories, budget,
    selectCategory }) {
    const handleClickParentCategoryRef = useRef(null)
    const { t } = useTranslation();



    const handleClearCategorySelect= useCallback(
        () => {
            selectCategory();
            handleClickParentCategoryRef.current();
    },
    [ selectCategory, handleClickParentCategoryRef ]
    );

    const handleSelectOtherCategory= useCallback(() => {
        selectCategory(null);
        handleClickParentCategoryRef.current();
    },[ selectCategory, handleClickParentCategoryRef ]
    );




    const BudgetedCategoriesByParent = useMemo(
        () => groupBy(
            budgetedCategories,
            item => allCategories.find(category => category.id === item.categoryId).parentCategory.name
        ),
        [budgetedCategories,allCategories]
    );

    const listItems = useMemo(
        () =>Object.entries(BudgetedCategoriesByParent).map(([ parentName, categories ]) =>({
            id: parentName,
        Trigger: ({ onClick }) => (
            <ParentCategory
                name={parentName}
                onClick={() =>
                    {onClick(parentName);
                    selectCategory(parentName)}}
                categories= {categories}
                transactions={budget.transactions}
            />


        ),
        children: categories.map((budgetedCategory)=>{
            const {name} = allCategories.find(category => category.id === budgetedCategory.categoryId)

           return( <CategoryItem
                key={budgetedCategory.id}
                name={name}
                item={budgetedCategory}
                transactions={budget.transactions}
            />
        )})

    }))
        ,[allCategories, BudgetedCategoriesByParent, budget.transactions, selectCategory]
    )



    const totalSpent = useMemo(
        () => budget.transactions
            .reduce((acc, transaction) => acc+ transaction.amount,0),
        [budget.transactions]
    );

    const restToSpent = useMemo(
        () => budget.totalAmount - totalSpent,
        [totalSpent, budget.totalAmount]
    );

        const amountTaken = useMemo(
            () => budgetedCategories.reduce((acc,budgetedCategory) => {
                const categoryTransactions = budget.transactions
                    .filter(transaction=>transaction.CategoryId ===budgetedCategory.id )
                const categoryExpenses=categoryTransactions
                    .reduce((acc,transaction) => acc+transaction.amount,0);

                    return acc + Math.max(categoryExpenses, budgetedCategory.budget);
                },0),
            [budget.transactions, budgetedCategories]
        );


            const notBudgetedTransactions = useMemo(
                () => budget.transactions
                .filter(transaction =>{
                    return !budgetedCategories
                        .find(budgetedCategory => budgetedCategory.id === transaction.categoryId)
                }),
                [ budget.transactions, budgetedCategories]
            );
            const notBudgetedExpenses = useMemo(
                () => notBudgetedTransactions
                .reduce((acc,transaction) => acc+ transaction.amount,0),
                [ notBudgetedTransactions ]
            );
            const availableForRestCategories = useMemo(
                () =>budget.totalAmount - amountTaken - notBudgetedExpenses,
                [ amountTaken, notBudgetedExpenses, budget.totalAmount ]
            );


    return (
        <div>
            <div css={`
                border-bottom: 5px solid ${({ theme }) => theme.colors.gray.normal};
            `}>
                <ParentCategory
                    name={budget.name}
                    amount={restToSpent}
                    onClick={handleClearCategorySelect}
                />
            </div>

            <ToggleableList
                items={listItems}
                clickRef={handleClickParentCategoryRef}
            />
            <div css={`
            border-top: 5px solid ${({ theme }) => theme.colors.gray.normal};
            `}>
                <ParentCategory
                    name={t("Other")}
                    amount={availableForRestCategories}
                    onClick={handleSelectOtherCategory}
                />
            </div>

        </div>

    )
}

export default connect(state =>({
    budgetedCategories: state.budget.budgetedCategories,
    allCategories: state.common.allCategories,
    budget: state.budget.budget
}),{
    selectCategory
})(BudgetCategoryList)
