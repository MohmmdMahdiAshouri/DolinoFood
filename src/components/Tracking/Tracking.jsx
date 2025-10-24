"use client"
import Details from './Details'
import Items from './Items'
import dynamic from 'next/dynamic'
const Map = dynamic(() => import('./Map'), { ssr: false })
import OrderStatus from './OrderStatus'
import styles from './Tracking.module.css'
import { useEffect, useRef, useState } from 'react'
import { fetchData } from '@/utils/ClientFunctions'
import Notification from '../Global/Notification/Notification'

function Tracking({id}) {
    const [data, setData] = useState(null)

    const notifRef = useRef()
    
    const getOrder = async () => {
        const res = await fetchData("/api/order/getOrderById", "POST", {orderId : id})
        if(res.success){
            setData(res.data)
        }else{
            notifRef.current.openError(res.message)
        }
    }

    useEffect(() => {
        getOrder()
        const interval = setInterval(() => {
            getOrder()
        },10000)

        return () => clearInterval(interval)
    },[])

    return (
        <>
            <Notification ref={notifRef} />
            <div className={`container ${styles.tracking}`}>
                <OrderStatus data={data}/>
                <Details data={data}/>
                {data && <Map data={data}/>}
                <Items data={data}/>
            </div>
        </>
    )
}

export default Tracking
