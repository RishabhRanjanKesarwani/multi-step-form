import React from 'react';
import { TAB_IDS } from '../constants';

interface PersonalInfoProps {
    onNext: (stepComplete: TAB_IDS) => void;
}

const PersonalInfo = (props: PersonalInfoProps) => {
    const { onNext } = props;

    return (
        <div>I am PersonalInfo form</div>
    );
};

export default PersonalInfo;