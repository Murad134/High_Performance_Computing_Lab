import React, { useEffect, useState } from 'react';
import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut,
    GoogleAuthProvider,
    signInWithPopup,
    updateProfile
} from 'firebase/auth';
import auth from '../Firebase/firebase.init';
import { AuthContext } from './AuthContext';
function AuthProvider({ children }) {
    const [loading, setLoading] = useState(true);
    const [user, setUser] = useState(null);

    const createUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    };

    const signIn = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    };



    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, currentUser => {
            setUser(currentUser);
            setLoading(false);
            console.log('current user', currentUser);
        });
        return () => unsubscribe();
    }, []);

    const provider = new GoogleAuthProvider();

    const signInGoogle = () => {
        setLoading(true);
        return signInWithPopup(auth, provider);
    };

    const updateUserProfile = async (profileInfo) => {
        await updateProfile(auth.currentUser, profileInfo);
        await auth.currentUser.reload(); // Refresh user data
        setUser({ ...auth.currentUser }); // Update user state with new data
    };

    const signout = () => {
        setLoading(true);
        return signOut(auth);
    };
    const userInfo = {
        user,
        loading,
        createUser,
        signIn,
        signout,
        signInGoogle,
        updateUserProfile
    };
    return (
        <AuthContext.Provider value={userInfo}>
            {children}
        </AuthContext.Provider>
    );
}
export default AuthProvider;