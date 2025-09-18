import { MdOutlineDelete } from "react-icons/md";
import styles from "./AddressList.module.css";

function AddressList() {
    return (
        <div className={styles.items}>
            <div className={styles.item}>
                <div className={styles.right}>
                    <button>
                        <MdOutlineDelete />
                    </button>
                    <p>مشهد دلاوران 43 آرمان 9</p>
                </div>
                <div className={styles.left}>
                    <button className="btn">ویرایش</button>
                    <button className="btn">انتخاب</button>
                </div>
            </div>

            <div className={styles.item}>
                <div className={styles.right}>
                    <button>
                        <MdOutlineDelete />
                    </button>
                    <p>مشهد دلاوران 43 آرمان 9</p>
                </div>
                <div className={styles.left}>
                    <button className="btn">ویرایش</button>
                    <button className="btn">انتخاب</button>
                </div>
            </div>

            <div className={styles.item}>
                <div className={styles.right}>
                    <button>
                        <MdOutlineDelete />
                    </button>
                    <p>مشهد دلاوران 43 آرمان 9</p>
                </div>
                <div className={styles.left}>
                    <button className="btn">ویرایش</button>
                    <button className="btn">انتخاب</button>
                </div>
            </div>
        </div>
    );
}

export default AddressList;
