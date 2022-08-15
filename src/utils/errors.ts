import { Dictionary } from "@reduxjs/toolkit";
import ConfirmationPage from "../types/states/confirmationPage";
import OfficeDetails from "../types/states/officeDetails";
import PersonalInfo from "../types/states/personalInfo";
import { isEmailValid, isMobileNumberValid } from "./validations";

interface FieldErrorsAndControl {
    fieldErrors: Dictionary<string>;
    isAtLeastOneError: boolean;
}

export const getFieldError = (key: string, value: string): string => {
    switch (key) {
        case 'name':
            return value ? '' : 'Name is a required field. It cannot be blank';
        case 'email':
            return isEmailValid(value) ? '' : 'Email is a required field and must be valid';
        case 'mobileNumber':
            return isMobileNumberValid(value) ? '' : 'Mobile Number is a required field and must contain numbers only';
        case 'addressLine1':
            return value ? '' : 'Address Line 1 is a required field. It cannot be blank';
        case 'workBuildingName':
            return value ? '' : 'Building Name is a required field. It cannot be blank';
        case 'workCity':
            return value ? '' : 'City is a required field. It cannot be blank';
        case 'workLandlineNumber':
            return isMobileNumberValid(value) ? '' : 'Landline Number is a required field and must contain numbers only';
        case 'workAddressLine1':
            return value ? '' : 'Address Line 1 is a required field. It cannot be blank';
        case 'workPOBoxNumber':
            return isMobileNumberValid(value) ? '' : 'PO Box Number is a required field and must contain numbers only';
        case 'image':
            return value ? '' : 'Image is a required field';
        case 'signature':
            return value ? '' : 'Signature is a required field';
        case 'addressLine2':
        case 'addressLine3':
        case 'workAddressLine2':
        default:
            return '';
    }
};

export const getFieldErrors = (fields: PersonalInfo | OfficeDetails | ConfirmationPage): FieldErrorsAndControl => {
    const fieldErrors: Dictionary<string> = {};
    let isAtLeastOneError = false;
    Object.keys(fields).forEach(key => {
        // @ts-ignore: Typescript error |  | Although the type is assigned to fields object, the return type of Object.keys() function results in type mismatch.
        const errorMessage = getFieldError(key, fields[key]);
        fieldErrors[`${key}Error`] = errorMessage;
        isAtLeastOneError = isAtLeastOneError || !!errorMessage;
    });
    return { fieldErrors, isAtLeastOneError };
}