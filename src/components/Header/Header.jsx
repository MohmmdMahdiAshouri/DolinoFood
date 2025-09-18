"use client"
import { IoBagOutline } from 'react-icons/io5'
import styles from './Header.module.css'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

function Header() {

    const pathName = usePathname()

    return (
        <header className='container'>
            <div className={styles.header}>
                <div className={styles.right}>
                    <div className={styles.logo}></div>
                    <ul className={styles.menu}>
                        <li className={pathName === "/" ? styles.active : ""}>
                            <Link href={"/"}>خانه</Link>
                        </li>

                        <li className={pathName === "/browse" ? styles.active : ""}>
                            <Link href={"/browse"}>رستوران ها</Link>
                        </li>

                        <li className={pathName === "/signUp" ? styles.active : ""}>
                            <Link href={"/signUp"}>ثبت نام رستوران ها</Link>
                        </li>
                    </ul>
                </div>

                <div className={styles.left}>
                    <button className="btnOutline">ورود</button>
                    <span className={styles.cart}>
                        <IoBagOutline />
                        <span className={styles.badge}>0</span>
                    </span>
                </div>
            </div>
        </header>
    )
}

export default Header
