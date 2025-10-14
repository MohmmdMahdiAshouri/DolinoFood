"use client";
import Notification from "@/components/Global/Notification/Notification";
import { fetchData } from "@/utils/ClientFunctions";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { createContext, useContext, useRef, useState } from "react";
import { ViewContext } from "./ViewContext";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [mobile, setMobile] = useState("");
    const [loading, setLoading] = useState(false);

    const {setUserLogin} = useContext(ViewContext)

    const notifRef = useRef();

    const router = useRouter()

    const submitForm = async (e) => {
        e.preventDefault();

        setLoading(true);
        const res = await signIn("user-login", {
            mobile,
            redirect: false,
        });
        
        if (res.ok) {
            notifRef.current?.openSuccess("با موفقیت وارد شدید");
            router.push("/dashboard/user")
            setMobile("")
            setUserLogin(false)
        } else {
            notifRef.current?.openError(res.error);
        }
        setLoading(false);
    };

    return (
        <>
            <AuthContext.Provider value={{ mobile, setMobile, submitForm }}>
                <Notification ref={notifRef} />
                {children}
            </AuthContext.Provider>
        </>
    );
};
