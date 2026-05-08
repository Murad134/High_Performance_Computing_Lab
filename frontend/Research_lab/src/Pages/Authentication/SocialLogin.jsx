import React from 'react'
import useAuth from '../../hooks/useAuth'
// import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
function SocialLogin() {
    const { signInGoogle  } = useAuth();
    // const location = useLocation();
    // const navigate = useNavigate();
    // const from = location.state?.from || '/';
    const axiosSecure = useAxiosSecure();

    const handleGoogleSignIn = () => {
        signInGoogle ()
            .then(async result => {
                console.log(result.user);

                //update userinfo in the database

                const userInfo = {
                    created_at: new Date().toISOString(),
                    last_log_in: new Date().toISOString(),
                }
                const res = await axiosSecure.post('/users', userInfo)
                console.log('User updated info', res.data);

                // navigate(from, { replace: true });

            })
            .catch(error => {
                console.error(error);
            })
    }
    return (
        <div className="mt-6">

            {/* Divider */}
            <div className="flex items-center gap-3 my-4">
                <div className="flex-1 h-[1px] bg-gray-300"></div>
                <p className="text-sm text-gray-500 font-medium">OR</p>
                <div className="flex-1 h-[1px] bg-gray-300"></div>
            </div>

            {/* Google Login Button */}
            <button
                onClick={handleGoogleSignIn}
                className="flex items-center justify-center gap-3 w-full py-3 border border-gray-300 rounded-xl bg-white shadow-sm hover:shadow-md hover:bg-gray-50 transition-all duration-200"
            >
                <svg
                    width="18"
                    height="18"
                    viewBox="0 0 48 48"
                >
                    <path fill="#EA4335" d="M24 9.5c3.2 0 6 1.1 8.2 3.2l6.1-6.1C34.4 2.4 29.5 0 24 0 14.6 0 6.5 5.6 2.7 13.8l7.6 5.9C12.2 13.6 17.6 9.5 24 9.5z" />
                    <path fill="#4285F4" d="M46.1 24.5c0-1.6-.1-3.1-.4-4.5H24v9h12.4c-.5 2.7-2 5-4.2 6.6l6.5 5C42.9 36.7 46.1 31.1 46.1 24.5z" />
                    <path fill="#FBBC05" d="M10.3 28.7c-.5-1.5-.8-3.1-.8-4.7s.3-3.2.8-4.7l-7.6-5.9C1 16.5 0 20.2 0 24s1 7.5 2.7 10.6l7.6-5.9z" />
                    <path fill="#34A853" d="M24 48c6.5 0 12-2.1 16-5.7l-6.5-5c-2 1.4-4.6 2.2-9.5 2.2-6.4 0-11.8-4.1-13.7-10.2l-7.6 5.9C6.5 42.4 14.6 48 24 48z" />
                </svg>

                <span className="font-medium text-gray-700">
                    Continue with Google
                </span>
            </button>

        </div>
    )
}
export default SocialLogin