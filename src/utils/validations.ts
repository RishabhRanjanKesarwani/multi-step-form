export const isEmailValid = (email: string): boolean => {
    return /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(email);
};

export const isMobileNumberValid = (mobileNumber: string) => {
    return /^[0-9]+$/.test(mobileNumber);
};