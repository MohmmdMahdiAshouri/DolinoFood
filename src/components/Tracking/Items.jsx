import styles from "./Items.module.css";

function Items({data}) {
    console.log(data);
    
    return (
        <div className={styles.items}>
            <div className={styles.table}>
                <div className={styles.head}>
                    <div>عنوان</div>
                    <div>تعداد</div>
                    <div>قیمت واحد</div>
                </div>

                {
                    data?.items.map((item, index) => (
                        <div key={index} className={`${styles.head} ${styles.item}`}>
                            <div>{item.name}</div>
                            <div>{item.count}</div>
                            <div>{`${(item.price).toLocaleString()} تومان`}</div>
                        </div>
                    ))
                }

                <div className={styles.result}>
                    <div className={styles.list}>
                        <span>جمع اقلام فاکتور</span>
                        <span>{`${(data?.totalPrice)?.toLocaleString()}  تومان`}</span>
                    </div>
                    <div className={styles.list}>
                        <span>هزینه ارسال</span>
                        <span>{`${(data?.deliveryPrice)?.toLocaleString()}  تومان`}</span>
                    </div>
                    {
                        data?.discount && (
                            <div className={styles.list}>
                                <span>تخفیف</span>
                                <span>{`${(data?.discountDifference)?.toLocaleString()}  تومان`}</span>
                            </div>
                        )
                    }

                    <div className={styles.finalPrice}>
                        <span>قابل پرداخت</span>
                        <span>{`${(data?.finalPrice/10)?.toLocaleString()}  تومان`}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Items;
