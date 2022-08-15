import { Box, Button, IconButton, Stack, TextField, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { FORM_LABELS, LOCALSTORAGE_KEYS, TAB_IDS, TEST_IDS } from '../constants';
import { getControls, onStep3FrozenChange, onStep3StateChange } from '../reducers/controls/controlsSlice';
import { getUserDetails, onError, onLoad, onSuccess } from '../reducers/userDetails/userDetailsSlice';
import { updateUser } from '../services';
import ConfirmationPageState from '../types/states/confirmationPage';
import COLORS from '../utils/colors';
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import FolderIcon from "@mui/icons-material/Folder";
import GestureIcon from "@mui/icons-material/Gesture";
import PortraitOutlinedIcon from "@mui/icons-material/PortraitOutlined";
import signaturePlaceHolder from "../assets/images/signature-solid.svg";
import Webcam from './Webcam';
import Signature from './Signature';
import detectWebcam from '../utils/webcam';
import { getFieldErrors } from "../utils/errors";
import { initialState as PersonalInfoInitialState } from "./PersonalInfo";
import { initialState as OfficeDetailsInitialState } from "./OfficeDetails";
import PersonalInfoState from '../types/states/personalInfo';
import OfficeDetailsState from '../types/states/officeDetails';
import { Dictionary } from '@reduxjs/toolkit';

interface ConfirmationPageProps {
    onNext: (stepComplete: TAB_IDS) => void;
    className: string;
}

const initialState: ConfirmationPageState = {
    image: '',
    signature: '',
};

const ConfirmationPage = (props: ConfirmationPageProps) => {
    const controls = useAppSelector(getControls);
    const isConfirmationPageFrozen = controls.isStep3Frozen;
    const { data } = useAppSelector(getUserDetails);
    const dispatch = useAppDispatch();
    const [errorMessage, setErrorMessage] = useState<string | null>();
    // @ts-ignore: Typescript error | Becasue of type, ts does not allow empty object assignment. Empty object assignment is required because otherwise the useEffect's shallow comparison does not let the component re-render on Redux state update.
    const [confirmationPage, setConfirmationPage] = useState<ConfirmationPageState>({});
    const [fieldErrors, setFieldErrors] = useState<Dictionary<string>>({});
    const [isCameraModalOpen, setIsCameraModalOpen] = useState<boolean>(false);
    const [isSignatureModalOpen, setIsSignatureModalOpen] = useState<boolean>(false);
    const [isWebcamAvailable, setIsWebcamAvailable] = useState<boolean>(false);

    const { onNext, className } = props;

    useEffect(() => {
        const savedConfirmationPage: ConfirmationPageState = initialState;
        Object.keys(savedConfirmationPage).forEach(key => {
            // @ts-ignore: Typescript error | Although the type is assigned to savedConfirmationPage object, the return type of Object.keys() function results in type mismatch.
            savedConfirmationPage[key] = data[key];
        });
        setConfirmationPage(savedConfirmationPage);

        const checkIfWebcamAvailable = async () => {
            const answer = await detectWebcam();
            setIsWebcamAvailable(answer);
        }
        checkIfWebcamAvailable();
    }, [data]);

    const onValueChange = (key: string, value: string) => {
        if (isConfirmationPageFrozen) {
            dispatch(onStep3FrozenChange(false));
        }
        setConfirmationPage({...confirmationPage, [key]: value})
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
                localStorage.removeItem(LOCALSTORAGE_KEYS.userDetails);
                localStorage.removeItem(LOCALSTORAGE_KEYS.controls);
                onNext(TAB_IDS.step3);
            }
        }
    };

    const FormTextFields = ({fields}: {fields: PersonalInfoState | OfficeDetailsState}) => (
        <Stack direction="column" spacing={2}>
            {Object.keys(fields).map(key => (
                // @ts-ignore: Typescript error |  | Although the type is assigned to fields object, the return type of Object.keys() function results in type mismatch.
                <TextField key={key} variant="outlined" size="small" sx={{width: '300px'}} value={data[key] ? data[key] : ' '} disabled label={className.includes('show') ? FORM_LABELS[key] : ''} data-testid={TEST_IDS.confirmationPageTextField} />
            ))}
        </Stack>
    );

    return (
        <Stack direction="column" alignItems="center" spacing={4} sx={{paddingTop: '5px'}} className={className}>
            {errorMessage && <Typography variant="body1" color={COLORS.primary.dark}>{errorMessage}</Typography>}
            <Stack direction={{ xs: 'column', sm: 'column', md: 'row', lg: 'row' }} width="100%" alignItems="center" justifyContent="space-evenly" spacing={{ xs: 6, sm: 6, md: 0, lg: 0 }}>
                <FormTextFields fields={PersonalInfoInitialState} />
                <FormTextFields fields={OfficeDetailsInitialState} />
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
                                    {isWebcamAvailable && (
                                        <IconButton onClick={() => setIsCameraModalOpen(true)} data-testid={TEST_IDS.confirmationPageCaptureButton}>
                                            <CameraAltIcon sx={{fontSize: 40}} titleAccess="Use your camera to click your picture" />
                                        </IconButton>
                                    )}
                                    <IconButton component="label">
                                        <FolderIcon sx={{fontSize: 40}} titleAccess="Browse on your computer" />
                                        <input type="file" hidden accept="image/*" onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                                            const file = event.target.files ? event.target.files[0] : null;
                                            const imgSrc = file ? URL.createObjectURL(file) : '';
                                            onValueChange('image', imgSrc);
                                        }} data-testid={TEST_IDS.confirmationPageUploadButton}/>
                                    </IconButton>
                                </Stack>
                            </Stack>
                            {fieldErrors.imageError ? <Typography variant="body1" color={COLORS.primary.dark}>{fieldErrors.imageError}</Typography> : <Typography variant="button">Picture</Typography>}
                        </Stack>
                    </Box>
                    <Box sx={{ border: `1px dashed ${COLORS.black}`, borderRadius: '10px', padding: '0 5px' }}>
                        <Stack direction="column" alignItems="center">
                            <Stack direction="row" alignItems="center" justifyContent="space-between" minWidth={200}>
                                <img src={confirmationPage.signature ? confirmationPage.signature : signaturePlaceHolder} alt="signature" width={80} height={80} style={{border: confirmationPage.signature ? '1px solid' : 'none', borderRadius: 10, margin: '10px 20px'}} />
                                <IconButton onClick={() => setIsSignatureModalOpen(true)} data-testid={TEST_IDS.confirmationPageSignButton}>
                                    <GestureIcon sx={{fontSize: 40}} titleAccess="Click to do your signature" />
                                </IconButton>
                            </Stack>
                            {fieldErrors.signatureError ? <Typography variant="body1" color={COLORS.primary.dark}>{fieldErrors.signatureError}</Typography> : <Typography variant="button">Signature</Typography>}
                        </Stack>
                    </Box>
                </Stack>
            </Stack>
            <Button variant="contained" color="error" size="large" onClick={onSubmit} data-testid={TEST_IDS.confirmationPageSubmitButton}>{errorMessage ? 'Retry' : 'Submit'}</Button>
            <Webcam onUsingScreenshot={(imgSrc: string) => onValueChange('image', imgSrc)} closeModal={() => setIsCameraModalOpen(false)} open={isCameraModalOpen} />
            <Signature onUsingSignature={(signSrc: string) => onValueChange('signature', signSrc)} closeModal={() => setIsSignatureModalOpen(false)} open={isSignatureModalOpen} />
        </Stack>
    );
};

export default ConfirmationPage;