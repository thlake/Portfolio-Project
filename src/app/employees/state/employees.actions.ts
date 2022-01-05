import { Employee } from '../employee';
import { createAction, props } from '@ngrx/store';


export enum EmployeeActionTypes {
    LOAD_EMPLOYEE = "Load employee information"
}

export class LoadEmployee implements Action {
    readonly type = EmployeeActionTypes.LOAD_EMPLOYEE;

    constructor(public payload: Employee) {}

    // return {
    //     type: type;
    //     payload?: payload;
    // }
}

export type Action = LoadEmployee;

// export const loadEmployee = createAction(
//     'Loaded employee information',
//     props<{employee: Employee}>()
// );