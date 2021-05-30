import React,{ useEffect, useMemo } from 'react'
import { connect } from "react-redux";
import { fetchBudget, fetchBudgetedCategories } from "data/actions/budgetActions"
import { fetchAllCategories } from 'data/actions/commonActions';
import { Grid } from './BudgetCss';
import { LoadingIndicator } from 'components';
import BudgetCategoryList from './components/BudgetCategoryList/BudgetCategoryList';

 function Budget({
      budgetState, commonState,
      fetchBudget, fetchBudgetedCategories, fetchAllCategories  }) {

    useEffect(() => {
        fetchBudget(1)
        fetchBudgetedCategories(1)
        fetchAllCategories();
      },[fetchBudget,fetchBudgetedCategories,fetchAllCategories])
      const isLoaded = useMemo(
          () =>(!!commonState  && Object.keys(commonState).length === 0) &&
               (!!budgetState && Object.keys(budgetState).length === 0)
          ,[commonState,budgetState]);



    return (
        <Grid>
            <section>
                {isLoaded ? <BudgetCategoryList/> : (
                <LoadingIndicator></LoadingIndicator>
                )}

            </section>
            <section></section>
            <section>
                {isLoaded ? "Transaction List" : <LoadingIndicator></LoadingIndicator>}
            </section>
        </Grid>
    )


}

export default connect(state=>{
    return{
      budget: state.budget.budget,
      commonState:state.common.loadingState,
      budgetState:state.budget.loadingState
    }

  },{
    fetchBudget,
    fetchBudgetedCategories,
    fetchAllCategories
  })(Budget)