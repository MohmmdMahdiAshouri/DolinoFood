import Link from "next/link";
import styles from "./Success.module.css";
import { Result, Watermark } from "antd";

function UnSuccess() {
    return (
        <>
            <Watermark
                zIndex={-100}
                content="خطا"
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
                    status="error"
                    title="پرداخت شما موفقیت آمیز نبود! "
                    extra={[
                        <Link
                            key="console"
                            href={"/checkout"}
                            className={`btn ${styles.link}`}
                        >
                            بازگشت به سفارش
                        </Link>,
                    ]}
                />
            </Watermark>
        </>
    );
}

export default UnSuccess;
