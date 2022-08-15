/* eslint-disable testing-library/no-node-access */
import { fireEvent, render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import PersonalInfo from '../components/PersonalInfo';
import { TEST_IDS } from '../constants';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const validFieldInputs = ['Rishabh', 'rishabh@example.co', '1234567890', 'Address Line 1', 'Address Line 2', 'Address Line 3'];
const invalidFieldInputs = ['Rishabh', 'rishabh@example', '123456e7890', 'Address Line 1', '', ''];

const server = setupServer(
  rest.post('https://62ef51718d7bc7c2eb77f96c.mockapi.io/rakbank/api/v1/users', (req, res, ctx) => {
    return res(ctx.status(500), ctx.json({errorCode: 500, errorMessage: 'Internal server error'}))
  })
)

beforeAll(() => server.listen())
afterEach(() => server.resetHandlers())
afterAll(() => server.close())

describe('Personal info', () => {
    it('should have 6 text inputs', () => {
        const mockFn = jest.fn();
        render(
            <Provider store={store}>
                <PersonalInfo onNext={mockFn} className="" />
            </Provider>
        );
        expect(screen.getAllByTestId(TEST_IDS.personalInfoTextField).length).toEqual(6);
    });

    it('should have 4 required text inputs', () => {
        const mockFn = jest.fn();
        render(
            <Provider store={store}>
                <PersonalInfo onNext={mockFn} className="" />
            </Provider>
        );
        const nextButton = screen.getByTestId(TEST_IDS.personalInfoNextButton);
        fireEvent.click(nextButton);
        let requiredFields = 0;
        screen.getAllByTestId(TEST_IDS.personalInfoTextField).forEach(field => {
            if (field.children.length === 2) { // More than 1 means error helper text is present in the DOM for the field
                requiredFields++;
            }
        })
        expect(requiredFields).toEqual(4);
    });

    it('should not have error helper text on valid inputs', () => {
        const mockFn = jest.fn();
        render(
            <Provider store={store}>
                <PersonalInfo onNext={mockFn} className="" />
            </Provider>
        );
        screen.getAllByTestId(TEST_IDS.personalInfoTextField).forEach((field, index) => {
            fireEvent.change(field.children[0].children[0], { target: { value: validFieldInputs[index] } }); // Accessing children because input element lies 2 levels below the TextField component
        });
        const nextButton = screen.getByTestId(TEST_IDS.personalInfoNextButton);
        fireEvent.click(nextButton);
        let errorFields = 0;
        screen.getAllByTestId(TEST_IDS.personalInfoTextField).forEach(field => {
            if (field.children.length === 2) { // More than 1 means error helper text is present in the DOM for the field
                errorFields++;
            }
        })
        expect(errorFields).toEqual(0);
    });

    it('should show altogether 2 errors for invalid mobile number and for invalid email and no error for non-mandatory fields', () => {
        const mockFn = jest.fn();
        render(
            <Provider store={store}>
                <PersonalInfo onNext={mockFn} className="" />
            </Provider>
        );
        screen.getAllByTestId(TEST_IDS.personalInfoTextField).forEach((field, index) => {
            fireEvent.change(field.children[0].children[0], { target: { value: invalidFieldInputs[index] } }); // Accessing children because input element lies 2 levels below the TextField component
        });
        const nextButton = screen.getByTestId(TEST_IDS.personalInfoNextButton);
        fireEvent.click(nextButton);
        let errorFields = 0;
        screen.getAllByTestId(TEST_IDS.personalInfoTextField).forEach(field => {
            if (field.children.length === 2) { // More than 1 means error helper text is present in the DOM for the field
                errorFields++;
            }
        })
        expect(errorFields).toEqual(2);
    });

    it('should show error message on API failure', async () => {
        const mockFn = jest.fn();
        render(
            <Provider store={store}>
                <PersonalInfo onNext={mockFn} className="" />
            </Provider>
        );
        screen.getAllByTestId(TEST_IDS.personalInfoTextField).forEach((field, index) => {
            fireEvent.change(field.children[0].children[0], { target: { value: validFieldInputs[index] } }); // Accessing children because input element lies 2 levels below the TextField component
        });
        const nextButton = screen.getByTestId(TEST_IDS.personalInfoNextButton);
        fireEvent.click(nextButton);
        expect(await screen.findByTestId(TEST_IDS.personalInfoErrorMessage)).toBeInTheDocument();
    });
});