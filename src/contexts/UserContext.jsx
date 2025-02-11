import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState(JSON.parse(localStorage.getItem('UserContext')) || {});

    useEffect(()=>{
        console.log(`user: ${user}`)
        localStorage.setItem('UserContext', JSON.stringify(user))
    },[user])

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
};
 