import styles from "./FinalPrice.module.css";

function FinalPrice() {
    return (
        <div className={styles.finalPrice}>
            <div className={styles.text}>
                <span className={styles.tx1}>پرداختی شما:</span>
                <span className={styles.price}>258000</span>
                <span className={styles.toomal}>تومان</span>
            </div>
            <button>ثبت سفارش</button>
        </div>
    );
}

export default FinalPrice;
