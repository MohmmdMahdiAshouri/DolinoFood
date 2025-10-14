"use client";
import React, { useEffect } from "react";
import Sidebar from "@/components/Dashboard/Sidebar";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loading from "@/components/Global/Loading/Loading";

function page({ children }) {
    const { data } = useSession();

    const router = useRouter();

    useEffect(() => {
        if (data === null) router.push("/");
    }, [data]);

    return (
        <div className="dashboardLayout container">
            <Loading loading={data === null ? true : false}>
                <>
                    <Sidebar />
                    <div className="content">{children}</div>
                </>
            </Loading>
        </div>
    );
}

export default page;
