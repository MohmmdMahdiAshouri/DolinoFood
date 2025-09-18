import Image from "next/image";
import styles from "./Background.module.css";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import Logo from "./Logo";
import Favorits from "./Favorits";

function Background() {
    return (
        <div className={styles.back}>
            <div className={styles.image}>
                <Image
                    fill
                    alt=""
                    src="/Images/testbg.webp"
                    placeholder="blur"
                    blurDataURL="/images/vector.webp"
                    objectFit="cover"
                />
            </div>

            <Link className={styles.backBtn} href={"/"}>
                <span>بازگشت</span>
                <IoIosArrowBack fontSize={16}/>
            </Link>

            <Logo />
            <Favorits />
        </div>
    );
}

export default Background;
