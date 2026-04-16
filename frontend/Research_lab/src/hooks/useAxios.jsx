import axios from 'axios';

const url = import.meta.env.VITE_backend_url || 'http://localhost:2500';

const axiosInstance = axios.create({
    baseURL: url,
});

function useAxios() {
    return axiosInstance;
}
export default useAxios 