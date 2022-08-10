import Tab from "./types/tab";

export const TAB_IDS = {
    step1: 'step1',
    step2: 'step2',
    step3: 'step3',
}

export const TABS: Tab[] = [
    {
        id: TAB_IDS.step1,
        label: '1',
        name: 'Personal Info'
    },
    {
        id: TAB_IDS.step2,
        label: '2',
        name: 'Office Details'
    },
    {
        id: TAB_IDS.step3,
        label: '3',
        name: 'Confirmation Page'
    },
];