"use client"
import Link from "next/link";
import styles from "./SidebarItem.module.css";
import { checkAccess } from "@/utils/ClientFunctions";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";

function SidebarItem({ data}) {
    
    const pathName = usePathname();

    const {data : userData} = useSession()

    return (
        <>
            {checkAccess(data.access, userData ? userData.user.roles : "") && (
                <li className={`${styles.item} ${data.link === pathName ? styles.active : ""}`}>
                    <span>{data.icon}</span>
                    <Link href={data.link}>{data.title}</Link>
                </li>
            )}
        </>
    );
}

export default SidebarItem;
