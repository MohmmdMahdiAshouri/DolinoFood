import { RiDiscountPercentLine } from "react-icons/ri";
import styles from "./Discount.module.css";

function Discount() {
    return (
        <div className="checkoutBox">
            <div className="checkoutTitle">
                <span>
                    <RiDiscountPercentLine />
                </span>
                <span>کد تخفیف</span>
            </div>

            <div className="checkoutContent">
                {/* <span className={styles.code}></span>
                <button style={{ marginRight: "5px" }} className="btn">
                    حذف
                </button> */}
                <div className={styles.input}>
                    <input />
                    <button className="btn">ثبت کد</button>
                </div>
            </div>
        </div>
    );
}

export default Discount;
