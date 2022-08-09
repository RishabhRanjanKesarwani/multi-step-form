import { Container, Stack } from "@mui/material";
import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getControls } from "../reducers/controls/controlsSlice";
import { getUserDetails, onSuccess } from "../reducers/userDetails/userDetailsSlice";

const Signup = () => {
    const userDetailsState = useAppSelector(getUserDetails);
    const controls = useAppSelector(getControls);
    const dispatch = useAppDispatch();

    useEffect(() => {
        const stringifiedUserDetails = localStorage.getItem('userDetails');
        if (stringifiedUserDetails) {
            dispatch(onSuccess(JSON.parse(stringifiedUserDetails)));
        }
    })

    return (
        <Container>
            <Stack direction="column" spacing={2}>
                <div>I am div</div>
            </Stack>
        </Container>
    );
};

export default Signup;