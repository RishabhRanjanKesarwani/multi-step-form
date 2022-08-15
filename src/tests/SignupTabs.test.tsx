import { screen, render } from "@testing-library/react";
import React from "react";
import { Provider } from "react-redux";
import { store } from "../app/store";
import SignupTabs from "../components/SignupTabs";
import { TABS, TEST_IDS } from "../constants";
import COLORS from "../utils/colors";

describe('Signup tabs', () => {
    it('should render without fail', () => {
        const mockFn = jest.fn();
        render(
            <Provider store={store}>
                <SignupTabs isActive={TABS[0]} onTabClick={mockFn} />
            </Provider>
        );
        expect(screen.getAllByTestId(TEST_IDS.signupTab).length).toEqual(3);
        expect(screen.getAllByTestId(TEST_IDS.signupDivider).length).toEqual(2);
    });

    it('should have tabs and dividers in inactive state', () => {
        const mockFn = jest.fn();
        render(
            <Provider store={store}>
                <SignupTabs isActive={TABS[0]} onTabClick={mockFn} />
            </Provider>
        );
        const firstTab = screen.getAllByTestId(TEST_IDS.signupTab)[0];
        expect(firstTab).toHaveStyle({background: COLORS.secondary.medium});
        const firstDivider = screen.getAllByTestId(TEST_IDS.signupDivider)[0];
        expect(firstDivider).toHaveStyle({background: COLORS.primary.light});
    });
});