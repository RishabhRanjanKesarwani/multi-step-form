import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { FORM_INITIAL_STATE, FORM_LABELS, LOCALSTORAGE_KEYS, TAB_IDS } from '../constants';
import { Button, Stack, TextField, Typography } from '@mui/material';
import COLORS from '../utils/colors';
import PersonalInfoState from '../types/states/personalInfo';
import { getControls, onActiveStepFrozenStatusChange } from '../reducers/controls/controlsSlice';
import { isEmailValid, isMobileNumberValid } from '../utils/validations';
import { addUser } from '../services';
import { getUserDetails, onError, onLoad, onSuccess } from '../reducers/userDetails/userDetailsSlice';

interface PersonalInfoProps {
    onNext: (stepComplete: TAB_IDS) => void;
}

interface FieldErrorsAndControl {
    fieldErrors: { [key: string]: string };
    isAtLeastOneError: boolean;
}

const initialState: PersonalInfoState = {
    name: '',
    email: '',
    mobileNumber: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
};

const initialErrorState: { [key: string]: string } = {
    nameError: '',
    emailError: '',
    mobileNumberError: '',
    addressLine1Error: '',
    addressLine2Error: '',
    addressLine3Error: '',
};


const getFieldError = (key: string, value: string): string => {
    switch (key) {
        case 'name':
            return value ? '' : 'Name is a required field. It cannot be blank.';
        case 'email':
            return isEmailValid(value) ? '' : 'Email is a required field and must be valid.';
        case 'mobileNumber':
            return isMobileNumberValid(value) ? '' : 'Mobile Number is a required field and must contain numbers only';
        case 'addressLine1':
            return value ? '' : 'Address Line 1 is a required field. It cannot be blank.';
        case 'addressLine2':
        case 'addressLine3':
        default:
            return '';
    }
}

const getFieldErrors = (personalInfo: PersonalInfoState): FieldErrorsAndControl => {
    const fieldErrors = initialErrorState;
    let isAtLeastOneError = false;
    Object.keys(personalInfo).forEach(key => {
        // @ts-ignore: Unnecessary type error
        const errorMessage = getFieldError(key, personalInfo[key]);
        // @ts-ignore: Unnecessary type error
        fieldErrors[`${key}Error`] = errorMessage;
        isAtLeastOneError = isAtLeastOneError || !!errorMessage;
    });
    return { fieldErrors, isAtLeastOneError };
}

const PersonalInfo = (props: PersonalInfoProps) => {
    const isPersonalInfoFrozen = useAppSelector(getControls).isActiveStepFieldsFrozen;
    const { data } = useAppSelector(getUserDetails);
    const dispatch = useAppDispatch();
    const [errorMessage, setErrorMessage] = useState<string | null>();
    const [personalInfo, setPersonalInfo] = useState<PersonalInfoState>(initialState);
    const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});

    const { onNext } = props;

    useEffect(() => {
        const savedPersonalInfo: PersonalInfoState = initialState;
        Object.keys(savedPersonalInfo).forEach(key => {
            // @ts-ignore: Unnecessary type error
            savedPersonalInfo[key] = data[key];
        });
        setPersonalInfo(savedPersonalInfo);
    }, [data]);

    const onValueChange = (key: string, value: string) => {
        if (isPersonalInfoFrozen) {
            dispatch(onActiveStepFrozenStatusChange(false));
        }
        setPersonalInfo({...personalInfo, [key]: value})
        setFieldErrors({...fieldErrors, [`${key}Error`]: ''});
    }

    const onSubmit = async () => {
        const { fieldErrors, isAtLeastOneError } = getFieldErrors(personalInfo);
        console.log(fieldErrors, isAtLeastOneError, personalInfo);
        if (isAtLeastOneError) {
            setFieldErrors(fieldErrors);
        } else {
            dispatch(onLoad());
            const requestBody = { ...FORM_INITIAL_STATE, ...personalInfo };
            const response = await addUser(requestBody);
            console.log(response);
            if (response.errorCode && response.errorCode !== 0) {
                setErrorMessage(response.errorMessage);
                dispatch(onError({ errorCode: response.errorCode, errorMessage: response.errorMessage }));
            } else {
                dispatch(onSuccess(response));
                localStorage.setItem(LOCALSTORAGE_KEYS.userDetails, response);
                dispatch(onActiveStepFrozenStatusChange(true));
                onNext(TAB_IDS.step1);
            }
        }
    };

    return (
        <Stack direction="column" alignItems="center" spacing={4}>
            {errorMessage && <Typography variant="body1" color={COLORS.primary.dark}>{errorMessage}</Typography>}
            <Stack direction="column" alignItems="flex-end" spacing={2}>
                {Object.keys(personalInfo).map(key => (
                    <Stack key={key} direction={{ xs: 'column', sm: 'column', md: 'row', lg: 'row' }} spacing={{xs: 0, sm: 0, md: 6, lg: 6}} alignItems="center">
                        <Typography variant="body1">{FORM_LABELS[key]}</Typography>
                        {/* @ts-ignore: Unnecessary type error */}
                        <TextField error={!!fieldErrors[`${key}Error`]} helperText={fieldErrors[`${key}Error`]} variant="outlined" size="small" sx={{width: '300px'}} value={personalInfo[key]} onChange={(event: React.ChangeEvent<HTMLInputElement>) => onValueChange(key, event.target.value)} />
                    </Stack>
                ))}
            </Stack>
            <Button variant="contained" color="error" size="large" onClick={onSubmit}>Next</Button>
        </Stack>
    );
};

export default PersonalInfo;