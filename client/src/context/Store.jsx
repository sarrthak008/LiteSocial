import { createContext, use, useContext, useEffect } from "react";

const store = createContext();

const StoreProvider = ({ children }) => {

const loadProfile = () => {
        try {

            let userData = JSON.parse(localStorage.getItem("user_info")) || []

            if (userData) {
                return ({
                    _id: userData._id,
                    name: userData.name,
                    email: userData.email,
                    info: userData.user_info
                })
            }else{
               return false
            }

        } catch (error) {
            return false
        }
    }



    return (
        <store.Provider
            value={{
                loadProfile
            }}
        >
            {children}
        </store.Provider>
    )
}

const useStore = () => {
    return useContext(store);
}

export { useStore, StoreProvider };