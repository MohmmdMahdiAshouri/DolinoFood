import styles from "./Modal.module.css";
import { IoCloseSharp } from "react-icons/io5";

function Modal({ title, children, open, setOpenModal, action, btnText }) {
    return (
        <>
            {open && (
                <div className={styles.modal}>
                    <div className={styles.content}>
                        <header className={styles.header}>
                            <h3>{title}</h3>
                            <button onClick={() => setOpenModal(false)}>
                                <IoCloseSharp />
                            </button>
                        </header>

                        <div className={styles.center}>{children}</div>

                        <div className={styles.footer}>
                            <button
                                className="btn"
                                onClick={() => {
                                    setOpenModal(false);
                                    if(action) action()
                                }}
                            >
                                {btnText ? btnText : "ذخیره"}
                            </button>
                            <button
                                className="btnOutline"
                                onClick={() => setOpenModal(false)}
                            >
                                انصراف
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}

export default Modal;
