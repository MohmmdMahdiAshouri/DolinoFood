import Image from "next/image";
import Link from "next/link";
import styles from "./Cart.module.css";
import ItemCart from "./ItemCart";

function Cart() {
    return (
        <>
            <div>
                <div className={styles.head}>
                    <div className={styles.logo}>
                        <Image src={"/images/logotest.png"} fill alt="" />
                    </div>
                    <div className={styles.text}>
                        <h5>آماتا</h5>
                        <span className={styles.menu}>مشاهده منو</span>
                    </div>
                </div>

                <div className={styles.items}>
                    <ItemCart />
                </div>

                <div className={styles.priceItems}>
                    <div className={styles.priceItem}>
                        <span>تخفیف</span>
                        <span>25 درصد</span>
                    </div>

                    <div className={styles.priceItem}>
                        <span>هزینه ارسال</span>
                        <span>258000 تومان</span>
                    </div>
                    
                    <div className={styles.priceItem}>
                        <span>هزینه کل</span>
                        <span>258000 تومان</span>
                    </div>

                    <div className={styles.priceItem}>
                        <span>مبلغ قابل پرداخت</span>
                        <span>258000 تومان</span>
                    </div>
                </div>

                <Link href={"/checkout"} className={styles.btn}>
                    نهایی کردن سفارش
                </Link>
            </div>
            <p className={styles.empty}>سبد خرید خالی میباشد</p>
        </>
    );
}

export default Cart;
