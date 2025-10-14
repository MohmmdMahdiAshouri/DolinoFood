"use client";
import { IoBagOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import styles from "./Header.module.css";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useContext } from "react";
import { ViewContext } from "@/context/ViewContext";

function Header() {
    const pathName = usePathname();

    const router = useRouter();

    const { data: userData } = useSession();

    const { setOpenLoginModal } = useContext(ViewContext);

    const login = () => {
        setOpenLoginModal(true);
    };

    return (
        <header className="container">
            <div className={styles.header}>
                <div className={styles.right}>
                    <div className={styles.logo}></div>
                    <ul className={styles.menu}>
                        <li className={pathName === "/" ? styles.active : ""}>
                            <Link href={"/"}>خانه</Link>
                        </li>

                        <li
                            className={
                                pathName === "/browse" ? styles.active : ""
                            }
                        >
                            <Link href={"/browse"}>رستوران ها</Link>
                        </li>

                        <li
                            className={
                                pathName === "/signUp/restaurants" ? styles.active : ""
                            }
                        >
                            <Link href={"/signUp/restaurants"}>
                                ثبت نام رستوران ها
                            </Link>
                        </li>

                        <li
                            className={
                                pathName === "/signUp/users" ? styles.active : ""
                            }
                        >
                            <Link href={"/signUp/users"}>ثبت نام کاربران</Link>
                        </li>
                    </ul>
                </div>

                <div className={styles.left}>
                    {!userData ? (
                        <button onClick={login} className="btnOutline">
                            ورود
                        </button>
                    ) : (
                        <button
                            style={{
                                display: "flex",
                                justifyContent: "center",
                                alignItems: "center",
                                padding: "10px",
                                fontSize: "17px",
                                borderRadius: "50%",
                            }}
                            className="btnOutline"
                            onClick={() => {
                                if (
                                    userData.user.roles.includes("SUPERADMIN")
                                ) {
                                    router.push("/dashboard/restaurants");
                                } else if (
                                    userData.user.roles.includes("MERCHANT")
                                ) {
                                    router.push("/dashboard/account");
                                } else {
                                    router.push("/dashboard/user");
                                }
                            }}
                        >
                            <FaRegUser />
                        </button>
                    )}
                    <span className={styles.cart}>
                        <IoBagOutline />
                        <span className={styles.badge}>0</span>
                    </span>
                </div>
            </div>
        </header>
    );
}

export default Header;
