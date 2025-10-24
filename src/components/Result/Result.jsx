"use client";
import { useEffect, useState } from "react";
import Success from "./Success";
import UnSuccess from "./UnSuccess";
import { fetchData } from "@/utils/ClientFunctions";
import Loading from "../Global/Loading/Loading";

function Result({ status, authority }) {
    const [loading, setLoading] = useState(false);
    const [data, setData] = useState(null);

    const verify = async () => {
        setLoading(true);
        const res = await fetchData("/api/payment/verify", "POST", {
            status,
            authority,
        });
        if (res.success) {
            setData(res.data);
        } else {
            alert("nooo")
        }
        setLoading(false);
    };

    useEffect(() => {
        verify()
    },[])
    return (
        <>
            <Loading loading={loading}>
                <div className="container">
                    {data ? (
                        <Success orderId={data} />
                    ) : (
                        <UnSuccess />
                    )}
                </div>
            </Loading>
        </>
    );
}

export default Result;
