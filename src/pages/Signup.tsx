import { Backdrop, CircularProgress, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import SignupHeader from "../components/SignupHeader";
import SignupTabs from "../components/SignupTabs";
import { LOCALSTORAGE_KEYS, TABS, TAB_IDS, TEST_IDS } from "../constants";
import { onAllControlsUpdate } from "../reducers/controls/controlsSlice";
import { getUserDetails, onSuccess } from "../reducers/userDetails/userDetailsSlice";
import Tab from "../types/tab";
import SignupContainer from "../components/SignupContainer";
import PersonalInfo from "../components/PersonalInfo";
import OfficeDetails from "../components/OfficeDetails";
import ConfirmationPage from "../components/ConfirmationPage";
import { useNavigate } from "react-router-dom";
import COLORS from "../utils/colors";
import styles from "../assets/styles/animation.module.css";

const getClasses = (tab: Tab, activeTab: Tab): string => {
    const classes = [];
    classes.push(tab.id ===  activeTab.id ? styles.show : styles.hide)
    classes.push(parseInt(tab.label, 10) >= parseInt(activeTab.label, 10) ? styles.rightToLeft : '');
    return classes.join(' ');
};

const Signup = () => {
    const userDetailsState = useAppSelector(getUserDetails);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState<Tab>(TABS[0]);

    const { data, loading } = userDetailsState;

    useEffect(() => {
        const stringifiedUserDetails = localStorage.getItem(LOCALSTORAGE_KEYS.userDetails);
        const stringifiedControls = localStorage.getItem(LOCALSTORAGE_KEYS.controls);
        if (stringifiedUserDetails) {
            dispatch(onSuccess(JSON.parse(stringifiedUserDetails)));
        }
        if (stringifiedControls) {
            dispatch(onAllControlsUpdate(JSON.parse(stringifiedControls)));
        }
    }, [dispatch]);

    const onNext = (stepComplete: TAB_IDS) => {
        switch (stepComplete) {
            case TAB_IDS.step1:
                setActiveTab(TABS[1]);
                break;
            case TAB_IDS.step2:
                setActiveTab(TABS[2]);
                break;
            case TAB_IDS.step3:
            default:
                navigate('/success');
                break;
        }
    };

    return (
        <>
            <Stack direction="column" data-testid={TEST_IDS.signup}>
                <SignupHeader pageName={activeTab.name} userName={data.name ? data.name : 'user'} />
                <SignupTabs isActive={activeTab} onTabClick={(tab: Tab) => setActiveTab(tab)} />
                <SignupContainer>
                    <PersonalInfo onNext={onNext} className={getClasses(TABS[0], activeTab)} />
                    <OfficeDetails onNext={onNext} className={getClasses(TABS[1], activeTab)} />
                    <ConfirmationPage onNext={onNext} className={getClasses(TABS[2], activeTab)} />
                </SignupContainer>
            </Stack>
            <Backdrop sx={{ color: COLORS.white, zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress color="error" />
            </Backdrop>
        </>
    );
};

export default Signup;