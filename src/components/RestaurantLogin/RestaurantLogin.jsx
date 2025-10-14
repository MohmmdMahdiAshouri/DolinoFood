"use client";
import { useEffect, useRef, useState } from "react";
import styles from "@/components/SignUp/Restaurants/SignUpRestaurants.module.css"
import Loading from "../Global/Loading/Loading";
import Notification from "../Global/Notification/Notification";
import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

function RestaurantLogin() {
    const [data, setData] = useState({
        userName: "",
        password: "",
        redirect : false
    });

    const [loading, setLoading] = useState(false);

    const notificationRef = useRef();

    const {data : userData} = useSession()
    
    const router = useRouter()
    
    useEffect(() => {
        if(userData){
            if(userData.user.roles.includes("SUPERADMIN")){
                router.push("/dashboard/restaurants")
            }else if(userData.user.roles.includes("MERCHANT")){
                router.push("dashboard/account")
            }else{
                router.push("dashboard/orders")
            }
        }
    },[userData])

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const submitForm = async (e) => {
        e.preventDefault();

        setLoading(true);
        const res = await signIn("restaurant-login" , data)
        if(res.ok){
            notificationRef.current?.openSuccess("با موفقیت وارد شدید");
            setData({
                userName : "",
                password : "",
            })
            // router.push("/dashboard/account")
        }else{
            notificationRef.current?.openError(res.error)
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

                    <div className={styles.footer}>
                        <button
                            onClick={submitForm}
                            className="btn"
                            type="submit"
                        >
                            ورود
                        </button>
                    </div>
                </form>
            </Loading>
        </div>
    );
}

export default RestaurantLogin;
