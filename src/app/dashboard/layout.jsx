import React from "react";
import Sidebar from "@/components/Dashboard/Sidebar";

function page({children}) {
    return (
        <div className="dashboardLayout container">
            <Sidebar />
            <div className="content">
                {children}
            </div>
        </div>
    );
}

export default page;
