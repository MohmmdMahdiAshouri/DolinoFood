"use client";
import Image from "next/image";
import styles from "./FoodCart.module.css";
import ChangeCart from "../Global/ChangeCart/ChangeCart";
import { useContext, useState } from "react";
import { CartContext } from "@/context/CartContext";

function FoodCart({ data }) {
    const { addToCart } = useContext(CartContext);
    return (
        <div className={styles.card}>
            <div className={styles.image}>
                <Image
                    fill
                    src={`${process.env.NEXT_PUBLIC_LIARA_IMAGE_URL}${data.image}`}
                    alt="food"
                    objectFit="cover"
                    blurDataURL="/Images/vector.webp"
                />
            </div>

            <div className={styles.details}>
                <h5>{data.name}</h5>
                <div className={styles.order}>
                    <div className={styles.price}>
                        <span>{data.price.toLocaleString()}</span>
                        <span>تومان</span>
                    </div>

                    <button
                        onClick={() => {
                            addToCart(data._id);
                        }}
                        className={styles.add}
                    >
                        افزودن
                    </button>
                </div>
            </div>
        </div>
    );
}

export default FoodCart;
