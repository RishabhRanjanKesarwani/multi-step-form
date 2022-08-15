/* eslint-disable testing-library/no-node-access */
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { TEST_IDS } from '../constants';
import Signup from '../pages/Signup';
import { BrowserRouter } from 'react-router-dom';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import Success from '../pages/Success';

const validPersonalInfoInputs = ['Rishabh', 'rishabh@example.co', '1234567890', 'Address Line 1', 'Address Line 2', 'Address Line 3'];
const validOfficeDetailsInputs = ['Building', 'Bangalore', '1234567890', 'Address Line 1', 'Address Line 2', '0987654321'];

const personalInfoResponse = {
    id: '123456',
    createdAt: 1660453984,
    updatedAt: 1660453984,
    name: 'Rishabh',
    email: 'rishabh@example.co',
    mobileNumber: '1234567890',
    addressLine1: 'Address Line 1',
    addressLine2: 'Address Line 2',
    addressLine3: 'Address Line 3',
    workBuildingName: '',
    workCity: '',
    workLandlineNumber: '',
    workAddressLine1: '',
    workAddressLine2: '',
    workPOBoxNumber: '',
    image: '',
    signature: '',
};

const officeDetailsResponse = {
    id: '123456',
    createdAt: 1660453984,
    updatedAt: 1660453984,
    name: 'Rishabh',
    email: 'rishabh@example.co',
    mobileNumber: '1234567890',
    addressLine1: 'Bangalore',
    addressLine2: '',
    addressLine3: '',
    workBuildingName: 'Building',
    workCity: 'Bangalore',
    workLandlineNumber: '1234567890',
    workAddressLine1: 'Address Line 1',
    workAddressLine2: 'Address Line 2',
    workPOBoxNumber: '0987654321',
    image: 'some valid image string',
    signature: 'some valid signature string',
};

const server = setupServer(
  rest.post('https://62ef51718d7bc7c2eb77f96c.mockapi.io/rakbank/api/v1/users', (req, res, ctx) => {
    return res(ctx.json(personalInfoResponse))
  }),
  rest.put('https://62ef51718d7bc7c2eb77f96c.mockapi.io/rakbank/api/v1/users/', (req, res, ctx) => {
    return res(ctx.json(officeDetailsResponse))
  }),
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Signup page', () => {
    it('should test the happy path and navigate to success page', async () => {
        render(
            <Provider store={store}>
                <BrowserRouter>
                    <Signup />
                    <Success />
                </BrowserRouter>
            </Provider>
        );
        screen.getAllByTestId(TEST_IDS.personalInfoTextField).forEach((field, index) => {
            fireEvent.change(field.children[0].children[0], { target: { value: validPersonalInfoInputs[index] } }); // Accessing children because input element lies 2 levels below the TextField component
        });
        const personalInfoNextButton = screen.getByTestId(TEST_IDS.personalInfoNextButton);
        fireEvent.click(personalInfoNextButton);
        const officeDetailsNextButton = await screen.findByTestId(TEST_IDS.officeDetailsNextButton);
        screen.getAllByTestId(TEST_IDS.officeDetailsTextField).forEach((field, index) => {
            fireEvent.change(field.children[0].children[0], { target: { value: validOfficeDetailsInputs[index] } }); // Accessing children because input element lies 2 levels below the TextField component
        });
        fireEvent.click(officeDetailsNextButton);
        // INFO: Skipped uploading picture and signature because the package react-signature canvas is giving lot of errors during testing. Avoided testing it anywhere.
        const confirmationPageSubmitButton = await screen.findByTestId(TEST_IDS.confirmationPageSubmitButton);
        fireEvent.click(confirmationPageSubmitButton);
        const successOkButton = await screen.findByTestId(TEST_IDS.successOkButton);
        expect(successOkButton).toBeInTheDocument();
    });
});