import styles from "./AddAddress.module.css";
import Map from "./Map";

function AddAddress() {
    return (
        <div className={styles.items}>
            <div className={styles.item}>
                <label>استان</label>
                <input name={"state"} />
            </div>

            <div className={styles.item}>
                <label>شهر</label>
                <input name={"city"} />
            </div>

            <div className={styles.item}>
                <label>موبایل</label>
                <input name={"mobile"} />
            </div>

            <div className={styles.item}>
                <label>کد پستی</label>
                <input name={"postalCode"} />
            </div>

            <div className={styles.item}>
                <label>آدرس کامل</label>
                <input name={"details"} />
            </div>

            <div style={{ width: "100%" }} className={styles.item}>
                <Map />
            </div>
        </div>
    );
}

export default AddAddress;
