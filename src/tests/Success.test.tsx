import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import { store } from '../app/store';
import { TEST_IDS } from '../constants';
import Home from '../pages/Home';
import Success from '../pages/Success';

describe('Success page', () => {
    it('should not render', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Success />
                    <Home />
                </BrowserRouter>
            </Provider>
        );
        fireEvent.click(screen.getByTestId(TEST_IDS.successOkButton));
        expect(screen.getByAltText('Image to sign up')).toBeVisible();
    });
});