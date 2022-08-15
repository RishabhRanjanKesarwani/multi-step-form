import { Box, Divider, Stack, Typography } from '@mui/material';
import React from 'react';
import { useAppSelector } from '../app/hooks';
import { TABS, TAB_IDS, TEST_IDS } from '../constants';
import { getControls } from '../reducers/controls/controlsSlice';
import Tab from '../types/tab';
import COLORS from '../utils/colors';

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

const getPreviousTabID = (id: string): TAB_IDS => {
    switch (id) {
        case TAB_IDS.step3:
            return TAB_IDS.step2
        case TAB_IDS.step2:
        default:
            return TAB_IDS.step1;
    }
};

interface SignupTabsProps {
    isActive: Tab;
    onTabClick: (tab: Tab) => void;
}

const SignupTabs = (props: SignupTabsProps) => {
    const { isStep1Complete, isStep2Complete, isStep3Complete, isStep1Frozen, isStep2Frozen, isStep3Frozen } = useAppSelector(getControls);

    const { isActive, onTabClick } = props;

    const isStatusComplete = (id: string): boolean => {
        return id === TAB_IDS.step1 ? isStep1Complete : id === TAB_IDS.step2 ? isStep2Complete : isStep3Complete;
    }

    const isStepFrozen = (id: string): boolean => {
        return id === TAB_IDS.step1 ? isStep1Frozen : id === TAB_IDS.step2 ? isStep2Frozen : isStep3Frozen;
    }

    const onClick = (tab: Tab) => {
        if (tab.id !== isActive.id && (isStatusComplete(tab.id) || (!isStatusComplete(tab.id) && isStatusComplete(getPreviousTabID(tab.id))))) {
            if (isStatusComplete(isActive.id) && !isStepFrozen(isActive.id)) {
                window.alert("You have unsaved changes. Please click 'Next' button to save them and continue.")
            } else {
                onTabClick(tab);
            }
        }
    }

    return (
        <Stack direction={{ xs: 'column', sm: 'column', md: 'row', lg: 'row' }} alignItems="center" justifyContent="center" sx={{background: COLORS.secondary.lightest, padding: '16px 0'}}>
            {tabsAndHyphens.map(tab => (
                tab.id.includes('step') ? (
                    <Box key={tab.id} sx={{ padding: '3px', border: tab.id === isActive.id ? `1px solid ${COLORS.primary.dark}` : 'none', borderRadius: '50%', cursor: 'pointer' }} onClick={() => onClick(tab)}>
                        <Box sx={{ width: '30px', height: '30px', border: `1px solid ${isStatusComplete(tab.id) ? COLORS.primary.dark : COLORS.primary.medium}`, background: isStatusComplete(tab.id) ? COLORS.primary.dark : COLORS.secondary.medium, borderRadius: '50%', '&:hover': { background: isStatusComplete(tab.id) ? COLORS.primary.medium : COLORS.secondary.light } }} data-testid={TEST_IDS.signupTab}>
                            <Typography variant="body2" color={isStatusComplete(tab.id) ? COLORS.white : COLORS.secondary.dark} align="center" sx={{ marginTop: '5px' }}>{tab.label}</Typography>
                        </Box>
                    </Box>
                ) : (
                    <Divider key={tab.id} sx={{width: '200px', height: '1px', margin: '10px 100px', background: isStatusComplete(tab.id) ? COLORS.primary.dark : COLORS.primary.light}} data-testid={TEST_IDS.signupDivider} />
                )
            ))}
        </Stack>
    );
};

export default SignupTabs;