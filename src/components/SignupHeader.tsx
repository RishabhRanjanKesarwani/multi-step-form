import React from 'react';
import { Box, Link, Stack, Typography } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import COLORS from '../utils/colors';
import { TEST_IDS } from '../constants';

interface SignupHeaderProps {
    pageName: string;
    userName: string;
}

const SignupHeader = (props: SignupHeaderProps) => {
    const { pageName, userName } = props;

    return (
        <Stack direction="row" spacing={1} justifyContent="space-between" sx={{background: COLORS.secondary.lightest}} data-testid={TEST_IDS.signupHeader}>
            <Typography variant="h5" sx={{margin: '32px 12px 4px 24px', color: COLORS.secondary.darkest}}>{pageName}</Typography>
            <Box sx={{padding: '12px', backgroundColor: COLORS.primary.dark, width: 300, borderBottomLeftRadius: 16, height: 'fit-content'}}>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color={COLORS.white} sx={{textTransform: 'uppercase'}}>{userName}</Typography>
                    <Link href="https://github.com/RishabhRanjanKesarwani/multi-step-form/blob/master/HOW-TO-USE.md" target="_blank" title="Read how to use the application">
                        <HelpOutlineIcon sx={{color: COLORS.white}} fontSize="small" />
                    </Link>
                </Stack>
            </Box>
        </Stack>
    )
};

export default SignupHeader;