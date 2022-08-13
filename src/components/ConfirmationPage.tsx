import { Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { FORM_LABELS, LOCALSTORAGE_KEYS, TAB_IDS } from '../constants';
import { getControls, onStep3FrozenChange, onStep3StateChange } from '../reducers/controls/controlsSlice';
import { getUserDetails, onError, onLoad, onSuccess } from '../reducers/userDetails/userDetailsSlice';
import { updateUser } from '../services';
import ConfirmationPageState from '../types/states/confirmationPage';
import COLORS from '../utils/colors';
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import FolderIcon from "@mui/icons-material/Folder";
import GestureIcon from "@mui/icons-material/Gesture";
import PortraitOutlinedIcon from "@mui/icons-material/PortraitOutlined";
import signaturePlaceHolder from "../assets/signature-solid.svg";

interface ConfirmationPageProps {
    onNext: (stepComplete: TAB_IDS) => void;
}

interface FieldErrorsAndControl {
    fieldErrors: { [key: string]: string };
    isAtLeastOneError: boolean;
}

const initialState: ConfirmationPageState = {
    image: '',
    signature: '',
};

const initialErrorState: { [key: string]: string } = {
    imageError: '',
    signatureError: '',
};


const getFieldError = (key: string, value: string): string => {
    switch (key) {
        case 'image':
            return value ? '' : 'Image is a required field';
        case 'signature':
            return value ? '' : 'Signature is a required field';
        default:
            return '';
    }
}

const getFieldErrors = (confirmationPage: ConfirmationPageState): FieldErrorsAndControl => {
    const fieldErrors = initialErrorState;
    let isAtLeastOneError = false;
    Object.keys(confirmationPage).forEach(key => {
        // @ts-ignore: Type error
        const errorMessage = getFieldError(key, confirmationPage[key]);
        // @ts-ignore: Type error
        fieldErrors[`${key}Error`] = errorMessage;
        isAtLeastOneError = isAtLeastOneError || !!errorMessage;
    });
    return { fieldErrors, isAtLeastOneError };
}

const getKeys = (id: TAB_IDS.step1 | TAB_IDS.step2): string[] => {
    if (id === TAB_IDS.step1) {
        return ['name', 'email', 'mobileNumber', 'addressLine1', 'addressLine2', 'addressLine3'];
    } else {
        return ['workBuildingName', 'workCity', 'workLandlineNumber', 'workAddressLine1', 'workAddressLine2', 'workPOBoxNumber'];
    }
};

const ConfirmationPage = (props: ConfirmationPageProps) => {
    const controls = useAppSelector(getControls);
    const isConfirmationPageFrozen = controls.isStep3Frozen;
    const { data } = useAppSelector(getUserDetails);
    const dispatch = useAppDispatch();
    const [errorMessage, setErrorMessage] = useState<string | null>();
    // @ts-ignore: Type error
    const [confirmationPage, setConfirmationPage] = useState<ConfirmationPageState>({});
    const [fieldErrors, setFieldErrors] = useState<{[key: string]: string}>({});

    const { onNext } = props;

    useEffect(() => {
        const savedConfirmationPage: ConfirmationPageState = initialState;
        Object.keys(savedConfirmationPage).forEach(key => {
            // @ts-ignore: Type error
            savedConfirmationPage[key] = data[key];
        });
        setConfirmationPage(savedConfirmationPage);
    }, [data]);

    const onValueChange = (key: string, value: File | null) => {
        if (isConfirmationPageFrozen) {
            dispatch(onStep3FrozenChange(false));
        }
        setConfirmationPage({...confirmationPage, [key]: value ? URL.createObjectURL(value) : ''})
        setFieldErrors({...fieldErrors, [`${key}Error`]: ''});
    }

    const onSubmit = async () => {
        const { fieldErrors, isAtLeastOneError } = getFieldErrors(confirmationPage);
        if (isAtLeastOneError) {
            setFieldErrors(fieldErrors);
        } else if (isConfirmationPageFrozen) {
            onNext(TAB_IDS.step3);
        } else {
            dispatch(onLoad());
            const response = await updateUser(data.id, confirmationPage);
            if (response.errorCode && response.errorCode !== 0) {
                setErrorMessage(response.errorMessage);
                dispatch(onError({ errorCode: response.errorCode, errorMessage: response.errorMessage }));
            } else {
                dispatch(onSuccess(response));
                dispatch(onStep3FrozenChange(true));
                dispatch(onStep3StateChange(true));
                // localStorage.removeItem(LOCALSTORAGE_KEYS.userDetails);
                // localStorage.removeItem(LOCALSTORAGE_KEYS.controls);
                onNext(TAB_IDS.step3);
            }
        }
    };

    return (
        <Stack direction="column" alignItems="center" spacing={4}>
            {errorMessage && <Typography variant="body1" color={COLORS.primary.dark}>{errorMessage}</Typography>}
            <Stack direction={{ xs: 'column', sm: 'column', md: 'row', lg: 'row' }} width="100%" alignItems="center" justifyContent="space-evenly" spacing={{ xs: 6, sm: 6, md: 0, lg: 0 }}>
                <Stack direction="column" spacing={2}>
                    {getKeys(TAB_IDS.step1).map(key => (
                        /* @ts-ignore: Type error */
                        <TextField key={key} variant="outlined" size="small" sx={{width: '300px'}} value={data[key] ? data[key] : ' '} disabled label={FORM_LABELS[key]} />
                    ))}
                </Stack>
                <Stack direction="column" spacing={2}>
                    {getKeys(TAB_IDS.step2).map(key => (
                        /* @ts-ignore: Type error */
                        <TextField key={key} variant="outlined" size="small" sx={{width: '300px'}} value={data[key] ? data[key] : ' '} disabled label={FORM_LABELS[key]} />
                    ))}
                </Stack>
                <Stack direction="column" spacing={4}>
                    <Box sx={{ border: `1px dashed ${COLORS.black}`, borderRadius: '10px', padding: '0 5px' }}>
                        <Stack direction="column" alignItems="center">
                            <Stack direction="row" alignItems="center" justifyContent="space-between" minWidth={200}>
                                {confirmationPage.image ? (
                                    <img src={confirmationPage.image} alt="User" width={100} height={100} style={{borderRadius: 10, margin: 10}} />
                                ) : (
                                    <PortraitOutlinedIcon sx={{fontSize: 120}} />
                                )}
                                <Stack direction="column" alignItems="center" justifyContent="space-evenly">
                                    <IconButton>
                                        <CameraAltIcon sx={{fontSize: 40}} titleAccess="Use your camera to click your picture" />
                                    </IconButton>
                                    <IconButton component="label">
                                        <FolderIcon sx={{fontSize: 40}} titleAccess="Browse on your computer" />
                                        <input type="file" hidden accept="image/*" onChange={(event: React.ChangeEvent<HTMLInputElement>) => onValueChange('image', event.target.files ? event.target.files[0] : null)}/>
                                    </IconButton>
                                </Stack>
                            </Stack>
                            {fieldErrors.imageError ? <Typography variant="body1" color={COLORS.primary.medium}>{fieldErrors.imageError}</Typography> : <Typography variant="button">Picture</Typography>}
                        </Stack>
                    </Box>
                    <Box sx={{ border: `1px dashed ${COLORS.black}`, borderRadius: '10px', padding: '0 5px' }}>
                        <Stack direction="column" alignItems="center">
                            <Stack direction="row" alignItems="center" justifyContent="space-between" minWidth={200}>
                                <img src={confirmationPage.signature ? confirmationPage.signature : signaturePlaceHolder} alt="signature" width={100} height={100} style={{borderRadius: 10, margin: '0 10px'}} />
                                <IconButton>
                                    <GestureIcon sx={{fontSize: 40}} titleAccess="Click to do your signature" />
                                </IconButton>
                            </Stack>
                            {fieldErrors.signatureError ? <Typography variant="body1" color={COLORS.primary.medium}>{fieldErrors.signatureError}</Typography> : <Typography variant="button">Signature</Typography>}
                        </Stack>
                    </Box>
                </Stack>
            </Stack>
            <Button variant="contained" color="error" size="large" onClick={onSubmit}>Submit</Button>
        </Stack>
    );
};

export default ConfirmationPage;