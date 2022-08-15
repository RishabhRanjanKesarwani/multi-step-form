/* eslint-disable testing-library/no-node-access */
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import ConfirmationPage from '../components/ConfirmationPage';
import { TEST_IDS } from '../constants';
import COLORS from '../utils/colors';

describe('Confirmation page', () => {
    beforeAll(() => {
        global.URL.createObjectURL = jest.fn();
        // @ts-ignore: Typescript error
        global.navigator.mediaDevices.enumerateDevices = () => ([{kind: 'videoinput'}]);
    })
    it('should have 12 text fields and all disabled', async () => {
        const mockFn = jest.fn();
        render(
            <Provider store={store}>
                <ConfirmationPage onNext={mockFn} className="" />
            </Provider>
        );
        expect(await screen.findByTestId(TEST_IDS.confirmationPageCaptureButton)).toBeInTheDocument();
        expect(screen.getAllByTestId(TEST_IDS.confirmationPageTextField).length).toEqual(12);
        screen.getAllByTestId(TEST_IDS.confirmationPageTextField).forEach(field => {
            expect(field.children[0].children[0]).toBeDisabled(); // Accessing children because disabled property is of input element which is 2 levels inside TextField component
        });
    });

    it('should show error if submitted without image and/or signature', async () => {
        const mockFn = jest.fn();
        render(
            <Provider store={store}>
                <ConfirmationPage onNext={mockFn} className="" />
            </Provider>
        );
        expect(await screen.findByTestId(TEST_IDS.confirmationPageCaptureButton)).toBeInTheDocument();
        const submitButton = screen.getByTestId(TEST_IDS.confirmationPageSubmitButton);
        fireEvent.click(submitButton);
        expect(screen.getByText('Image is a required field')).toHaveStyle({color: COLORS.primary.dark});
        expect(screen.getByText('Signature is a required field')).toHaveStyle({color: COLORS.primary.dark});
    });

    it('should display image when uploaded from local computer', async () => {
        const mockFn = jest.fn();
        const file = new File(["(⌐□_□)"], "chucknorris.png", { type: "image/png" });
        render(
            <Provider store={store}>
                <ConfirmationPage onNext={mockFn} className="" />
            </Provider>
        );
        expect(await screen.findByTestId(TEST_IDS.confirmationPageCaptureButton)).toBeInTheDocument();
        const portraitOutlinedIcon = screen.getByTestId('PortraitOutlinedIcon')
        expect(portraitOutlinedIcon).toBeVisible();
        const uploadInput: HTMLInputElement = screen.getByTestId(TEST_IDS.confirmationPageUploadButton);
        fireEvent.change(uploadInput, { target: { files: [file] } });
        expect(uploadInput.files).toHaveLength(1);
    });

    it('should open webcam modal on clicking camera icon', async () => {
        const mockFn = jest.fn();
        render(
            <Provider store={store}>
                <ConfirmationPage onNext={mockFn} className="" />
            </Provider>
        );
        expect(await screen.findByTestId(TEST_IDS.confirmationPageCaptureButton)).toBeInTheDocument();
        const cameraButton = screen.getByTestId(TEST_IDS.confirmationPageCaptureButton)
        fireEvent.click(cameraButton);
        expect(await screen.findByTestId(TEST_IDS.webcamCaptureButton)).toBeInTheDocument();
    });
});