import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { FORM_INITIAL_STATE, FORM_LABELS, LOCALSTORAGE_KEYS, TAB_IDS, TEST_IDS } from '../constants';
import { Button, Stack, TextField, Typography } from '@mui/material';
import COLORS from '../utils/colors';
import PersonalInfoState from '../types/states/personalInfo';
import { getControls, onStep1FrozenChange, onStep1StateChange } from '../reducers/controls/controlsSlice';
import { addUser, updateUser } from '../services';
import { getFieldErrors } from "../utils/errors";
import { getUserDetails, onError, onLoad, onSuccess } from '../reducers/userDetails/userDetailsSlice';
import { Dictionary } from '@reduxjs/toolkit';

interface PersonalInfoProps {
    onNext: (stepComplete: TAB_IDS) => void;
    className: string;
}

export const initialState: PersonalInfoState = {
    name: '',
    email: '',
    mobileNumber: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
};

const PersonalInfo = (props: PersonalInfoProps) => {
    const controls = useAppSelector(getControls);
    const isPersonalInfoFrozen = controls.isStep1Frozen;
    const { data } = useAppSelector(getUserDetails);
    const dispatch = useAppDispatch();
    const [errorMessage, setErrorMessage] = useState<string | null>();
    // @ts-ignore: Typescript error | Becasue of type, ts does not allow empty object assignment. Empty object assignment is required because otherwise the useEffect's shallow comparison does not let the component re-render on Redux state update.
    const [personalInfo, setPersonalInfo] = useState<PersonalInfoState>({});
    const [fieldErrors, setFieldErrors] = useState<Dictionary<string>>({});

    const { onNext, className } = props;

    useEffect(() => {
        const savedPersonalInfo: PersonalInfoState = initialState;
        Object.keys(savedPersonalInfo).forEach(key => {
            // @ts-ignore: Typescript error | Although the type is assigned to savedPersonalInfo object, the return type of Object.keys() function results in type mismatch.
            savedPersonalInfo[key] = data[key];
        });
        setPersonalInfo(savedPersonalInfo);
    }, [data]);

    const onValueChange = (key: string, value: string) => {
        if (isPersonalInfoFrozen) {
            dispatch(onStep1FrozenChange(false));
        }
        setPersonalInfo({...personalInfo, [key]: value})
        setFieldErrors({...fieldErrors, [`${key}Error`]: ''});
    }

    const onSubmit = async () => {
        const { fieldErrors, isAtLeastOneError } = getFieldErrors(personalInfo);
        if (isAtLeastOneError) {
            setFieldErrors(fieldErrors);
        } else if (isPersonalInfoFrozen) {
            onNext(TAB_IDS.step1);
        } else {
            dispatch(onLoad());
            let response;
            if (data.id) {
                response = await updateUser(data.id, personalInfo);
            } else {
                const requestBody = { ...FORM_INITIAL_STATE, ...personalInfo };
                response = await addUser(requestBody);
            }
            if (response.errorCode && response.errorCode !== 0) {
                setErrorMessage(response.errorMessage);
                dispatch(onError({ errorCode: response.errorCode, errorMessage: response.errorMessage }));
            } else {
                dispatch(onSuccess(response));
                dispatch(onStep1FrozenChange(true));
                dispatch(onStep1StateChange(true));
                localStorage.setItem(LOCALSTORAGE_KEYS.userDetails, JSON.stringify(response));
                localStorage.setItem(LOCALSTORAGE_KEYS.controls, JSON.stringify({...controls, isStep1Frozen: true, isStep1Complete: true }));
                onNext(TAB_IDS.step1);
            }
        }
    };

    return (
        <Stack direction="column" alignItems="center" spacing={4} className={className}>
            {errorMessage && <Typography variant="body1" color={COLORS.primary.dark} data-testid={TEST_IDS.personalInfoErrorMessage}>{errorMessage}</Typography>}
            <Stack direction="column" alignItems="flex-end" spacing={2}>
                {Object.keys(personalInfo).map(key => (
                    <Stack key={key} direction={{ xs: 'column', sm: 'column', md: 'row', lg: 'row' }} spacing={{xs: 0, sm: 0, md: 6, lg: 6}} alignItems="center">
                        <Typography variant="body1" sx={{whiteSpace: 'nowrap'}}>{FORM_LABELS[key]}</Typography>
                        {/* @ts-ignore: Typescript error |  | Although the type is assigned to personalInfo object, the return type of Object.keys() function results in type mismatch. */}
                        <TextField error={!!fieldErrors[`${key}Error`]} helperText={fieldErrors[`${key}Error`]} variant="outlined" size="small" sx={{width: '300px'}} value={personalInfo[key]} onChange={(event: React.ChangeEvent<HTMLInputElement>) => onValueChange(key, event.target.value)} data-testid={TEST_IDS.personalInfoTextField} />
                    </Stack>
                ))}
            </Stack>
            <Button variant="contained" color="error" size="large" onClick={onSubmit} data-testid={TEST_IDS.personalInfoNextButton}>Next</Button>
        </Stack>
    );
};

export default PersonalInfo;