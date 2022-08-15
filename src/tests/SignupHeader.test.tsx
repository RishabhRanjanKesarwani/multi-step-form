import { render, screen } from '@testing-library/react';
import React from 'react';
import SignupHeader from '../components/SignupHeader';
import { TEST_IDS } from '../constants';

describe('Signup header', () => {
    it('should render without fail', () => {
        render(<SignupHeader pageName='Primary Info' userName='User' />);
        expect(screen.getByTestId(TEST_IDS.signupHeader)).toBeInTheDocument();
        expect(screen.getByRole('link')).toBeInTheDocument();
    });
});