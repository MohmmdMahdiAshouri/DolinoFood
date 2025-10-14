import Image from "next/image";
import styles from "./Background.module.css";
import { IoClose } from "react-icons/io5";
import { useContext, useEffect, useRef, useState } from "react";
import Notification from "@/components/Global/Notification/Notification";
import Loading from "@/components/Global/Loading/Loading";
import { uploadFile } from "@/utils/ClientFunctions";
import { AccountContext } from "@/context/AccountContext";

function Background() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const { userData, setUserData } = useContext(AccountContext);

    const notifRef = useRef();

    const handleUpload = async () => {
        setLoading(true);
        const result = await uploadFile(file);
        if (result.success) {
            setUserData({ ...userData, background: result.newFileName });
            notifRef.current.openSuccess("آپلود شد");
        } else {
            notifRef.current.openError(result.message);
        }
        setLoading(false);
    };

    const handleDelete = async () => {
        await setUserData({ ...userData, background: "" });
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
                            userData?.background
                                ? `${process.env.NEXT_PUBLIC_LIARA_IMAGE_URL}${userData.background}`
                                : "/Images/no.png"
                        }
                        fill
                        alt=""
                        objectFit={`${
                            userData?.background ? "cover" : "contain"
                        }`}
                    />
                    {userData?.background ? (
                        <span
                            onClick={handleDelete}
                            className={`${styles.closeBtn} delete`}
                        >
                            <IoClose />
                        </span>
                    ) : (
                        ""
                    )}
                </div>

                <div className={styles.inputGroup}>
                    <label
                        className={`${styles.chosefile} btn`}
                        htmlFor="fileUpload2"
                    >
                        انتخاب فایل
                    </label>
                    <input
                        id="fileUpload2"
                        className={styles.uploadBtn}
                        type="file"
                        onChange={(e) => setFile(e.target.files[0])}
                    />
                    <span className={styles.fileName}>{file?.name}</span>
                </div>
            </Loading>
        </div>
    );
}

export default Background;
