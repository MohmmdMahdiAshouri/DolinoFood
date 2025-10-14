import Home from "@/components/Home/Home";

export default async function page() {

    const res = await fetch(`${process.env.BASE_URL}/api/public/home` , {
        method : "GET",
        cache : "no-store"
    })

    const data = await res.json()
    

    return <Home data={data.data}/>;
}
