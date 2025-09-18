import styles from "./User.module.css";

function User() {
    return (
        <>
            <div className={styles.items}>
                <div className={styles.item}>
                    <label>نام</label>
                    <input name="first_name" />
                </div>

                <div className={styles.item}>
                    <label>نام خانوادگی</label>
                    <input name="last_name" />
                </div>

                <div className={styles.item}>
                    <label>موبایل</label>
                    <input name="mobile" />
                </div>
            </div>
            <div className={styles.footer}>
                <button className="btn">
                    ذخیره
                </button>
            </div>
        </>
    );
}

export default User;
