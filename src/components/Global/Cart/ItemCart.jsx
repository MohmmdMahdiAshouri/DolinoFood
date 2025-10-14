import { useContext, useState } from "react";
import ChangeCart from "../ChangeCart/ChangeCart";
import styles from "./ItemCart.module.css";
import { CartContext } from "@/context/CartContext";

function ItemCart() {
    const {cart} = useContext(CartContext)
    return (
        <>
            {
                cart && cart?.items.map((food , index) => (
                    <div key={index} className={styles.item}>
                        <div className={styles.right}>
                            <span className={styles.title}>{food.name}</span>
                            <div className={styles.price}>
                                <span>{food.price.toLocaleString()}</span>
                                <span>تومان</span>
                            </div>
                        </div>

                        <div className={styles.left}>
                            <ChangeCart count={food.count}/>
                        </div>
                    </div>
                ))
            }
        </>
    );
}

export default ItemCart;
