"use client";
import Checkout from "@/components/Checkout/Checkout";
import Loading from "@/components/Global/Loading/Loading";
import { OrderContext } from "@/context/OrderContext";
import { useContext, useEffect } from "react";

function page() {
    const { getOrder, loading, error } = useContext(OrderContext);

    useEffect(() => {
        getOrder();
    }, []);
    return (
        <>
            <Loading loading={loading} error={error}>
                <Checkout />
            </Loading>
        </>
    );
}

export default page;
