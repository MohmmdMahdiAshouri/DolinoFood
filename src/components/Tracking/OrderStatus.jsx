import Image from "next/image";
import styles from "./OrderStatus.module.css";

function OrderStatus() {
    return (
        <div className={styles.top}>
            <div className={styles.title}>
                <h2>وضعیت سفارش</h2>
                <span className={styles.orderId}>کد رهگیری - 1257896</span>
            </div>

            <div className={styles.image}>
                <Image
                    src={"/Images/success.webp"}
                    alt=""
                    width={100}
                    height={100}
                />
            </div>

            <p>سفارش شما تحویل داده شد</p>
        </div>
    );
}

export default OrderStatus;
