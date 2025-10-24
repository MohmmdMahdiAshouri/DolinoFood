import Image from "next/image";
import styles from "./Details.module.css";
import { converDate } from "@/utils/ClientFunctions";

function Details({ data }) {
    const createTime = data?.createdAt;
    const date = new Date(createTime);
    const msDate = date.getTime();
    const finallDate = converDate(msDate);
    
    return (
        <>
            {data && (
                <div className={styles.details}>
                    <div className={styles.content}>
                        <div className={styles.top}>
                            <div className={styles.right}>
                                <div className={styles.image}>
                                    <Image
                                        src={
                                            data?.restaurant[0].logo
                                                ? `${process.env.NEXT_PUBLIC_LIARA_IMAGE_URL}${data?.restaurant[0].logo}`
                                                : "/Images/no.png"
                                        }
                                        fill
                                        alt="res"
                                    />
                                </div>

                                <div className={styles.name}>
                                    <h4 className={styles.title}>
                                        {data?.restaurant[0].restaurantType}
                                    </h4>

                                    <span className={styles.branch}>
                                        {data?.restaurant[0].branch}
                                    </span>
                                </div>
                            </div>

                            <div className={styles.left}>
                                <div>
                                    <span className={styles.first}>
                                        سفارش دهنده :{" "}
                                    </span>
                                    <span className={styles.last}>
                                        {data?.user[0].first_name
                                            ? `${data?.user[0].first_name} ${data?.user[0].last_name}`
                                            : `${data?.user[0].mobile}`}
                                    </span>
                                </div>

                                <div>
                                    <span className={styles.first}>
                                        تارخ ثبت :{" "}
                                    </span>
                                    <span className={styles.last}>
                                        {finallDate.day} {finallDate.monthName}{" "}
                                        {finallDate.year} ساعت{" "}
                                        {finallDate.ampm == "AM"
                                            ? finallDate.hour
                                            : Number(finallDate.hour) + 12}
                                        :{finallDate.minute}
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.bottom}>
                            {data?.address[0] ? (
                                <div>
                                    <span className={styles.first}>
                                        آدرس تحویل سفارش :{" "}
                                    </span>
                                    <span className={styles.last}>
                                        {data?.address[0].state} -{" "}
                                        {data?.address[0].city} -{" "}
                                        {data?.address[0].details}
                                    </span>
                                </div>
                            ) : (
                                <div>
                                    <span className={styles.first}>
                                        سفارش را باید از رستوران تحویل بگیرید
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Details;
