import { Box, Button, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';
import { MODAL_STYLE } from '../constants';
import COLORS from '../utils/colors';

interface SignatureProps {
    onUsingSignature: (signature: string) => void;
    closeModal: () => void;
}

const Signature = (props: SignatureProps) => {
    const [sign, setSign] = useState<string>('');

    const { onUsingSignature, closeModal } = props;

    const done = () => {};

    const resign = () => {};

    const useSignature = () => {
        onUsingSignature(sign);
        closeModal();
    }

    return (
        <Box sx={MODAL_STYLE}>
            <Stack direction="column" alignItems="center" justifyContent="center" spacing={2}>
            {sign ? (
                <img src={sign} alt="screenshot" />
            ) : (
                <div>I am signature canvas</div>
            )}
            {sign ? (
                <Stack direction="row" alignItems="center" spacing={2}>
                    <Button variant="contained" color="error" size="small" onClick={resign}>Resign</Button>
                    <Button variant="contained" color="error" size="small" onClick={useSignature}>Use signature</Button>
                </Stack>
            ) : (
                <Button variant="contained" color="error" size="small" onClick={done}>Done</Button>
            )}
            <Typography variant="body2" color={COLORS.secondary.dark}>*Click outside to close the modal.</Typography>
        </Stack>
        </Box>
    );
};

export default Signature;