"use client";
import { useContext, useRef, useState } from "react";
import styles from "@/components/SignUp/Users/SignUpUsers.module.css";
import Loading from "@/components/Global/Loading/Loading";
import Notification from "@/components/Global/Notification/Notification";
import { fetchData } from "@/utils/ClientFunctions";
import { ViewContext } from "@/context/ViewContext";

function SignUpUsers() {
    const {setUserLogin} = useContext(ViewContext)
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({
        first_name : "",
        last_name : "",
        mobile : "",
    })

    const notifRef = useRef()

    const changeHandler = (e) => {
        setData({...data , [e.target.name] : e.target.value})
    }

    const submitForm = async (e) => {
        e.preventDefault()

        setLoading(true)
        const res = await fetchData("/api/public/signUpUsers" , "POST", data)
        if(res.success){
            notifRef.current.openSuccess(res.message)
            setData({
                first_name : "",
                last_name : "",
                mobile : "",
            })
        }else{
            notifRef.current.openError(res.message)
        }
        setLoading(false)
    }
    return (
        <div className="container">
            <Notification ref={notifRef} />
            <Loading loading={loading}>
                <form className={styles.items}>
                    <div className={styles.item}>
                        <input
                            onChange={changeHandler}
                            name="first_name"
                            type="text"
                            placeholder="نام"
                            value={data.first_name}
                        />
                    </div>

                    <div className={styles.item}>
                        <input
                            onChange={changeHandler}
                            name="last_name"
                            type="text"
                            placeholder="نام خانوادگی"
                            value={data.last_name}
                        />
                    </div>

                    <div className={styles.item}>
                        <input
                            onChange={changeHandler}
                            name="mobile"
                            type="text"
                            placeholder="شماره موبایل"
                            value={data.mobile}
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
                        <a
                            onClick={() => setUserLogin(true)}
                            className={styles.existAccount}
                        >
                            حساب کاربری دارید؟
                        </a>
                    </div>
                </form>
            </Loading>
        </div>
    );
}

export default SignUpUsers;
