import React from 'react';
import { Box, Stack, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { grey, red } from "@mui/material/colors";

interface SignupHeaderProps {
    pageName: string;
    userName: string;
}

const SignupHeader = (props: SignupHeaderProps) => {
    const { pageName, userName } = props;

    return (
        <Stack direction="row" spacing={1} justifyContent="space-between">
            <Typography variant="h5" sx={{margin: '32px 12px 4px 24px', color: grey[700]}}>{pageName}</Typography>
            <Box sx={{padding: '12px', backgroundColor: red[500], width: 300, borderBottomLeftRadius: 16, height: 'fit-content'}}>
                <Stack direction="row" justifyContent="space-between">
                    <Typography variant="body2" color="#ffffff" sx={{textTransform: 'uppercase'}}>{userName}</Typography>
                    <MenuIcon sx={{color: '#ffffff'}} fontSize="small" />
                </Stack>
            </Box>
        </Stack>
    )
};

export default SignupHeader;