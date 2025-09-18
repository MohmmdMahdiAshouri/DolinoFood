"use client"
import { useState } from "react";
import styles from "./PaymentMethod.module.css";
import { HiOutlineCreditCard } from "react-icons/hi";
import { CiMonitor } from "react-icons/ci";
import { BsCashStack, BsFilePost } from "react-icons/bs";

function PaymentMethod() {

    const [active , setActive] = useState("online")

    return (
        <div className="checkoutBox">
            <div className="checkoutTitle">
                <span>
                    <HiOutlineCreditCard />
                </span>
                <span>روش های پرداخت</span>
            </div>

            <div className="checkoutContent">
                <div className={styles.methods}>
                    <div onClick={() => setActive("online")} className={`${styles.item} ${active === "online" ? styles.active : null}`}>
                        <span>
                            <CiMonitor />
                        </span>
                        <span>آنلاین</span>
                    </div>

                    <div onClick={() => setActive("cash")} className={`${styles.item} ${active === "cash" ? styles.active : null}`}>
                        <span>
                            <BsCashStack />
                        </span>
                        <span>پول نقد</span>
                    </div>

                    <div onClick={() => setActive("card")} className={`${styles.item} ${active === "card" ? styles.active : null}`}>
                        <span>
                            <BsFilePost />
                        </span>
                        <span>کارتخوان</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PaymentMethod;
