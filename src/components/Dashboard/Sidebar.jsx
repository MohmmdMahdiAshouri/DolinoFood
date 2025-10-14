"use client"
import styles from "./Sidebar.module.css";
import { LuUserRound } from "react-icons/lu";
import { TbListDetails } from "react-icons/tb";
import { BsShop } from "react-icons/bs";
import { BiCategoryAlt } from "react-icons/bi";
import { IoDocumentTextOutline, IoFastFoodOutline } from "react-icons/io5";
import { MdOutlineDiscount, MdOutlineFastfood } from "react-icons/md";
import { GoComment } from "react-icons/go";
import { IoMdLogOut } from "react-icons/io";
import SidebarItem from "../Global/SidebarItem/SidebarItem";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

function Sidebar() {

    const router = useRouter()

    const list = [
        {
            title: "پروفایل",
            icon: <LuUserRound />,
            link: "/dashboard/user",
            access: ["USER"],
        },
        {
            title: "اطلاعات فروشگاه",
            icon: <TbListDetails />,
            link: "/dashboard/account",
            access: ["MERCHANT"],
        },
        {
            title: "لیست فروشگاه ها",
            icon: <BsShop />,
            link: "/dashboard/restaurants",
            access: ["SUPERADMIN"],
        },
        {
            title: "دسته بندی غذاها",
            icon: <BiCategoryAlt />,
            link: "/dashboard/foodCategory",
            access: ["MERCHANT"],
        },
        {
            title: "غذاها",
            icon: <IoFastFoodOutline />,
            link: "/dashboard/foods",
            access: ["MERCHANT"],
        },
        {
            title: "سفارشات",
            icon: <IoDocumentTextOutline />,
            link: "/dashboard/adminorders",
            access: ["MERCHANT"],
        },
        {
            title: "سفارشات",
            icon: <IoDocumentTextOutline />,
            link: "/dashboard/orders",
            access: ["USER"],
        },
        {
            title: "محبوب ها",
            icon: <MdOutlineFastfood />,
            link: "/dashboard/populars",
            access: ["SUPERADMIN"],
        },
        {
            title: "کد های تخفیف",
            icon: <MdOutlineDiscount />,
            link: "/dashboard/discount",
            access: ["SUPERADMIN", "MERCHANT"],
        },
        {
            title: "نظرات",
            icon: <GoComment />,
            link: "/dashboard/comments",
            access: ["SUPERADMIN", "MERCHANT"],
        },
    ];

    return (
        <div className={styles.sidebar}>
            <ul className={styles.list}>
                {list.map((item, index) => (
                    <SidebarItem key={index} data={item} />
                ))}

                <li className={styles.logOut} onClick={async () => {
                    await signOut({redirect : false})
                    router.push("/")
                }}>
                    <span>
                        <IoMdLogOut />
                    </span>
                    <div>خروج</div>
                </li>
            </ul>
        </div>
    );
}

export default Sidebar;
