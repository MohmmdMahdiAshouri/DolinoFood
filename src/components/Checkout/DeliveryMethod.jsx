"use client";
import { useState } from "react";
import styles from "./DeliveryMethod.module.css";
import { MdOutlineSportsMotorsports } from "react-icons/md";
import { GrDeliver } from "react-icons/gr";
import { BsBagCheck } from "react-icons/bs";

function DeliveryMethod() {
    const [active, setActive] = useState(null);

    return (
        <div className="checkoutBox">
            <div className="checkoutTitle">
                <span>
                    <GrDeliver />
                </span>
                <span>روش ارسال</span>
            </div>

            <div className="checkoutContent">
                <div className={styles.items}>
                    <div
                        onClick={() => setActive(1)}
                        className={`${styles.item} ${
                            active === 1 ? styles.active : null
                        }`}
                    >
                        <div className={styles.right}>
                            <div className={styles.check}>
                                <span className={styles.radio}></span>
                            </div>
                            <div className={styles.description}>
                                <span>ارسال توسط پیک</span>
                                <span>توسط پیک رستوران ارسال شود</span>
                            </div>
                        </div>
                        <div className={styles.left}>
                            <span className={styles.icon}>
                                <MdOutlineSportsMotorsports />
                            </span>
                        </div>
                    </div>

                    <div
                        onClick={() => setActive(2)}
                        className={`${styles.item} ${
                            active === 2 ? styles.active : null
                        }`}
                    >
                        <div className={styles.right}>
                            <div className={styles.check}>
                                <span className={styles.radio}></span>
                            </div>
                            <div className={styles.description}>
                                <span>تحویل حضوری</span>
                                <span>خودم در محل رستوران تحویل میگیرم</span>
                            </div>
                        </div>
                        <div className={styles.left}>
                            <span className={styles.icon}>
                                <BsBagCheck />
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default DeliveryMethod;
