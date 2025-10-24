import { useContext, useRef, useState } from "react";
import styles from "./FinalPrice.module.css";
import { CartContext } from "@/context/CartContext";
import { fetchData } from "@/utils/ClientFunctions";
import Notification from "../Global/Notification/Notification";
import Loading from "../Global/Loading/Loading";
import { useRouter } from "next/navigation";

function FinalPrice() {
    const {cart} = useContext(CartContext)
    const [loading, setLoading] = useState(false)

    const notifRef = useRef()

    const router = useRouter()

    const createOrder = async () => {
        setLoading(true)
        const res = await fetchData("/api/payment/create", "GET")
        if(res.success){
            notifRef?.current.openSuccess("لطفا صبر کنید...")
            router.push(res.data)
        }else{
            notifRef?.current.openError(res.message)
        }
        setLoading(false)
    }
    return (
        <>
            <Notification ref={notifRef} />
            <Loading loading={loading}>
                <div className={styles.finalPrice}>
                    <div className={styles.text}>
                        <span className={styles.tx1}>پرداختی شما:</span>
                        <span className={styles.price}>{cart?.finallPrice.toLocaleString()}</span>
                        <span className={styles.toomal}>تومان</span>
                    </div>
                    <button onClick={createOrder}>ثبت سفارش</button>
                </div>
            </Loading>
        </>
    );
}

export default FinalPrice;
