"use client";
import { useContext, useEffect, useState } from "react";
import styles from "./Account.module.css";
import Modal from "@/components/Global/Modal/Modal";
import { notification } from "antd";
import Logo from "./Logo";
import Background from "./Background";
import Map from "./Map";
import ChangeMap from "./ChangeMap";
import { AccountContext } from "@/context/AccountContext";
import Loading from "@/components/Global/Loading/Loading";

function Account() {
    const [position, setPosition] = useState([36.30021245, 59.5128987]);
    const [initialPosition, setInitialPosition] = useState(null);
    const [open, setOpen] = useState(false);
    const [api, contextHolder] = notification.useNotification();

    const { getData, loading, error, userData, setUserData, update } =
        useContext(AccountContext);

    const handleOpenMap = () => {
        setInitialPosition(position);
        setOpen(true);
    };

    const handleSuccess = () => {
        setUserData({...userData ,lat : position[0] , lng : position[1] })
        if (
            !initialPosition ||
            initialPosition[0] !== position[0] ||
            initialPosition[1] !== position[1]
        ) {
            api.success({
                message: "مکان شما با موفقیت تنظیم شد",
            });
        }
        setOpen(false)
    };

    useEffect(() => {
        getData();
    }, []);

    const changeHandler = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    };

    return (
        <Loading loading={loading} error={error}>
            <div className={styles.account}>
                {contextHolder}
                <div className={styles.images}>
                    <Logo />
                    <Background />
                </div>

                <div className={styles.items}>
                    <div className={styles.item}>
                        <label>نام پذیرنده</label>
                        <input
                            name="name"
                            onChange={changeHandler}
                            value={userData?.name ?? ""}
                        />
                    </div>

                    <div className={styles.item}>
                        <label>نام رستوران</label>
                        <input
                            name="restaurantType"
                            type="email"
                            onChange={changeHandler}
                            value={userData?.restaurantType ?? ""}
                        />
                    </div>

                    <div className={styles.item}>
                        <label>نام کاربری</label>
                        <input
                            name="userName"
                            onChange={changeHandler}
                            value={userData?.userName ?? ""}
                            disabled
                        />
                    </div>

                    <div className={styles.item}>
                        <label>زمان تحویل</label>
                        <input
                            name="deliveryTime"
                            onChange={changeHandler}
                            value={userData?.deliveryTime ?? ""}
                        />
                    </div>

                    <div className={styles.item}>
                        <label>شعبه</label>
                        <input
                            name="branch"
                            onChange={changeHandler}
                            value={userData?.branch ?? ""}
                        />
                    </div>

                    <div className={styles.item}>
                        <label>آدرس</label>
                        <input
                            name="address"
                            onChange={changeHandler}
                            value={userData?.address ?? ""}
                        />
                    </div>

                    <div className={styles.item}>
                        <label>سرویس ها</label>
                        <select
                            name="service"
                            onChange={changeHandler}
                            value={userData?.service ?? "collection"}
                        >
                            <option className={styles.option} value={"collection"}>
                                تحویل رستوران
                            </option>
                            <option className={styles.option} value={"delivery"}>
                                ارسال با پیک
                            </option>
                            <option
                                className={styles.option}
                                value={"collection-delivery"}
                            >
                                تحویل رستوران - ارسال با پیک
                            </option>
                        </select>
                    </div>

                    <div className={styles.item}>
                        <label>محبوب ها</label>
                        <div className={styles.popContainer}>
                            <span className={`${styles.pop} ${styles.active}`}>
                                برگر
                            </span>
                            <span className={styles.pop}>پیتزا</span>
                            <span className={styles.pop}>ساندویچ</span>
                        </div>
                    </div>

                    <div style={{ width: "100%" }} className={styles.item}>
                        <label className={styles.label}>نقشه</label>
                        {
                            userData?.lat && <Map position={[userData.lat , userData.lng]} />
                        }
                        
                        <button
                            onClick={handleOpenMap}
                            style={{ marginTop: "10px" }}
                            className="btn"
                        >
                            انتخاب
                        </button>
                    </div>
                </div>

                <div className={styles.footer}>
                    <button onClick={update} className="btn">ذخیره</button>
                </div>

                <Modal
                    title="لطفا مکان مورد نظر را مشخص کنید"
                    open={open}
                    setOpenModal={setOpen}
                    action={handleSuccess}
                >
                    <ChangeMap position={position} setPosition={setPosition} />
                </Modal>
            </div>
        </Loading>
    );
}

export default Account;
