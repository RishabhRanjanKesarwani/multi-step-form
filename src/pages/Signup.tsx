import { Backdrop, CircularProgress, Stack } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import SignupHeader from "../components/SignupHeader";
import SignupTabs from "../components/SignupTabs";
import { TABS } from "../constants";
import { getControls } from "../reducers/controls/controlsSlice";
import { getUserDetails, onSuccess } from "../reducers/userDetails/userDetailsSlice";
import Tab from "../types/tab";
import SignupContainer from "../components/SignupContainer";
import { addUser, deleteUser, getAllUsers, getUser, updateUser } from "../services";

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