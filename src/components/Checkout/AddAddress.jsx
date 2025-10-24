import { useContext } from "react";
import styles from "./AddAddress.module.css";
import dynamic from 'next/dynamic'
import { AddressContext } from "@/context/AddressContext";
const Map = dynamic(() => import('./Map'), { ssr: false })

function AddAddress() {
    const {data, changeHandler} = useContext(AddressContext)

    return (
        <div className={styles.items}>
            <div className={styles.item}>
                <label>استان</label>
                <input value={data.state} onChange={changeHandler} name={"state"} />
            </div>

            <div className={styles.item}>
                <label>شهر</label>
                <input value={data.city} onChange={changeHandler} name={"city"} />
            </div>

            <div className={styles.item}>
                <label>موبایل</label>
                <input value={data.mobile} onChange={changeHandler} name={"mobile"} />
            </div>

            <div className={styles.item}>
                <label>کد پستی (اختیاری)</label>
                <input value={data.postalCode} onChange={changeHandler} name={"postalCode"} />
            </div>

            <div style={{width: "100%"}} className={styles.item}>
                <label>آدرس کامل</label>
                <input value={data.details} onChange={changeHandler} name={"details"} />
            </div>

            <div style={{ width: "100%" }} className={styles.item}>
                <Map />
            </div>
        </div>
    );
}

export default AddAddress;
