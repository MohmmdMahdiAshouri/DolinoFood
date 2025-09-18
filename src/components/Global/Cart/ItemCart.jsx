import ChangeCart from "../ChangeCart/ChangeCart";
import styles from "./ItemCart.module.css";

function ItemCart() {
    return (
        <div className={styles.item}>
            <div className={styles.right}>
                <span className={styles.title}>پپرونی</span>
                <div className={styles.price}>
                    <span>258000</span>
                    <span>تومان</span>
                </div>
            </div>

            <div className={styles.left}>
                <ChangeCart />
            </div>
        </div>
    );
}

export default ItemCart;
