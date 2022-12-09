import axios, { CreateAxiosDefaults } from "axios";

const axiosConfig: CreateAxiosDefaults = {
    baseURL: 'https://swapi.dev/api/'
}

export const axiosInstance = axios.create(axiosConfig);
