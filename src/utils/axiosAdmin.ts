import Axios, { AxiosInstance } from 'axios';


const axiosAdmin: AxiosInstance = Axios.create({
    baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
    headers: {
        'X-Requested-With': 'XMLHttpRequest',
    },
    withCredentials: true,

});
const setBearerToken = (token: string): void => {
    axiosAdmin.defaults.headers.common['Authorization'] = `Bearer ${token}`;
};

export { axiosAdmin, setBearerToken };
