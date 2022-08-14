import Tab from "./types/tab";
import COLORS from "./utils/colors";

export enum TAB_IDS {
    step1 = 'step1',
    step2 = 'step2',
    step3 = 'step3',
};

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

export const API_PARAMS = {
    path: 'https://62ef51718d7bc7c2eb77f96c.mockapi.io/rakbank/api/v1/',
    endpoints: {
        allUsers: 'users',
        user: 'users/{userId}',
    },
    methods: {
        get: 'GET',
        post: 'POST',
        put: 'PUT',
        delete: 'DELETE',
    },
    headers: {
        'Content-Type': 'application/json',
    },
};

export const API_ERRORS = {
    getError: {
        errorCode: 601,
        errorMessage: 'Some error occurred in getting the data. Please try again after some time.',
    },
    postError: {
        errorCode: 602,
        errorMessage: 'Some error occurred in saving the data. Please try again after some time.',
    },
    putError: {
        errorCode: 603,
        errorMessage: 'Some error occurred in updating the data. Please try again after some time.',
    },
    deleteError: {
        errorCode: 604,
        errorMessage: 'Some error occurred in deleting the data. Please try again after some time.',
    },
};

export const LOCALSTORAGE_KEYS = {
    userDetails: 'userDetails',
    controls: 'controls',
};

export const FORM_LABELS: { [key: string]: string } = {
    name: 'Name',
    email: 'Email',
    mobileNumber: 'Mobile Number',
    addressLine1: 'Address Line 1',
    addressLine2: 'Address Line 2',
    addressLine3: 'Address Line 3',
    workBuildingName: 'Building Name',
    workCity: 'City',
    workLandlineNumber: 'Landline Number',
    workAddressLine1: 'Address Line 1',
    workAddressLine2: 'Address Line 2',
    workPOBoxNumber: 'PO Box Number',
    image: 'Image',
    signature: 'Signature',
}

export const FORM_INITIAL_STATE = {
    name: '',
    email: '',
    mobileNumber: '',
    addressLine1: '',
    addressLine2: '',
    addressLine3: '',
    workBuildingName: '',
    workCity: '',
    workLandlineNumber: '',
    workAddressLine1: '',
    workAddressLine2: '',
    workPOBoxNumber: '',
    image: '',
    signature: '',
};

export const MODAL_STYLE = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    bgcolor: COLORS.white,
    borderRadius: 2,
    boxShadow: 24,
    p: 4,
};

export const TEST_IDS = {
    appDiv: 'app-div',
    signupCard: 'signup-card',
    signup: 'signup',
    signupHeader: 'signup-header',
}