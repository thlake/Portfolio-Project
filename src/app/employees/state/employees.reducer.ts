import * as employeeActions from "./employees.actions";
import { Employee } from "../employee";
import * as fromRoot from "../../state/app-state"
import { createReducer, on } from '@ngrx/store';

export interface EmployeeState {
    employee: Employee;
    loading: boolean;
    loaded: boolean;
    error: string;
}

export interface AppState extends fromRoot.AppState {
    employee: EmployeeState
}
export const initialState = {
    // employee: [
    //     {
    //         id: "",
    //         firstName: "",
    //         lastName: "",
    //         gender: "", 
    //         age: "",
    //         height: "",
    //         weight: "",
    //         ssn: "",
    //         email: "",
    //         street: "",
    //         city: "",
    //         state: "",
    //         postal: "",
    //     }
    // ],
    employee: Employee,
    // loading: false,
    // loaded: true,
}

export function employeeReducer( state = initialState, action: employeeActions.Action)  {

    switch (action.type) {
        case employeeActions.EmployeeActionTypes.LOAD_EMPLOYEE: {
            return {
                ...state,
                employee: action.payload,
                loading: true,
                loaded: false,
            };
        }
        default: {
            return state;
        }
    }
}

// const _employeeReducer = createReducer(
//     initialState,
//     on(loadEmployee, (state, {employee}) => {
//         return [...employee];
//     })
// );

// export function employeeReducer(state: any, actions: any) {
//     return _employeeReducer(state, actions);
// }