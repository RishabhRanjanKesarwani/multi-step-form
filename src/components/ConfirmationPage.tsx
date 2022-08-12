import React from 'react';
import { TAB_IDS } from '../constants';

interface ConfirmationPageProps {
    onNext: (stepComplete: TAB_IDS) => void;
}

const ConfirmationPage = (props: ConfirmationPageProps) => {
    const { onNext } = props;

    return (
        <div>I am ConfirmationPage form</div>
    );
};

export default ConfirmationPage;