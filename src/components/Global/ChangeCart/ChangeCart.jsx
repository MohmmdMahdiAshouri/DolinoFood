"use client";
import React, { useContext } from "react";
import { FiMinus } from "react-icons/fi";
import { HiPlus } from "react-icons/hi";
import styles from "./ChangeCart.module.css";
import { CartContext } from "@/context/CartContext";

function ChangeCart({count, id}) {
    const {addToCart, decrease} = useContext(CartContext)
    return (
        <>
            <div className={styles.btns}>
                <button onClick={() => addToCart(id)}>
                    <HiPlus />
                </button>
                <span>{count}</span>
                <button onClick={() => decrease(id)}>
                    <FiMinus />
                </button>
            </div>
        </>
    );
}

export default ChangeCart;
