import { useState } from "react";
import Image from "next/image";
import styles from "./FoodCart.module.css";
import ChangeCart from "../Global/ChangeCart/ChangeCart";

function FoodCart() {
    return (
        <div className={styles.card}>
            <div className={styles.image}>
                <Image
                    fill
                    src="/Images/foodtest.jpg"
                    alt="food"
                    objectFit="cover"
                    blurDataURL="/Images/vector.webp"
                />
            </div>

            <div className={styles.details}>
                <h5>پیتزا</h5>
                <div className={styles.order}>
                    <div className={styles.price}>
                        <span>300000</span>
                        <span>تومان</span>
                    </div>

                    <ChangeCart />

                    <button className={styles.add}>افزودن</button>
                </div>
            </div>
        </div>
    );
}

export default FoodCart;
