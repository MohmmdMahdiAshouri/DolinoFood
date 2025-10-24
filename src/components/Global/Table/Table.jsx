"use client"
import { useEffect, useRef, useState } from "react";
import styles from "./Table.module.css";
import Loading from "../Loading/Loading";
import { fetchData } from "@/utils/ClientFunctions";
import Notification from "../Notification/Notification";

function Table({ columns, api, refresh}) {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState([])

    const notifRef = useRef()

    const getDatas = async () => {
        setLoading(true)
        const res = await fetchData(api , "GET")
        if(res.success){
            setData(res.data)
        }
        setLoading(false)
    }

    useEffect(() => {
        getDatas()
    },[refresh])

    return (
        <>
            <Notification ref={notifRef}/>
            <Loading loading={loading}>
                <table className={styles.table}>
                    <thead>
                        <tr>
                            {columns.map((item , index) => (
                                <th key={index} style={{ width: item.width }}>
                                    {item.title}
                                </th>
                            ))}
                        </tr>
                    </thead>

                    <tbody>
                            { data.map((item , index) => (
                                <tr key={index}>
                                    {columns.map((item1, index1) => (
                                        <td key={index1}>{item1.render(item, index)}</td>
                                    ))}
                                </tr>
                            ))}
                    </tbody>
                </table>
            </Loading>
        </>
    );
}

export default Table;
