import Image from "next/image";
import styles from "./OrderStatus.module.css";

function OrderStatus({ data }) {
    const changeIcon = (status) => {
        switch (status) {
            case "paid":
                return "/Images/success.webp";

            case "waiting":
                return "/Images/wait.png";

            default:
                return "/Images/success.webp";
        }
    };

    const changeTitle = (status) => {
        switch (status) {
            case "paid":
                return "سفارش شما پرداخت شد";

            case "waiting":
                return "در انتظار تایید...";

            default:
                return "وضعیت سفارش نامشخص";
        }
    };

    return (
        <div className={styles.top}>
            <div className={styles.title}>
                <h2>وضعیت سفارش</h2>
                <span className={styles.orderId}>
                    کد رهگیری - {data?.orderId}
                </span>
            </div>

            <div className={styles.image}>
                <Image
                    src={`${changeIcon(data?.status)}`}
                    alt=""
                    width={100}
                    height={100}
                />
            </div>

            <p>{changeTitle(data?.status)}</p>
        </div>
    );
}

export default OrderStatus;
