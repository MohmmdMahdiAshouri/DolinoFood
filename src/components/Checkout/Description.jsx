import styles from "./Description.module.css";
import { TfiCommentAlt } from "react-icons/tfi";

function Description() {
    return (
        <div className="checkoutBox">
            <div className="checkoutTitle">
                <span>
                    <TfiCommentAlt />
                </span>
                <span>توضیحات سفارش</span>
            </div>

            <div className="checkoutContent">
                <textarea
                    // onChange={(e) => setOrder({...order,description:e.target.value})}
                    // value={order.description}
                    placeholder="توضیحات سفارش"
                    className={styles.description}
                ></textarea>
            </div>
        </div>
    );
}

export default Description;
