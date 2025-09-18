"use client";
import { useState } from "react";
import styles from "./SignUp.module.css";
import { message } from "antd";

function SignUp() {
    const [data, setData] = useState({
        name: "",
        userName: "",
        password: "",
        repeatPassword: "",
    });

    const [messageApi, contextHolder] = message.useMessage();

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const submitForm = async (e) => {
        e.preventDefault();

        if (data.password.length < 1) {
            messageApi.open({
                type: "error",
                content: "لطفا رمز عبور را به درستی وارد کنید",
            });
            return;
        } else if (data.password !== data.repeatPassword) {
            messageApi.open({
                type: "error",
                content: "رمز عبور با تکرار آن برابر نیست!",
            });
            return;
        }

        const res = await fetch("/api/public/signUpRestaurants", {
            method: "POST",
            body: JSON.stringify(data),
        });

        const final = await res.json();
        console.log(final);
    };

    return (
        <div className="container">
            {contextHolder}
            <form className={styles.items}>
                <div className={styles.item}>
                    <input
                        onChange={changeHandler}
                        name="name"
                        type="text"
                        placeholder="نام پذیرنده"
                    />
                </div>

                <div className={styles.item}>
                    <input
                        onChange={changeHandler}
                        name="userName"
                        type="text"
                        placeholder="نام کاربری"
                    />
                </div>

                <div className={styles.item}>
                    <input
                        onChange={changeHandler}
                        name="password"
                        type="password"
                        placeholder="رمز عبور"
                    />
                </div>

                <div className={styles.item}>
                    <input
                        onChange={changeHandler}
                        name="repeatPassword"
                        type="password"
                        placeholder="تکرار رمز عبور"
                    />
                </div>

                <div className={styles.footer}>
                    <button onClick={submitForm} className="btn" type="submit">
                        ثبت نام
                    </button>
                </div>
            </form>
        </div>
    );
}

export default SignUp;
