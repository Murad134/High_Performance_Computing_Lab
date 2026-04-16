import axios from 'axios';
import { getBackendUrl } from '../utils';

const url = getBackendUrl();

const axiosInstance = axios.create({
    baseURL: url,
});

function useAxios() {
    return axiosInstance;
}
export default useAxios 