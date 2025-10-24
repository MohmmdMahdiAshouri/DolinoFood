"use client";
import { useContext } from "react";
import styles from "./Modal.module.css";
import { IoCloseSharp } from "react-icons/io5";
import { CartContext } from "@/context/CartContext";
import Link from "next/link";

function Modal({
    title,
    children,
    open,
    setOpenModal,
    action,
    btnText,
    storeModal,
}) {
    const {cart} = useContext(CartContext)
    return (
        <>
            {open && (
                <div className={styles.modal}>
                    <div className={styles.content}>
                        <header className={styles.header}>
                            <h3>{title}</h3>
                            <button onClick={() => setOpenModal(false)}>
                                <IoCloseSharp />
                            </button>
                        </header>

                        <div className={styles.center}>
                            {storeModal ? (
                                <h3 className={styles.text}>
                                    سبد خرید شما از فروشگاه{" "}
                                    <span className={styles.restaurant}>
                                        {cart?.restaurant[0].restaurantType}
                                    </span>{" "}
                                    است آیا میخواهید آن را حذف کنید؟
                                </h3>
                            ) : (
                                children
                            )}
                        </div>

                        <div className={styles.footer}>
                            <button
                                className="btn"
                                onClick={() => {
                                    setOpenModal(false);
                                    if (action) action();
                                }}
                            >
                                {btnText ? btnText : "ذخیره"}
                            </button>
                            <button
                                className="btnOutline"
                                onClick={() => setOpenModal(false)}
                            >
                                انصراف
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Modal;
