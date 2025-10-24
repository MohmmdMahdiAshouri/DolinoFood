"use client";
import Notification from "@/components/Global/Notification/Notification";
import { fetchData } from "@/utils/ClientFunctions";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { OrderContext } from "./OrderContext";
import { useSession } from "next-auth/react";

export const AddressContext = createContext();

export const AddressProvider = ({ children }) => {
    const { getOrder, order, setOrder } = useContext(OrderContext);
    const [addAddressModal, setAddAddressModal] = useState({
        open: false,
        data: null,
    });
    const { data: userData } = useSession();

    const [data, setData] = useState({
        state: "",
        city: "",
        mobile: "",
        postalCode: "",
        lat: "",
        lng: "",
        details: "",
    });

    const [addresses, setAddresses] = useState(null);

    const [loading, setLoading] = useState(false);

    const notifRef = useRef();

    const changeHandler = (e) => {
        setData({ ...data, [e.target?.name]: e.target?.value });
    };

    const addAddress = async () => {
        setLoading(true);
        const res = await fetchData("/api/address/add", "POST", data);
        if (res.success) {
            notifRef.current.openSuccess(res.message);

            setData({
                state: "",
                city: "",
                mobile: "",
                postalCode: "",
                lat: "",
                lng: "",
                details: "",
            });

            await getAddresses();
        } else {
            notifRef.current.openError(res.message);
        }
        setLoading(false);
    };

    const getAddresses = async () => {
        if (userData?.user.roles.includes("USER")) {
            const res = await fetchData("/api/address/get", "GET");
            if (res.success) {
                setAddresses(res.data);
            } else {
                notifRef.current.openError(res.message);
            }
        }
    };

    useEffect(() => {
        getAddresses();
    }, [userData]);

    const editAddresses = (item) => {
        setData(item);
        setAddAddressModal({ open: true, data: null });
    };

    const deleteAddress = async (item) => {
        setLoading(true);
        const res = await fetchData("/api/address/delete", "DELETE", item);
        if (res.success) {
            notifRef.current.openError(res.message);
            await getAddresses();

            if (item?._id == order?.address[0]?._id) {
                await getOrder();
            }
        } else {
            notifRef.current.openError(res.message);
        }
        setLoading(false);
    };

    const closeModal = () => {
        setData({
            state: "",
            city: "",
            mobile: "",
            postalCode: "",
            lat: "",
            lng: "",
            details: "",
        });
        setAddAddressModal({ open: false, data: null });
    };

    const chooseAddress = async (item) => {
        setLoading(true);
        const res = await fetchData("/api/order/changeAddress", "POST", item);
        if (res.success) {
            notifRef.current.openSuccess(res.message);
            await getOrder();
        } else {
            notifRef.current.openError(res.message);
        }
        setLoading(false);
    };

    return (
        <>
            <Notification ref={notifRef} />
            <AddressContext.Provider
                value={{
                    data,
                    setData,
                    addAddressModal,
                    setAddAddressModal,
                    changeHandler,
                    closeModal,
                    addAddress,
                    getAddresses,
                    addresses,
                    editAddresses,
                    deleteAddress,
                    loading,
                    chooseAddress,
                }}
            >
                {children}
            </AddressContext.Provider>
        </>
    );
};
