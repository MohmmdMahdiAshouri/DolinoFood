"use client";
import { useContext, useRef, useState } from "react";
import styles from "./PaymentMethod.module.css";
import { HiOutlineCreditCard } from "react-icons/hi";
import { CiMonitor } from "react-icons/ci";
import { BsCashStack, BsFilePost } from "react-icons/bs";
import { OrderContext } from "@/context/OrderContext";
import { fetchData } from "@/utils/ClientFunctions";
import Notification from "../Global/Notification/Notification";

function PaymentMethod() {
    const { order, setOrder, getOrder } = useContext(OrderContext);

    const notifRef = useRef();

    const changePM = async (PM) => {
        const res = await fetchData("/api/order/changePM", "POST", { PM });
        if (res.success) {
            setOrder({ ...order, paymentMethod: PM });
        } else {
            notifRef.current.openError(res.message);
        }
    };

    return (
        <>
            <Notification ref={notifRef} />
            <div className="checkoutBox">
                <div className="checkoutTitle">
                    <span>
                        <HiOutlineCreditCard />
                    </span>
                    <span>روش های پرداخت</span>
                </div>

                <div className="checkoutContent">
                    <div className={styles.methods}>
                        <div
                            onClick={() => changePM("online")}
                            className={`${styles.item} ${
                                order?.paymentMethod === "online"
                                    ? styles.active
                                    : ""
                            }`}
                        >
                            <span>
                                <CiMonitor />
                            </span>
                            <span>آنلاین</span>
                        </div>

                        <div
                            onClick={() => changePM("cash")}
                            className={`${styles.item} ${
                                order?.paymentMethod === "cash"
                                    ? styles.active
                                    : ""
                            }`}
                        >
                            <span>
                                <BsCashStack />
                            </span>
                            <span>پول نقد</span>
                        </div>

                        <div
                            onClick={() => changePM("card")}
                            className={`${styles.item} ${
                                order?.paymentMethod === "card"
                                    ? styles.active
                                    : ""
                            }`}
                        >
                            <span>
                                <BsFilePost />
                            </span>
                            <span>کارتخوان</span>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default PaymentMethod;
