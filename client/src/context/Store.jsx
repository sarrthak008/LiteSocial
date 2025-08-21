import { createContext, use, useContext, useEffect ,useState} from "react";

const store = createContext();

const StoreProvider = ({ children }) => {


    const [middleCompNum, setMiddleComNum] = useState(0)

    const loadProfile = () => {
        try {

            let userData = JSON.parse(localStorage.getItem("user_info")) || []
            if (userData) {
                return ({
                    _id: userData._id,
                    name: userData.name,
                    email: userData.email,
                    info: userData.user_info,
                    username: userData.user_name
                })
            } else {
                return false
            }

        } catch (error) {
            return false
        }
    }

    const loadUserAllInfo = () => {
        try {

            let userData = JSON.parse(localStorage.getItem("user_info")) || []
            if(userData){
                return (userData)
            } else {
                return false
            }

        } catch (error) {
            return false
        }
    }


    const isalredyFollow = (id)=>{
       let res =  loadUserAllInfo().following.map((u)=>{
          return u._id
        })   
    return res.includes(id)
    }




    return (
        <store.Provider
            value={{
                loadProfile,
                loadUserAllInfo,
                isalredyFollow,
                middleCompNum,
                setMiddleComNum
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