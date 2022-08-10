import { Backdrop, Box, CircularProgress, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import COLORS from "../utils/colors";
import SignupHeader from "../components/SignupHeader";
import SignupTabs from "../components/SignupTabs";
import { TABS } from "../constants";
import { getControls } from "../reducers/controls/controlsSlice";
import { getUserDetails, onSuccess } from "../reducers/userDetails/userDetailsSlice";
import Tab from "../types/tab";
import SignupContainer from "../components/SignupContainer";

const Signup = () => {
    const userDetailsState = useAppSelector(getUserDetails);
    const controls = useAppSelector(getControls);
    const dispatch = useAppDispatch();
    const [activeTab, setActiveTab] = useState<Tab>(TABS[0]);

    const {data, loading, error} = userDetailsState

    useEffect(() => {
        const stringifiedUserDetails = localStorage.getItem('userDetails');
        if (stringifiedUserDetails) {
            dispatch(onSuccess(JSON.parse(stringifiedUserDetails)));
        }
    }, [dispatch])

    return (
        <>
            <Stack direction="column" spacing={2}>
                <SignupHeader pageName={activeTab.name} userName={data.name ? data.name : 'user'} />
                <SignupTabs isActive={activeTab} {...controls} onTabClick={(tab: Tab) => setActiveTab(tab)} />
                <SignupContainer>
                    <div>I am a form</div>
                </SignupContainer>
            </Stack>
            <Backdrop sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress color="inherit" />
            </Backdrop>
        </>
    );
};

export default Signup;