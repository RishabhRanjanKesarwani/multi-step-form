import { Box, Button, Modal, Stack, Typography } from '@mui/material';
import React, { useCallback, useRef, useState } from 'react';
import { MODAL_STYLE } from "../constants";
import ReactWebcam from "react-webcam";
import COLORS from '../utils/colors';

interface WebcamProps {
    onUsingScreenshot: (image: string) => void;
    closeModal: () => void;
    open: boolean;
}

const Webcam = (props: WebcamProps) => {
    const [image, setImage] = useState<string>('');
    const webcamRef = useRef(null);

    const { onUsingScreenshot, closeModal, open } = props;

    const capture = useCallback(() => {
        // @ts-ignore Typescript error
        const imgSrc = webcamRef.current.getScreenshot({width: 400});
        setImage(imgSrc);
    }, [webcamRef, setImage]);

    const retake = () => {
        setImage('');
    };

    const useScreenshot = () => {
        onUsingScreenshot(image);
        closeModal()
    }

    return (
        <Modal open={open} onClose={closeModal}>
            <Box sx={MODAL_STYLE}>
                <Stack direction="column" alignItems="center" justifyContent="center" spacing={2}>
                    {image ? (
                        <img src={image} alt="screenshot" />
                    ) : (
                        <ReactWebcam
                            width={400}
                            ref={webcamRef}
                            screenshotFormat="image/jpeg"
                        />
                    )}
                    {image ? (
                        <Stack direction="row" alignItems="center" spacing={2}>
                            <Button variant="contained" color="error" size="small" onClick={retake}>Retake</Button>
                            <Button variant="contained" color="error" size="small" onClick={useScreenshot}>Use screenshot</Button>
                        </Stack>
                    ) : (
                        <Button variant="contained" color="error" size="small" onClick={capture}>Capture</Button>
                    )}
                    <Typography variant="body2" color={COLORS.secondary.dark}>*Click outside to close the modal.</Typography>
                </Stack>
            </Box>
        </Modal>
    );
};

export default Webcam;