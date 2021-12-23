export interface ISomeObject {
  firstName:  IInnerObject;
  lastName: IInnerObject;
  email: IInnerObject;
  ssn: IInnerObject;
  age: IInnerObject;
  height: IInnerObject;
  weight: IInnerObject;
  gender: IInnerObject;
  street: IInnerObject;
  city: IInnerObject;
  state: IInnerObject;
  postal: IInnerObject;
  [key: string]: IInnerObject ;
};

export interface IInnerObject {
  required: string;
  [key: string]: string;
};

export interface IFormErrors {
  firstName: string;
  lastName: string;
  email: string;
  ssn: string;
  age: string;
  height: string;
  weight: string;
  gender: string;
  street: string;
  city: string;
  state: string;
  postal: string;
  [key: string]: string;
};