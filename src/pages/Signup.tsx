import { Backdrop, CircularProgress, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import SignupHeader from "../components/SignupHeader";
import SignupTabs from "../components/SignupTabs";
import { LOCALSTORAGE_KEYS, TABS, TAB_IDS } from "../constants";
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

const Signup = () => {
    const userDetailsState = useAppSelector(getUserDetails);
    const dispatch = useAppDispatch();
    const [activeTab, setActiveTab] = useState<Tab>(TABS[0]);
    const navigate = useNavigate();

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
    }, [dispatch])

    const onNext = (stepComplete: TAB_IDS) => {
        if (stepComplete === TAB_IDS.step1) {
            setActiveTab(TABS[1]);
        }
        if (stepComplete === TAB_IDS.step2) {
            setActiveTab(TABS[2]);
        }
        if (stepComplete === TAB_IDS.step3) {
            navigate('/success');
        }
    };

    return (
        <>
            <Stack direction="column">
                <SignupHeader pageName={activeTab.name} userName={data.name ? data.name : 'user'} />
                <SignupTabs isActive={activeTab} onTabClick={(tab: Tab) => setActiveTab(tab)} />
                <SignupContainer>
                    <PersonalInfo onNext={onNext} className={activeTab.id === TAB_IDS.step1 ? styles.show : styles.hide} />
                    <OfficeDetails onNext={onNext} className={activeTab.id === TAB_IDS.step2 ? styles.show : styles.hide} />
                    <ConfirmationPage onNext={onNext} className={activeTab.id === TAB_IDS.step3 ? styles.show : styles.hide} />
                </SignupContainer>
            </Stack>
            <Backdrop sx={{ color: COLORS.white, zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress color="error" />
            </Backdrop>
        </>
    );
};

export default Signup;