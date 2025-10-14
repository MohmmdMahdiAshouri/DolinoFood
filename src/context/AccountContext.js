"use client";
import Notification from "@/components/Global/Notification/Notification";
import { fetchData } from "@/utils/ClientFunctions";
import { createContext, useRef, useState } from "react";

export const AccountContext = createContext();
export const AccountProvider = ({ children }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [userData , setUserData] = useState(null)

    const notifRef = useRef()

    const getData = async () => {
        setLoading(true);
        const req = await fetchData("/api/restaurant/getDetails", "GET");
        if(req.success){
            setUserData(req.data)
        }else{
            setError(req.message)
        }
        setLoading(false);
    };

    const update = async () => {
        setLoading(true)
        const res = await fetchData("/api/restaurant/update" , "POST" , userData)
        if(res.success){
            notifRef?.current.openSuccess(res.message)
        }else{
            notifRef?.current.openError(res.message)
        }
        setLoading(false)
    }

    return (
        <AccountContext.Provider value={{getData , loading , error , userData , setUserData, update}}>
            <Notification ref={notifRef} />
            {children}
        </AccountContext.Provider>
    );
};
