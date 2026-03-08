import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: `http://localhost:2500`,
});

function useAxios() {
    return axiosInstance;
}
export default useAxios 