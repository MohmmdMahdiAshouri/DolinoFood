"use client";
import React, { useContext, useState } from "react";
import { FiMinus } from "react-icons/fi";
import { HiPlus } from "react-icons/hi";
import styles from "./ChangeCart.module.css";
import { CartContext } from "@/context/CartContext";

function ChangeCart({count}) {
    const [conter, setConter] = useState(1)
    return (
        <>
            <div className={styles.btns}>
                <button onClick={() => setConter((prev) => prev + 1)}>
                    <HiPlus />
                </button>
                <span>تعداد : {count}</span>
                <button onClick={() => setConter(prev => prev > 1 ? prev - 1 : prev)}>
                    <FiMinus />
                </button>
            </div>
        </>
    );
}

export default ChangeCart;
