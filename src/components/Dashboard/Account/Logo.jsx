import Image from "next/image";
import styles from "./Logo.module.css";
import { IoClose } from "react-icons/io5";

function Logo() {
    return (
        <div>
            <div className={styles.image}>
                <Image
                    src={"/Images/logotest.png"}
                    fill
                    alt=""
                    objectFit="cover"
                />
                <span className="delete">
                    <IoClose />
                </span>
            </div>

            <div className={styles.inputGroup}>
                <label className={`${styles.chosefile} btn`} htmlFor="fileUpload">انتخاب فایل</label>
                <input id="fileUpload" className={styles.uploadBtn} type="file" />
                <span className={styles.fileName}>هیچ فایلی انتخاب نشده</span>
            </div>

        </div>
    );
}

export default Logo;
