import Image from "next/image";
import styles from "./Logo.module.css";
import { IoClose } from "react-icons/io5";
import { useContext, useEffect, useRef, useState } from "react";
import { uploadFile } from "@/utils/ClientFunctions";
import { AccountContext } from "@/context/AccountContext";
import Notification from "@/components/Global/Notification/Notification";
import Loading from "@/components/Global/Loading/Loading";

function Logo() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const { userData, setUserData } = useContext(AccountContext);

    const notifRef = useRef();

    const handleUpload = async () => {
        setLoading(true);
        const result = await uploadFile(file);
        if (result.success) {
            setUserData({ ...userData, logo: result.newFileName });
            notifRef.current.openSuccess("آپلود شد");
        } else {
            notifRef.current.openError(result.message);
        }
        setLoading(false);
    };

    const handleDelete = async () => {
        await setUserData({ ...userData, logo: "" });
        setFile(null);
    };

    useEffect(() => {
        if (file) {
            handleUpload();
        }
    }, [file]);

    return (
        <div>
            <Notification ref={notifRef} />
            <Loading loading={loading}>
                <div className={styles.image}>
                    <Image
                        src={
                            userData?.logo
                                ? `${process.env.NEXT_PUBLIC_LIARA_IMAGE_URL}${userData.logo}`
                                : "/Images/no.png"
                        }
                        fill
                        alt=""
                        objectFit={`${userData?.logo ? "cover" : "contain"}`}
                    />
                    {userData?.logo ? (
                        <span onClick={handleDelete} className="delete">
                            <IoClose />
                        </span>
                    ) : (
                        ""
                    )}
                </div>

                <div className={styles.inputGroup}>
                    <label
                        className={`${styles.chosefile} btn`}
                        htmlFor="fileUpload"
                    >
                        انتخاب فایل
                    </label>
                    <input
                        onChange={(e) => setFile(e.target.files[0])}
                        id="fileUpload"
                        className={styles.uploadBtn}
                        type="file"
                    />
                    <span className={styles.fileName}>{file?.name}</span>
                </div>
            </Loading>
        </div>
    );
}

export default Logo;
