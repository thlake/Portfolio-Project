import { ISomeObject, IInnerObject, IFormErrors } from '../app/models';


export const validationMessages: ISomeObject = {
  'firstName': {
    'required': 'First Name is required.',
  },
  'lastName': {
    'required': 'Last Name is required',
  },
  'email': {
    'required': 'Email is required',
    'email': 'Must use standard email format'
  },
  'ssn': {
    'required': 'Ssn is required',
    'pattern': 'Enter your ssn with dashes'
  },
  'age': {
    'required': 'Age is required',
    'pattern': 'Must be a number between 0 and 255'
  },
  'height': {
    'required': 'Height is required',
    'maxlength': 'Height cannot be more than 3 digits',
    'pattern': 'Enter height in inches, must be a number between 1 and 255'
  },
  'weight': {
    'required': 'Weight is required',
    'maxlength': 'Weight cannot be more than 4 digits',
    'pattern': 'Enter height in pounds, must be a number between 1 and 999'
  },
  'gender': {
    'required': 'Gender is required',
  },
  'street': {
    'required': 'Street is required',
  },
  'city': {
    'required': 'City is required',
  },
  'state': {
    'required': 'State is required',
  },
  'postal': {
    'required': 'Postal is required',
    'pattern': 'Must be a number, with 5 digits'
  },
};

export const formErrors: IFormErrors = {
  'firstName': '',
  'lastName': '',
  'email': '',
  'ssn': '',
  'age': '',
  'height': '',
  'weight': '',
  'gender': '',
  'street': '',
  'city': '',
  'state': '',
  'postal': '',
}