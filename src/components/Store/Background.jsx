import Image from "next/image";
import styles from "./Background.module.css";
import Link from "next/link";
import { IoIosArrowBack } from "react-icons/io";
import Logo from "./Logo";
import Favorits from "./Favorits";

function Background({data}) {
    const {logo , background} = data
    return (
        <div className={styles.back}>
            <div className={styles.image}>
                <Image
                    fill
                    alt=""
                    src={`${process.env.NEXT_PUBLIC_LIARA_IMAGE_URL}${background}`}
                    placeholder="blur"
                    blurDataURL="/images/vector.webp"
                    objectFit="cover"
                />
            </div>

            <Link className={styles.backBtn} href={"/"}>
                <span>بازگشت</span>
                <IoIosArrowBack fontSize={16}/>
            </Link>

            <Logo logo={logo}/>
            <Favorits />
        </div>
    );
}

export default Background;
