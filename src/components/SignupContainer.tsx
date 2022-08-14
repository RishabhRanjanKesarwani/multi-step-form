import { Box } from '@mui/material';
import React from 'react';
import COLORS from '../utils/colors';

interface SignupContainerProps {
    children: JSX.Element[];
}

const SignupContainer = (props: SignupContainerProps) => {
    const { children } = props;

    return (
        <Box sx={{ padding: {xs: '30px 10px', sm: '50px', md: '50px', lg: '50px'} }}>
            <Box sx={{ background: COLORS.white, border: `1px dashed ${COLORS.black}`, borderRadius: '50px', padding: {xs: '30px 10px', sm: '50px', md: '50px', lg: '50px'} }}>
                {children}
            </Box>
        </Box>
    );
};

export default SignupContainer;