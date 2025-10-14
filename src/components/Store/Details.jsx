import styles from "./Details.module.css";
import { Rate } from "antd";
import { IoLocationOutline } from "react-icons/io5";
import { TfiTimer } from "react-icons/tfi";
import { GiFullMotorcycleHelmet } from "react-icons/gi";

function Details({data}) {
    const {restaurantType , branch , address , deliveryTime} = data
    return (
        <div className={styles.details}>
            <div className={styles.header}>
                <div className={styles.headRight}>
                    <h2>{restaurantType}</h2>
                    <span>({branch})</span>
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
                    <span>{address}</span>
                </div>

                <div className={styles.btLeft}>
                    <div className={styles.item}>
                        <span className={styles.icon}>
                            <TfiTimer />
                        </span>
                        <div className={styles.text}>
                            <span>{deliveryTime}</span>
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
