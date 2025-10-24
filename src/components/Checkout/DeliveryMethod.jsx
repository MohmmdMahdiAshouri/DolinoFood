"use client";
import { useContext, useRef, useState } from "react";
import styles from "./DeliveryMethod.module.css";
import { MdOutlineSportsMotorsports } from "react-icons/md";
import { GrDeliver } from "react-icons/gr";
import { BsBagCheck } from "react-icons/bs";
import { OrderContext } from "@/context/OrderContext";
import Notification from "../Global/Notification/Notification";
import Loading from "../Global/Loading/Loading";
import { fetchData } from "@/utils/ClientFunctions";
import { CartContext } from "@/context/CartContext";

function DeliveryMethod() {
    const { order, setOrder, getOrder } = useContext(OrderContext);
    const { getCart } = useContext(CartContext);
    const [loading, setLoading] = useState(false);
    const notifRef = useRef();

    const changeHandler = async (service) => {
        const res = await fetchData("/api/order/changeService", "POST", {
            service,
        });
        if (res.success) {
            setOrder({ ...order, deliveryType: service });
            await getCart();
        } else {
            notifRef.current.openError(res.message);
        }
    };

    return (
        <>
            <Notification ref={notifRef} />
            <Loading loading={loading}>
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
                                onClick={async () =>
                                    await changeHandler("delivery")
                                }
                                className={`${styles.item} ${
                                    order?.deliveryType === "delivery"
                                        ? styles.active
                                        : null
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
                                onClick={async () =>
                                    await changeHandler("collection")
                                }
                                className={`${styles.item} ${
                                    order?.deliveryType === "collection"
                                        ? styles.active
                                        : null
                                }`}
                            >
                                <div className={styles.right}>
                                    <div className={styles.check}>
                                        <span className={styles.radio}></span>
                                    </div>
                                    <div className={styles.description}>
                                        <span>تحویل حضوری</span>
                                        <span>
                                            خودم در محل رستوران تحویل میگیرم
                                        </span>
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
            </Loading>
        </>
    );
}

export default DeliveryMethod;
