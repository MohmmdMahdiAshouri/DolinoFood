import Image from "next/image";
import styles from "./Details.module.css";

function Details() {
    return (
        <div className={styles.details}>
            <div className={styles.content}>
                <div className={styles.top}>
                    <div className={styles.right}>
                        <div className={styles.image}>
                            <Image src={"/Images/logotest.png"} fill alt="" />
                        </div>

                        <div className={styles.name}>
                            <h4 className={styles.title}>
                                آماتا
                            </h4>

                            <span className={styles.branch}>
                                هاشمیه
                            </span>
                        </div>
                    </div>

                    <div className={styles.left}>
                        <div>
                            <span className={styles.first}>سفارش دهنده : </span>
                            <span className={styles.last}>
                                09923878875
                            </span>
                        </div>

                        <div>
                            <span className={styles.first}>تارخ ثبت : </span>
                            <span className={styles.last}>
                                18 آبان 1403 ساعت 20
                            </span>
                        </div>
                    </div>
                </div>

                <div className={styles.bottom}>
                    <div>
                        <span className={styles.first}>
                            آدرس تحویل سفارش :{" "}
                        </span>
                        <span className={styles.last}>
                            مشهد دلاوران 43 آرمان 9 پلاک 76
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Details;
