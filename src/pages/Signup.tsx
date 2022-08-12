import { Backdrop, CircularProgress, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import SignupHeader from "../components/SignupHeader";
import SignupTabs from "../components/SignupTabs";
import { LOCALSTORAGE_KEYS, TABS, TAB_IDS } from "../constants";
import { getControls, onStep1StateChange, onStep2StateChange, onStep3StateChange } from "../reducers/controls/controlsSlice";
import { getUserDetails, onSuccess } from "../reducers/userDetails/userDetailsSlice";
import Tab from "../types/tab";
import SignupContainer from "../components/SignupContainer";
import PersonalInfo from "../components/PersonalInfo";
import OfficeDetails from "../components/OfficeDetails";
import ConfirmationPage from "../components/ConfirmationPage";
import { useNavigate } from "react-router-dom";
import COLORS from "../utils/colors";

const Signup = () => {
    const userDetailsState = useAppSelector(getUserDetails);
    const controls = useAppSelector(getControls);
    const dispatch = useAppDispatch();
    const [activeTab, setActiveTab] = useState<Tab>(TABS[0]);
    const navigate = useNavigate();

    const { data, loading } = userDetailsState;

    useEffect(() => {
        const stringifiedUserDetails = localStorage.getItem(LOCALSTORAGE_KEYS.userDetails);
        if (stringifiedUserDetails) {
            dispatch(onSuccess(JSON.parse(stringifiedUserDetails)));
        }
        const getAlllUsers = async () => {
            // const response = await getAllUsers();
            // const response = await getUser("2");
            // const response = await addUser({
            //     name: 'Rishabh',
            //     email: 'rishabh@gmail.com',
            //     mobileNumber: '8299748966',
            //     addressLine1: '452',
            //     addressLine2: 'B block',
            //     addressLine3: 'AECS',
            //     workBuildingName: '',
            //     workCity: '',
            //     workLandlineNumber: '',
            //     workAddressLine1: '',
            //     workAddressLine2: '',
            //     workPOBoxNumber: '',
            //     image: '',
            //     signature: '',
            // });
            // const response = await updateUser('3', {
            //     workBuildingName: 'WeWork',
            //     workCity: 'Bangalore',
            //     workLandlineNumber: '32935382726',
            //     workAddressLine1: 'ETV',
            //     workAddressLine2: 'Kadubeesanahalli',
            //     workPOBoxNumber: '560056',
            // });
            // const response = await deleteUser('3');
            // console.log(response);
        };
        getAlllUsers();
    }, [dispatch])

    const onNext = (stepComplete: TAB_IDS) => {
        if (stepComplete === TAB_IDS.step1) {
            dispatch(onStep1StateChange(true));
            setActiveTab(TABS[1]);
        }
        if (stepComplete === TAB_IDS.step2) {
            dispatch(onStep2StateChange(true));
            setActiveTab(TABS[2]);
        }
        if (stepComplete === TAB_IDS.step3) {
            dispatch(onStep3StateChange(true));
            localStorage.removeItem(LOCALSTORAGE_KEYS.userDetails);
            navigate('/success');
        }
    };

    return (
        <>
            <Stack direction="column" spacing={2}>
                <SignupHeader pageName={activeTab.name} userName={data.name ? data.name : 'user'} />
                <SignupTabs isActive={activeTab} {...controls} onTabClick={(tab: Tab) => setActiveTab(tab)} />
                <SignupContainer>
                    {activeTab.id === TAB_IDS.step1 ? <PersonalInfo onNext={onNext} /> : activeTab.id === TAB_IDS.step2 ? <OfficeDetails onNext={onNext} /> : <ConfirmationPage onNext={onNext} />}
                </SignupContainer>
            </Stack>
            <Backdrop sx={{ color: COLORS.white, zIndex: (theme) => theme.zIndex.drawer + 1 }} open={loading}>
                <CircularProgress color="error" />
            </Backdrop>
        </>
    );
};

export default Signup;