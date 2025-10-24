import { RiDiscountPercentLine } from "react-icons/ri";
import styles from "./Discount.module.css";
import { useContext, useRef, useState } from "react";
import { fetchData } from "@/utils/ClientFunctions";
import Notification from "../Global/Notification/Notification";
import Loading from "../Global/Loading/Loading";
import { OrderContext } from "@/context/OrderContext";
import { CartContext } from "@/context/CartContext";

function Discount() {
    const [code, setCode] = useState("");
    const [loading, setLoading] = useState(false);
    const { order, setOrder, getOrder } = useContext(OrderContext);
    const {getCart} = useContext(CartContext)

    const notifRef = useRef();

    const checkCode = async () => {
        setLoading(true);
        const res = await fetchData("/api/discount/check", "POST", { code });
        if (res.success) {
            notifRef?.current?.openSuccess(res.message);
            getCart()
            getOrder()
        } else {
            notifRef.current.openError(res.message);
        }
        setLoading(false);
    };

    const deleteDiscount = async () => {
        setLoading(true);
        const res = await fetchData("/api/discount/deleteDiscount", "POST");
        if (res.success) {
            notifRef.current.openError(res.message);
            getCart()
            getOrder()
        } else {
            notifRef.current.openError(res.message);
        }
        setLoading(false);
    };

    return (
        <>
            <Notification ref={notifRef} />
            <Loading loading={loading}>
                <div className="checkoutBox">
                    <div className="checkoutTitle">
                        <span>
                            <RiDiscountPercentLine />
                        </span>
                        <span>کد تخفیف</span>
                    </div>

                    <div className="checkoutContent">
                        {order?.discount ? (
                            <>
                                <span className={styles.code}>
                                    {JSON.parse(order?.discount).code}
                                </span>
                                <button
                                    style={{ marginRight: "5px" }}
                                    className="btn"
                                    onClick={deleteDiscount}
                                >
                                    حذف
                                </button>
                            </>
                        ) : (
                            <div className={styles.input}>
                                <input
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                />
                                <button onClick={checkCode} className="btn">
                                    ثبت کد
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </Loading>
        </>
    );
}

export default Discount;
