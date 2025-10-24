import Store from "@/components/Store/Store";
import React from "react";

async function page({params}) {
    const {id} = await params
    const res = await fetch(`${process.env.BASE_URL}/api/public/singleRestaurant` , {
        method : "POST",
        headers : {"Content-Type" : "application/json"},
        body : JSON.stringify({_id : id})
    })
    
    const data = await res.json()
    return <Store data={data.data}/>;
}

export default page;
