"use client";
import Notification from "@/components/Global/Notification/Notification";
import { fetchData } from "@/utils/ClientFunctions";
import { createContext, useRef, useState } from "react";

export const OrderContext = createContext();

export const OrderProvider = ({ children }) => {
    const [order, setOrder] = useState(null);
    const [loading, setLoading] = useState(null);
    const [error, setError] = useState(null);

    const notifRef = useRef();

    const getOrder = async () => {
        setLoading(true);
        const res = await fetchData("/api/order/getOrder", "GET");
        if (res.success) {
            setOrder(res.data)
        } else {
            setError(res.message);
        }
        setLoading(false);
    };

    return (
        <>
            <Notification ref={notifRef} />
            <OrderContext.Provider value={{ getOrder, loading, error, order, setOrder }}>
                {children}
            </OrderContext.Provider>
        </>
    );
};
