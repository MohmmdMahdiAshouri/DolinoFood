"use client";
import { useEffect, useRef, useState } from "react";
import styles from "./Upload.module.css";
import Image from "next/image";
import { uploadFile } from "@/utils/ClientFunctions";
import Notification from "@/components/Global/Notification/Notification";
import Loading from "../../Global/Loading/Loading";
import { IoClose } from "react-icons/io5";

export const Upload = ({ details, setDetails }) => {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const notifRef = useRef();

    const upload = async () => {
        setLoading(true);
        const result = await uploadFile(file);
        console.log(result);

        if (result.success) {
            setDetails({ ...details, image: result.newFileName });
            notifRef?.current.openSuccess("آپلود شد");
        } else {
            notifRef?.current.openError(res.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        if (file) {
            upload();
        }
    }, [file]);

    return (
        <>
            <Notification ref={notifRef} />
            <Loading loading={loading}>
                <div className={styles.image}>
                    <Image
                        alt=""
                        fill
                        objectFit={details.image ? "cover" : "contain"}
                        src={
                            details.image
                                ? `${process.env.NEXT_PUBLIC_LIARA_IMAGE_URL}${details.image}`
                                : "/Images/no.png"
                        }
                    />
                    {details.image ? (
                        <span
                            onClick={() => {
                                setFile(null);
                                setDetails({ ...details, image: "" });
                            }}
                            className={styles.delete}
                        >
                            <IoClose />
                        </span>
                    ) : null}
                </div>
                <label className={`${styles.chosefile} btn`} htmlFor="image">
                    انتخاب فایل
                </label>
                <input
                    onChange={(e) => setFile(e.target.files[0])}
                    id="image"
                    className={styles.uploadBtn}
                    type="file"
                />
            </Loading>
        </>
    );
};
