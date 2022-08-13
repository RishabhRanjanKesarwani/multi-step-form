import React from 'react';
import { Box, Link, Stack, Typography } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import COLORS from '../utils/colors';

interface SignupHeaderProps {
    pageName: string;
    userName: string;
}

const SignupHeader = (props: SignupHeaderProps) => {
    const { pageName, userName } = props;

    return (
        <Stack direction="row" spacing={1} justifyContent="space-between" sx={{background: COLORS.secondary.lightest}}>
            <Typography variant="h5" sx={{margin: '32px 12px 4px 24px', color: COLORS.secondary.darkest}}>{pageName}</Typography>
            <Box sx={{padding: '12px', backgroundColor: COLORS.primary.dark, width: 300, borderBottomLeftRadius: 16, height: 'fit-content'}}>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color={COLORS.white} sx={{textTransform: 'uppercase'}}>{userName}</Typography>
                    <Link href="https://github.com/RishabhRanjanKesarwani/multi-step-form/blob/master/README.md" target="_blank">
                        <HelpOutlineIcon sx={{color: COLORS.white}} fontSize="small" />
                    </Link>
                </Stack>
            </Box>
        </Stack>
    )
};

export default SignupHeader;