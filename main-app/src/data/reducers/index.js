import {combineReducers} from "redux";
import  budgets  from "./budgetReducer";
import  common  from "./commonReducer";
const rootReducer = combineReducers({
    budgets,
    common
});
export default rootReducer;