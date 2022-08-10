import { Box, Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import { TABS, TAB_IDS } from '../constants';
import Tab from '../types/tab';
import COLORS from '../utils/colors';

interface SignupTabsProps {
    isActive: Tab;
    isStep1Complete: boolean;
    isStep2Complete: boolean;
    isStep3Complete: boolean;
    onTabClick: (tab: Tab) => void;
}

const SignupTabs = (props: SignupTabsProps) => {
    const { isActive, isStep1Complete, isStep2Complete, isStep3Complete, onTabClick } = props;

    const getCompleteStatus = (id: string): boolean => {
        return id === TAB_IDS.step1 ? isStep1Complete : id === TAB_IDS.step2 ? isStep2Complete : isStep3Complete;
    }

    const onClick = (tab: Tab) => {
        if (tab.id !== isActive.id && getCompleteStatus(tab.id)) {
            onTabClick(tab);
        }
    }

    const tabsAndHyphens: Tab[] = [];
    TABS.forEach((tab, index) => {
        tabsAndHyphens.push(tab);
        if (index < TABS.length - 1) {
            tabsAndHyphens.push({
                id: `hyphen${tab.label}`,
                name: 'hyphen',
                label: 'hyphen',
            })
        }
    })

    return (
        <Stack direction={{ xs: 'column', sm: 'column', md: 'row', lg: 'row' }} alignItems="center" justifyContent="center">
            {tabsAndHyphens.map(tab => (
                tab.id.includes('step') ? (
                    <Box key={tab.id} sx={{ padding: '3px', border: tab.id === isActive.id ? `1px solid ${COLORS.primary.dark}` : 'none', borderRadius: '50%', cursor: 'pointer' }} onClick={() => onClick(tab)}>
                        <Box sx={{ width: '30px', height: '30px', border: `1px solid ${getCompleteStatus(tab.id) ? COLORS.primary.dark : COLORS.primary.medium}`, background: getCompleteStatus(tab.id) ? COLORS.primary.dark : COLORS.secondary.medium, borderRadius: '50%', '&:hover': { background: getCompleteStatus(tab.id) ? COLORS.primary.medium : COLORS.secondary.light } }}>
                            <Typography variant="body2" color={getCompleteStatus(tab.id) ? 'text.primary' : COLORS.secondary.dark} align="center" sx={{ marginTop: '5px' }}>{tab.label}</Typography>
                        </Box>
                    </Box>
                ) : (
                    <Divider key={tab.id} sx={{width: '200px', height: '1px', margin: '10px 100px', background: getCompleteStatus(tab.id) ? COLORS.primary.dark : COLORS.primary.light}} />
                )
            ))}
        </Stack>
    );
};

export default SignupTabs;