"use client";
import Loading from "@/components/Global/Loading/Loading";
import Notification from "@/components/Global/Notification/Notification";
import { fetchData } from "@/utils/ClientFunctions";
import { createContext, useEffect, useRef, useState } from "react";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);
console.log(cart);

    const notifRef = useRef();

    const addToCart = async (id) => {
        setLoading(true);
        const res = await fetchData("/api/cart/add", "POST", { id });
        if (res.success) {
            notifRef.current.openSuccess(res.message);
            await getCart()
        } else {
            notifRef.current.openError(res.message);
        }
        setLoading(false);
    };

    const getCart = async () => {
        const res = await fetchData("/api/cart/get", "GET");
        if (res.success) {
            setCart(res.data);
        }
    };

    useEffect(() => {
        getCart();
    },[]);

    return (
        <>
            <Notification ref={notifRef} />
            <Loading loading={loading}>
                <CartContext.Provider value={{ addToCart, cart, loading }}>
                    {children}
                </CartContext.Provider>
            </Loading>
        </>
    );
};
