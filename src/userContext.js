import { createContext, useState } from "react";

export const UserContext = createContext({})            

export function UserContextProvider({children}) {
    const [UserInfo, setUserInfo] = useState({})
    return(
        //data saved are id and username
        <UserContext.Provider value = {{UserInfo, setUserInfo}} >  
            {children}
        </UserContext.Provider>
    )
}
