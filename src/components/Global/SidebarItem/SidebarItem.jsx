"use client"
import Link from "next/link";
import styles from "./SidebarItem.module.css";
import { checkAccess } from "@/utils/ClientFunctions";
import { usePathname } from "next/navigation";

function SidebarItem({ data}) {
    
    const pathName = usePathname();

    return (
        // <>
        //     {checkAccess(data.access, "MERCHANT") && (
        //         <li className={`${styles.item} ${data.link === pathName ? styles.active : ""}`}>
        //             <span>{data.icon}</span>
        //             <Link href={data.link}>{data.title}</Link>
        //         </li>
        //     )}
        // </>

        <li className={`${styles.item} ${data.link === pathName ? styles.active : ""}`}>
            <span>{data.icon}</span>
            <Link href={data.link}>{data.title}</Link>
        </li>
    );
}

export default SidebarItem;
