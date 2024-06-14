import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://scholarship-management-system-server-chi.vercel.app',
    headers: {
        'Content-Type': 'application/json'
    }
})

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;