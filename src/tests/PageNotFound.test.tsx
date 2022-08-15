import { Home } from '@mui/icons-material';
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../app/store';
import { TEST_IDS } from '../constants';
import PageNotFound from '../pages/PageNotFound';
import Signup from '../pages/Signup';

describe('Page not found', () => {
    it('renders without fail', () => {
        render(
            <BrowserRouter>
                <PageNotFound />
            </BrowserRouter>
        );
        expect(screen.getByAltText('404')).toBeInTheDocument();
    });

    it('redirects to home page', () => {
        render(
            <BrowserRouter>
                <PageNotFound />
                <Home />
            </BrowserRouter>
        );
        fireEvent.click(screen.getByTestId(TEST_IDS.pageNotFoundHomeButton));
    });

    it('redirects to signup page', () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <PageNotFound />
                    <Signup />
                </BrowserRouter>
            </Provider>
        );
        fireEvent.click(screen.getByTestId(TEST_IDS.pageNotFoundSignupButton));
        expect(screen.getByTestId(TEST_IDS.signup)).toBeVisible();
    });
});