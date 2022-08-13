import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import React, { useRef, useState } from 'react';
import { MODAL_STYLE } from '../constants';
import COLORS from '../utils/colors';
import SignatureCanvas from 'react-signature-canvas';
import styles from '../assets/styles/reactSignatureCanvas.module.css';

interface SignatureProps {
    onUsingSignature: (signature: string) => void;
    closeModal: () => void;
    open: boolean;
}

const Signature = (props: SignatureProps) => {
    const [sign, setSign] = useState<string>('');
    const signatureRef = useRef(null);

    const { onUsingSignature, closeModal, open } = props;

    const clear = () => {
        // @ts-ignore Typescript error
        signatureRef.current.clear();
    };

    const done = () => {
        // @ts-ignore Typescript error
        const signatureUrl = signatureRef.current.getTrimmedCanvas().toDataURL('image/png');
        setSign(signatureUrl);
    };

    const startOver = () => {
        setSign('');
    };

    const useSignature = () => {
        onUsingSignature(sign);
        closeModal();
    }

    return (
        <Modal open={open} onClose={closeModal}>
            <Box sx={MODAL_STYLE}>
                <Stack direction="column" alignItems="center" justifyContent="center" spacing={2}>
                    {sign ? (
                        <img src={sign} alt="screenshot" width={400} height={400} style={{border: '1px solid', borderRadius: '10px'}} />
                    ) : (
                        <SignatureCanvas ref={signatureRef} penColor={COLORS.primary.dark} canvasProps={{className: styles.signatureCanvas}} />
                    )}
                    {sign ? (
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Button variant="contained" color="error" size="small" onClick={startOver}>Start over</Button>
                            <Button variant="contained" color="error" size="small" onClick={useSignature}>Use signature</Button>
                        </Stack>
                    ) : (
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Button variant="contained" color="error" size="small" onClick={clear}>Clear</Button>
                            <Button variant="contained" color="error" size="small" onClick={done}>Done</Button>
                        </Stack>
                    )}
                    <Typography variant="body2" color={COLORS.secondary.dark}>*Click outside to close the modal.</Typography>
                </Stack>
            </Box>
        </Modal>
    );
};

export default Signature;