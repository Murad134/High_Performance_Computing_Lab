// import axios from "axios";
// import { useEffect } from "react";
// import useAuth from "./useAuth";

// const axiosSecure = axios.create({
//     baseURL: "http://localhost:2500",
// });
// function useAxiosSecure() {
//     const { user } = useAuth();
//     useEffect(() => {
//         const interceptor = axiosSecure.interceptors.request.use(
//             async (config) => {

//                 if (user) {
//                     const token = await user.getIdToken();
//                     config.headers.Authorization = `Bearer ${token}`;
//                 }
//                 return config;
//             },
//             (error) => Promise.reject(error)
//         );
//         return () => {
//             axiosSecure.interceptors.request.eject(interceptor);
//         };

//     }, [user]);
//     return axiosSecure;
// }
// export default useAxiosSecure;


import axios from "axios";
import { useEffect } from "react";
import useAuth from "./useAuth";

const axiosSecure = axios.create({
    baseURL: "http://localhost:2500",
});

function useAxiosSecure() {
    const { user } = useAuth();

    useEffect(() => {

        // remove previous interceptor to avoid duplicate calls
        const interceptor = axiosSecure.interceptors.request.use(
            async (config) => {
                try {
                    const token = user ? await user.getIdToken() : null;

                    if (token) {
                        config.headers.Authorization = `Bearer ${token}`;
                    }

                    return config;
                } catch (error) {
                    console.log("Token error:", error);
                    return config;
                }
            },
            (error) => Promise.reject(error)
        );

        // cleanup
        return () => {
            axiosSecure.interceptors.request.eject(interceptor);
        };

    }, [user]);

    return axiosSecure;
}

export default useAxiosSecure;