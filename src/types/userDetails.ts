interface UserDetails {
    id?: string;
    createdAt?: string;
    updatedAt?: string;
    name: string;
    email: string;
    mobileNumber: string;
    addressLine1: string;
    addressLine2: string;
    addressLine3: string;
    workBuildingName: string;
    workCity: string;
    workLandlineNumber: string;
    workAddressLine1: string;
    workAddressLine2: string;
    workPOBoxNumber: string;
    image: string;
    signature: string;
}

export default UserDetails;