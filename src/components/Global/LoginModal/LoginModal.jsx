"use client";
import { useContext } from "react";
import { IoClose } from "react-icons/io5";
import styles from "./LoginModal.module.css";
import Mobile from "./Mobile";
import { ViewContext } from "@/context/ViewContext";
import Link from "next/link";

function LoginModal() {
    const { openLoginModal, setOpenLoginModal, userLogin, setUserLogin } =
        useContext(ViewContext);
    return (
        <>
            {openLoginModal && (
                <div className={styles.login}>
                    <div className={styles.content}>
                        <span
                            onClick={() => setOpenLoginModal(false)}
                            className={styles.close}
                        >
                            <IoClose />
                        </span>
                        <h3 className={styles.title}>ورود</h3>
                        <h3 className={styles.title2}>لطفا مشخص کنید</h3>
                        <div className={styles.btns}>
                            <button
                                onClick={() => {
                                    setOpenLoginModal(false);
                                    setUserLogin(true);
                                }}
                                className="btn"
                            >
                                ورود کاربر
                            </button>
                            <Link
                                onClick={() => setOpenLoginModal(false)}
                                href={"/restaurantLogin"}
                                className="btn"
                            >
                                ورود رستوران
                            </Link>
                        </div>
                    </div>
                </div>
            )}

            {userLogin && (
                <div className={styles.login}>
                    <div className={styles.content}>
                        <span
                            onClick={() => setUserLogin(false)}
                            className={styles.close}
                        >
                            <IoClose />
                        </span>
                        <h1 className={styles.title}>ورود کاربر</h1>
                        <Mobile />
                    </div>
                </div>
            )}
        </>
    );
}

export default LoginModal;
