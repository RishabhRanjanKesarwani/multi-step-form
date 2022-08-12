import { API_ERRORS, API_PARAMS } from "./constants";
import UserDetails from "./types/userDetails";

export const getAllUsers = async () => {
    const url = `${API_PARAMS.path}${API_PARAMS.endpoints.allUsers}`;
    try {
        const response = await fetch(url);
        return response.json();
    } catch (error) {
        return API_ERRORS.getError;
    }
};

export const getUser = async (userId: string) => {
    const url = `${API_PARAMS.path}${API_PARAMS.endpoints.user.replace('{userId}', userId)}`;
    try {
        const response = await fetch(url);
        return response.json();
    } catch (error) {
        return API_ERRORS.getError;
    }
};

export const addUser = async (data: UserDetails) => {
    const url = `${API_PARAMS.path}${API_PARAMS.endpoints.allUsers}`;
    try {
        const response = await fetch(url, {
            method: API_PARAMS.methods.post,
            headers: API_PARAMS.headers,
            body: JSON.stringify(data),
        })
        return response.json();
    } catch (error) {
        return API_ERRORS.postError;
    }
};

export const updateUser = async (userId: string, data: Partial<UserDetails>) => {
    const url = `${API_PARAMS.path}${API_PARAMS.endpoints.user.replace('{userId}', userId)}`;
    try {
        const response = await fetch(url, {
            method: API_PARAMS.methods.put,
            headers: API_PARAMS.headers,
            body: JSON.stringify(data),
        })
        return response.json();
    } catch (error) {
        return API_ERRORS.putError;
    }
};

export const deleteUser = async (userId: string) => {
    const url = `${API_PARAMS.path}${API_PARAMS.endpoints.user.replace('{userId}', userId)}`;
    try {
        const response = await fetch(url, {
            method: API_PARAMS.methods.delete,
            headers: API_PARAMS.headers,
        })
        return response.json();
    } catch (error) {
        return API_ERRORS.putError;
    }
};