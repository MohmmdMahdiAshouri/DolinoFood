"use client";
import { MdOutlinePayments } from "react-icons/md";
import styles from "./Terminals.module.css";
import Image from "next/image";
import { useState } from "react";

function Terminals() {
    const [active, setActive] = useState("zarin");

    return (
        <div className="checkoutBox">
            <div className="checkoutTitle">
                <span>
                    <MdOutlinePayments />
                </span>
                <span>انتخاب درگاه پرداخت</span>
            </div>

            <div className="checkoutContent">
                <div className={styles.items}>
                    <div
                        onClick={() => setActive("parsian")}
                        className={`${styles.item} ${
                            active === "parsian" ? styles.active : null
                        }`}
                    >
                        <Image
                            width={50}
                            height={50}
                            alt=""
                            src={"/Images/logo-bank-parsian.png"}
                        />
                    </div>

                    <div
                        onClick={() => setActive("saman")}
                        className={`${styles.item} ${
                            active === "saman" ? styles.active : null
                        }`}
                    >
                        <Image
                            width={50}
                            height={50}
                            alt=""
                            src={"/Images/logo-bank-saman.png"}
                        />
                    </div>

                    <div
                        onClick={() => setActive("zarin")}
                        className={`${styles.item} ${
                            active === "zarin" ? styles.active : null
                        }`}
                    >
                        <Image
                            width={50}
                            height={50}
                            alt=""
                            src={"/Images/logo-zarinpal.png"}
                        />
                    </div>
                </div>

                <div className={styles.text}>
                    <h3>پرداخت از طریق کلیه کارتهای عضو شتاب امکان پذیر است</h3>
                    <p>{`(قبل از پرداخت از غیر فعال بودن فیلتر شکن مطمئن شوید)`}</p>
                </div>
            </div>
        </div>
    );
}

export default Terminals;
