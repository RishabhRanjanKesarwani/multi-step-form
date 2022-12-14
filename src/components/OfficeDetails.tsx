import { Button, Stack, TextField, Typography } from '@mui/material';
import { Dictionary } from '@reduxjs/toolkit';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { FORM_LABELS, LOCALSTORAGE_KEYS, TAB_IDS, TEST_IDS } from '../constants';
import { getControls, onStep2FrozenChange, onStep2StateChange } from '../reducers/controls/controlsSlice';
import { getUserDetails, onError, onLoad, onSuccess } from '../reducers/userDetails/userDetailsSlice';
import { updateUser } from '../services';
import OfficeDetailsState from '../types/states/officeDetails';
import COLORS from '../utils/colors';
import { getFieldErrors } from "../utils/errors";

interface OfficeDetailsProps {
    onNext: (stepComplete: TAB_IDS) => void;
    className: string;
}

export const initialState: OfficeDetailsState = {
    workBuildingName: '',
    workCity: '',
    workLandlineNumber: '',
    workAddressLine1: '',
    workAddressLine2: '',
    workPOBoxNumber: '',
};

const OfficeDetails = (props: OfficeDetailsProps) => {
    const controls = useAppSelector(getControls);
    const isOfficeDetailsFrozen = controls.isStep2Frozen;
    const { data } = useAppSelector(getUserDetails);
    const dispatch = useAppDispatch();
    const [errorMessage, setErrorMessage] = useState<string | null>();
    // @ts-ignore: Typescript error | Becasue of type, ts does not allow empty object assignment. Empty object assignment is required because otherwise the useEffect's shallow comparison does not let the component re-render on Redux state update.
    const [officeDetails, setOfficeDetails] = useState<OfficeDetailsState>({});
    const [fieldErrors, setFieldErrors] = useState<Dictionary<string>>({});

    const { onNext, className } = props;

    useEffect(() => {
        const savedOfficeDetails: OfficeDetailsState = initialState;
        Object.keys(savedOfficeDetails).forEach(key => {
            // @ts-ignore: Typescript error | Although the type is assigned to savedOfficeDetails object, the return type of Object.keys() function results in type mismatch.
            savedOfficeDetails[key] = data[key];
        });
        setOfficeDetails(savedOfficeDetails);
    }, [data]);

    const onValueChange = (key: string, value: string) => {
        if (isOfficeDetailsFrozen) {
            dispatch(onStep2FrozenChange(false));
        }
        setOfficeDetails({...officeDetails, [key]: value})
        setFieldErrors({...fieldErrors, [`${key}Error`]: ''});
    }

    const onSubmit = async () => {
        const { fieldErrors, isAtLeastOneError } = getFieldErrors(officeDetails);
        if (isAtLeastOneError) {
            setFieldErrors(fieldErrors);
        } else if (isOfficeDetailsFrozen) {
            onNext(TAB_IDS.step2);
        } else {
            dispatch(onLoad());
            const response = await updateUser(data.id, officeDetails);
            if (response.errorCode && response.errorCode !== 0) {
                setErrorMessage(response.errorMessage);
                dispatch(onError({ errorCode: response.errorCode, errorMessage: response.errorMessage }));
            } else {
                dispatch(onSuccess(response));
                dispatch(onStep2FrozenChange(true));
                dispatch(onStep2StateChange(true));
                localStorage.setItem(LOCALSTORAGE_KEYS.userDetails, JSON.stringify(response));
                localStorage.setItem(LOCALSTORAGE_KEYS.controls, JSON.stringify({...controls, isStep2Frozen: true, isStep2Complete: true}));
                onNext(TAB_IDS.step2);
            }
        }
    };

    return (
        <Stack direction="column" alignItems="center" spacing={4} className={className}>
            {errorMessage && <Typography variant="body1" color={COLORS.primary.dark} data-testid={TEST_IDS.officeDetailsErrorMessage}>{errorMessage}</Typography>}
            <Stack direction="column" alignItems="flex-end" spacing={2}>
                {Object.keys(officeDetails).map(key => (
                    <Stack key={key} direction={{ xs: 'column', sm: 'column', md: 'row', lg: 'row' }} spacing={{xs: 0, sm: 0, md: 6, lg: 6}} alignItems="center">
                        <Typography variant="body1" sx={{whiteSpace: 'nowrap'}}>{FORM_LABELS[key]}</Typography>
                        {/* @ts-ignore: Typescript error |  | Although the type is assigned to officeDetails object, the return type of Object.keys() function results in type mismatch. */}
                        <TextField error={!!fieldErrors[`${key}Error`]} helperText={fieldErrors[`${key}Error`]} variant="outlined" size="small" sx={{width: '300px'}} value={officeDetails[key]} onChange={(event: React.ChangeEvent<HTMLInputElement>) => onValueChange(key, event.target.value)} data-testid={TEST_IDS.officeDetailsTextField} />
                    </Stack>
                ))}
            </Stack>
            <Button variant="contained" color="error" size="large" onClick={onSubmit} data-testid={TEST_IDS.officeDetailsNextButton}>Next</Button>
        </Stack>
    );
};

export default OfficeDetails;