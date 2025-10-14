"use client"
import { useContext } from "react";
import styles from "./Mobile.module.css";
import { AuthContext } from "@/context/AuthContext";

function Mobile() {
    const {mobile, setMobile, submitForm} = useContext(AuthContext)
    return (
        <div className={styles.mobile}>
            <p>لطفا شماره موبایل خود را وارد کنید</p>
            <input
                type="text"
                placeholder="09*********"
                value={mobile}
                onChange={e => setMobile(e.target.value)}
            />
            <button onClick={submitForm} className={styles.send}>
                ورود
            </button>
        </div>
    );
}

export default Mobile;
