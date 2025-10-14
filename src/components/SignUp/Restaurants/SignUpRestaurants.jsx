"use client";
import { useRef, useState } from "react";
import styles from "@/components/SignUp/Restaurants/SignUpRestaurants.module.css";
import Loading from "@/components/Global/Loading/Loading";
import Notification from "@/components/Global/Notification/Notification";
import { fetchData } from "@/utils/ClientFunctions";
import Link from "next/link";

function SignUp() {
    const [data, setData] = useState({
        name: "",
        userName: "",
        password: "",
        repeatPassword: "",
    });

    const [loading, setLoading] = useState(false);

    const notificationRef = useRef();

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const submitForm = async (e) => {
        e.preventDefault();

        if (data.password.length < 1) {
            notificationRef.current?.openError(
                "لطفا رمز عبور را به درستی وارد کنید"
            );
            return;
        } else if (data.password !== data.repeatPassword) {
            notificationRef.current?.openError(
                "رمز عبور با تکرار آن برابر نیست!"
            );
            return;
        }

        setLoading(true);
        const res = await fetchData(
            "/api/public/signUpRestaurants",
            "POST",
            data
        );
        if (res.status === 403) {
            Object.keys(res.data).forEach((item) => {
                notificationRef.current?.openError(res.data[item]);
            });
        } else if (!res.success) {
            notificationRef.current?.openError(res.message);
        } else {
            notificationRef.current?.openSuccess(res.message);
            setData({
                name: "",
                userName: "",
                password: "",
                repeatPassword: "",
            });
        }
        setLoading(false);
    };

    return (
        <div className="container">
            <Notification ref={notificationRef} />
            <Loading loading={loading}>
                <form className={styles.items}>
                    <div className={styles.item}>
                        <input
                            onChange={changeHandler}
                            name="name"
                            type="text"
                            placeholder="نام پذیرنده"
                            value={data.name}
                        />
                    </div>

                    <div className={styles.item}>
                        <input
                            onChange={changeHandler}
                            name="userName"
                            type="text"
                            placeholder="نام کاربری"
                            value={data.userName}
                        />
                    </div>

                    <div className={styles.item}>
                        <input
                            onChange={changeHandler}
                            name="password"
                            type="password"
                            placeholder="رمز عبور"
                            value={data.password}
                        />
                    </div>

                    <div className={styles.item}>
                        <input
                            onChange={changeHandler}
                            name="repeatPassword"
                            type="password"
                            placeholder="تکرار رمز عبور"
                            value={data.repeatPassword}
                        />
                    </div>

                    <div className={styles.footer}>
                        <button
                            onClick={submitForm}
                            className="btn"
                            type="submit"
                        >
                            ثبت نام
                        </button>
                        <Link className={styles.existAccount} href={"/restaurantLogin"}>حساب کاربری دارید؟</Link>
                    </div>
                </form>
            </Loading>
        </div>
    );
}

export default SignUp;
