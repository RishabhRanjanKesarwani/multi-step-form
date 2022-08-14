import { fireEvent, render, screen } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import { store } from "../app/store";
import { TEST_IDS } from "../constants";
import Home from "../pages/Home";
import Signup from "../pages/Signup";

describe('Home page', () => {
    it('should have a card to lead to signup', () => {
        render(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );
        expect(screen.getByAltText('Image to sign up')).toBeVisible();
    });

    it('should check that clicking on that card should lead user to signup page', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Home />
                    <Signup />
                </BrowserRouter>
            </Provider>
        );
        const signupCard = screen.getByTestId(TEST_IDS.signupCard);
        fireEvent.click(signupCard);
        expect(screen.getByTestId(TEST_IDS.signup)).toBeVisible();
    });
});