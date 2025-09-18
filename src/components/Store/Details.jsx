import styles from "./Details.module.css";
import { Rate } from "antd";
import { IoLocationOutline } from "react-icons/io5";
import { TfiTimer } from "react-icons/tfi";
import { GiFullMotorcycleHelmet } from "react-icons/gi";

function Details() {
    return (
        <div className={styles.details}>
            <div className={styles.header}>
                <div className={styles.headRight}>
                    <h2>آماتا</h2>
                    <span>{`(مشهد)`}</span>
                </div>

                <div className={styles.headLeft}>
                    <span className={styles.status}></span>
                    <span className={styles.ready}>آماده سفارش هستیم</span>
                </div>
            </div>

            <div className={styles.center}>
                <div className={styles.rate}>
                    <Rate
                        allowHalf
                        value={2.5}
                        style={{ fontSize: "23px", color: "#ef4123" }}
                    />
                </div>

                <div className={styles.avrage}>4.75</div>

                <div className={styles.comments}>مشاهده 4 نظر</div>
            </div>

            <div className={styles.bottom}>
                <div className={styles.btRight}>
                    <IoLocationOutline />
                    <span>هاشمیه</span>
                </div>

                <div className={styles.btLeft}>
                    <div className={styles.item}>
                        <span className={styles.icon}>
                            <TfiTimer />
                        </span>
                        <div className={styles.text}>
                            <span>50 دقیقه</span>
                            <span>میانگین زمان ارسال</span>
                        </div>
                    </div>

                    <div className={styles.item}>
                        <span className={styles.icon}>
                            <GiFullMotorcycleHelmet />
                        </span>
                        <div className={styles.text}>
                            <span>انتخاب آدرس</span>
                            <span>هزینه ارسال</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Details;
