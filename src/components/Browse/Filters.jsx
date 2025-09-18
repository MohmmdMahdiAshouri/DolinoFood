import styles from "./Filters.module.css";
import { FaCheck } from "react-icons/fa6";
function Filters() {
    return (
        <div className={styles.filter}>
            <div className={styles.filters}>
                <label>شعبه</label>
                <div className={styles.items}>
                    <div className={styles.item}>
                        <span>هاشمیه</span>
                        <span className={styles.check}>
                            <FaCheck />
                        </span>
                    </div>
                    <div className={styles.item}>
                        <span>هفت تیر</span>
                        <span className={styles.check}>
                            <FaCheck />
                        </span>
                    </div>
                    <div className={styles.item}>
                        <span>خیام</span>
                        <span className={styles.check}>
                            <FaCheck />
                        </span>
                    </div>
                </div>
            </div>

            <div className={styles.filters}>
                <label>سرویس</label>
                <div className={styles.items}>
                    <div className={styles.item}>
                        <span>حضوری</span>
                        <span className={`${styles.check} ${styles.active}`}>
                            <FaCheck />
                        </span>
                    </div>

                    <div className={styles.item}>
                        <span>ارسال با پیک</span>
                        <span className={styles.check}>
                            <FaCheck />
                        </span>
                    </div>

                    <div className={styles.item}>
                        <span>حضوری - ارسال با پیک</span>
                        <span className={styles.check}>
                            <FaCheck />
                        </span>
                    </div>
                </div>
            </div>

            <div className={styles.filters}>
                <label>دسته های محبوب</label>
                <div className={styles.items}>
                    <div className={styles.item}>
                        <span>پیتزا</span>
                        <span className={styles.check}>
                            <FaCheck />
                        </span>
                    </div>
                    <div className={styles.item}>
                        <span>برگر</span>
                        <span className={styles.check}>
                            <FaCheck />
                        </span>
                    </div>
                    <div className={styles.item}>
                        <span>سنتی</span>
                        <span className={styles.check}>
                            <FaCheck />
                        </span>
                    </div>
                    <div className={styles.item}>
                        <span>پاستا</span>
                        <span className={styles.check}>
                            <FaCheck />
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Filters;
