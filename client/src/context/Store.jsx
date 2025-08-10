import { createContext ,useContext} from "react";

const store = createContext();

const StoreProvider =({children})=>{

    return(
        <store.Provider
          value={{
                
          }}
        >
           {children}
        </store.Provider>
    )
}

const useStore =()=>{
    return useContext(store);
}

export {useStore,StoreProvider};