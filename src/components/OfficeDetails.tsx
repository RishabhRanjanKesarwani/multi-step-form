import React from 'react';
import { TAB_IDS } from '../constants';

interface OfficeDetailsProps {
    onNext: (stepComplete: TAB_IDS) => void;
}

const OfficeDetails = (props: OfficeDetailsProps) => {
    const { onNext } = props;

    return (
        <div>I am OfficeDetails form</div>
    );
};

export default OfficeDetails;