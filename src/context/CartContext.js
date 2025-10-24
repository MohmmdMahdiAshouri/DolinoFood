"use client";
import Loading from "@/components/Global/Loading/Loading";
import Modal from "@/components/Global/Modal/Modal";
import Notification from "@/components/Global/Notification/Notification";
import { fetchData } from "@/utils/ClientFunctions";
import { useSession } from "next-auth/react";
import { createContext, useEffect, useRef, useState } from "react";
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(false);
    const [modal, setModal] = useState({
        open : false,
        id : null
    })

    const { data: userData } = useSession();

    const notifRef = useRef();

    const addToCart = async (id) => {
        setLoading(true);
        const res = await fetchData("/api/cart/add", "POST", { id });
        if (res.success) {
            notifRef.current.openSuccess(res.message);
            await getCart();
        } else if (res.status === 403) {
            setLoading(true)
            setModal({
                open : true,
                id : id
            })
            setLoading(false)
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
        if (userData?.user) {
            getCart();
        } else {
            setCart(null);
        }
    }, [userData]);

    const decrease = async (id) => {
        setLoading(true);
        const res = await fetchData("/api/cart/delete", "POST", { id });
        if (res.success) {
            notifRef.current.openError(res.message);
            await getCart();
        } else {
            notifRef.current.openError(res.message);
        }
        setLoading(false);
    };

    const action = async () => {
        setLoading(true)
        const res = await fetchData("/api/cart/clear" , "POST" , modal)
        if(res.success){
            notifRef.current.openSuccess(res.message)
            getCart()
        }else{
            notifRef.current.openError(res.message)
        }
        setLoading(false)
    }

    return (
        <>
            <Notification ref={notifRef} />
            <CartContext.Provider
                value={{ addToCart, cart, loading, decrease, getCart }}
            >
                {children}
            <Modal
                title="سفارش جدید"
                open={modal.open}
                setOpenModal={setModal}
                storeModal={true}
                btnText="حذف"
                action={action}
            />
            </CartContext.Provider>
        </>
    );
};
