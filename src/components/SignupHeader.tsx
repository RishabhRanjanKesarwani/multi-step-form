import React from 'react';
import { Box, Stack, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import COLORS from '../utils/colors';

interface SignupHeaderProps {
    pageName: string;
    userName: string;
}

const SignupHeader = (props: SignupHeaderProps) => {
    const { pageName, userName } = props;

    return (
        <Stack direction="row" spacing={1} justifyContent="space-between">
            <Typography variant="h5" sx={{margin: '32px 12px 4px 24px', color: COLORS.secondary.darkest}}>{pageName}</Typography>
            <Box sx={{padding: '12px', backgroundColor: COLORS.primary.dark, width: 300, borderBottomLeftRadius: 16, height: 'fit-content'}}>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color={COLORS.white} sx={{textTransform: 'uppercase'}}>{userName}</Typography>
                    <MenuIcon sx={{color: COLORS.white}} fontSize="small" />
                </Stack>
            </Box>
        </Stack>
    )
};

export default SignupHeader;