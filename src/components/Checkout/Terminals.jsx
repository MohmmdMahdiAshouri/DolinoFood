"use client";
import { MdOutlinePayments } from "react-icons/md";
import styles from "./Terminals.module.css";
import Image from "next/image";
import { useContext, useRef } from "react";
import { OrderContext } from "@/context/OrderContext";
import { fetchData } from "@/utils/ClientFunctions";
import Notification from "../Global/Notification/Notification";

function Terminals() {
    const {order, setOrder} = useContext(OrderContext)

    const notifRef = useRef()

    const changeDP = async (terminal) => {
        const res =await fetchData("/api/order/changeTerminal", "POST",{terminal})
        if(res.success){
            setOrder({...order, terminal})
        }else{
            notifRef.current.openError(res.message)
        }
    }

    return (
        <>
            <Notification ref={notifRef} />
            {order?.paymentMethod === "online" && (
                <div className="checkoutBox">
                    <div className="checkoutTitle">
                        <span>
                            <MdOutlinePayments />
                        </span>
                        <span>انتخاب درگاه پرداخت</span>
                    </div>

                    <div className="checkoutContent">
                        <div className={styles.items}>
                            <div
                                onClick={() => changeDP("parsian")}
                                className={`${styles.item} ${
                                    order.terminal === "parsian" ? styles.active : null
                                }`}
                            >
                                <Image
                                    width={50}
                                    height={50}
                                    alt=""
                                    src={"/Images/logo-bank-parsian.png"}
                                />
                            </div>

                            <div
                                onClick={() => changeDP("saman")}
                                className={`${styles.item} ${
                                    order.terminal === "saman" ? styles.active : null
                                }`}
                            >
                                <Image
                                    width={50}
                                    height={50}
                                    alt=""
                                    src={"/Images/logo-bank-saman.png"}
                                />
                            </div>

                            <div
                                onClick={() => changeDP("zarin")}
                                className={`${styles.item} ${
                                    order.terminal === "zarin" ? styles.active : null
                                }`}
                            >
                                <Image
                                    width={50}
                                    height={50}
                                    alt=""
                                    src={"/Images/logo-zarinpal.png"}
                                />
                            </div>
                        </div>

                        <div className={styles.text}>
                            <h3>پرداخت از طریق کلیه کارتهای عضو شتاب امکان پذیر است</h3>
                            <p>{`(قبل از پرداخت از غیر فعال بودن فیلتر شکن مطمئن شوید)`}</p>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Terminals;
