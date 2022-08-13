import Done from '@mui/icons-material/Done';
import { Box, Button, Stack, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getControls, onControlsReset } from '../reducers/controls/controlsSlice';
import { getUserDetails, onUserDetailsReset } from '../reducers/userDetails/userDetailsSlice';
import COLORS from '../utils/colors';

const Success = () => {
    const { data } = useAppSelector(getUserDetails);
    const controls = useAppSelector(getControls);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        const { isStep1Complete, isStep2Complete, isStep3Complete } = controls;
        if (!isStep1Complete || !isStep2Complete || !isStep3Complete) {
            navigate('/');
        }
    }, [controls, navigate]);

    const onClickOk = () => {
        dispatch(onUserDetailsReset());
        dispatch(onControlsReset());
        navigate('/signup');
    }

    return (
        <Stack direction="row" justifyContent="center">
            <Box sx={{margin: '50px 80px', background: COLORS.white, padding: '50px 80px', borderRadius: '20px', width: 'fit-content'}}>
                <Stack direction="column" alignItems="center" spacing={2}>
                    <Box sx={{padding: '10px', border: `5px solid ${COLORS.success.light}`, borderRadius: '50%', marginBottom: '20px'}}>
                        <Done sx={{fontSize: 100, color: COLORS.success.dark}} />
                    </Box>
                    <Typography variant="h3">Success</Typography>
                    <Typography variant="h5">Your application has been submitted. Use application ID <span style={{color: COLORS.primary.dark, fontSize: '32px'}}><b>{data.id}</b></span> for future references.</Typography>
                    <Button variant="contained" color="error" onClick={onClickOk}>OK</Button>
                </Stack>
            </Box>
        </Stack>
    );
};

export default Success;