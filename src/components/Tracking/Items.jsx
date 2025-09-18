import styles from "./Items.module.css";

function Items() {
    return (
        <div className={styles.items}>
            <div className={styles.table}>
                <div className={styles.head}>
                    <div>عنوان</div>
                    <div>تعداد</div>
                    <div>قیمت واحد</div>
                </div>

                <div className={`${styles.head} ${styles.item}`}>
                    <div>پپرونی</div>
                    <div>1</div>
                    <div>{`${(320000).toLocaleString()} تومان`}</div>
                </div>

                <div className={styles.result}>
                    <div className={styles.list}>
                        <span>جمع اقلام فاکتور</span>
                        <span>{`${(320000).toLocaleString()}  تومان`}</span>
                    </div>
                    <div className={styles.list}>
                        <span>هزینه ارسال</span>
                        <span>{`${(35000).toLocaleString()}  تومان`}</span>
                    </div>
                    <div className={styles.list}>
                        <span>تخفیف</span>
                        <span>{`${(50000).toLocaleString()}  تومان`}</span>
                    </div>

                    <div className={styles.finalPrice}>
                        <span>قابل پرداخت</span>
                        <span>{`${(305000).toLocaleString()}  تومان`}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Items;
