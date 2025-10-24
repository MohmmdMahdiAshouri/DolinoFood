"use client"
import Link from "next/link";
import styles from "./Success.module.css";
import { Result, Watermark } from "antd";

function Success({ orderId }) {
    return (
        <>
            <Watermark
                zIndex={-100}
                content="موفق بود"
                rotate={-20}
                gap={[85, 85]}
                offset={[40, 40]}
            >
                <Result
                    style={{
                        height: "65vh",
                        flexDirection: "column",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                    }}
                    className={styles.success}
                    status="success"
                    title="پرداخت شما موفقیت آمیز بود"
                    subTitle={`شماره سفارش : ${orderId}`}
                    extra={[
                        <Link key="console" href={`/tracking/${orderId}`} className={`btn ${styles.link}`}>
                            پیگیری سفارش
                        </Link>,
                    ]}
                />
            </Watermark>
        </>
    );
}

export default Success;
