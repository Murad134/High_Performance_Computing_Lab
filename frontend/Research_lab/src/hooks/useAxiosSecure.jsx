import axios from "axios";
import { useEffect } from "react";
import auth from "../Firebase/firebase.init";
import { getBackendUrl } from "../utils";

const url = getBackendUrl();

const axiosSecure = axios.create({
  baseURL: url,
});

function useAxiosSecure() {
  useEffect(() => {
    const interceptor = axiosSecure.interceptors.request.use(
      async (config) => {
        const currentUser = auth.currentUser;

        if (currentUser) {
          try {
            const token = await currentUser.getIdToken(true);
            config.headers.Authorization = `Bearer ${token}`;
          } catch (error) {
            console.log("Token error:", error);
          }
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    return () => {
      axiosSecure.interceptors.request.eject(interceptor);
    };
  }, []);

  return axiosSecure;
}

export default useAxiosSecure;