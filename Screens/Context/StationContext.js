import React, { createContext, useState, useEffect } from "react";
import RNSInfo from "react-native-sensitive-info";
export const StationContext = createContext();

export const StationProvider = ({ children }) => {

    const [token, setToken] = useState(null);
    const [IsAuthLoaded, setIsAuthLoaded] = useState(false);

    useEffect(() => {
        intializeToken();
    }, []);
    const intializeToken = async () => {
        try {
            let value = await RNSInfo.getItem("@UserData", {
                sharedPreferencesName: "mySharedPrefs",
                keychainService: "myKeychain",
            });
            console.log("userInfo", value);
            if (value) {

                setToken(value);
            }
            setIsAuthLoaded(true);
        } catch (e) {
            setIsAuthLoaded(true);
        }
    };

    const setUserDetails = (data) => {
        RNSInfo.setItem("@UserData", JSON.stringify(data), {
            sharedPreferencesName: "mySharedPrefs",
            keychainService: "myKeychain",
        });

        setToken(data);
        setIsAuthLoaded(true);
    };

    const Logout = async () => {
        await RNSInfo.deleteItem("@UserData", {
            sharedPreferencesName: "mySharedPrefs",
            keychainService: "myKeychain",
        });
        setToken(null);

    };




    return (
        <StationContext.Provider
            value={{
                token,
                setToken,
                IsAuthLoaded,
                setUserDetails,
                Logout
            }}
        >
            {children}
        </StationContext.Provider>
    );
};