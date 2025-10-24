"use client";
import Result from "@/components/Result/Result";
import { useSearchParams } from "next/navigation";
import React, { Suspense } from "react";

function PageContent() {
    const params = useSearchParams();
    const status = params.get("Status");
    const authority = params.get("Authority");

    return <Result status={status} authority={authority} />;
}

function page() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <PageContent />
        </Suspense>
    );
}

export default page;
