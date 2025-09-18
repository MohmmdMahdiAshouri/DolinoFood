import React from "react";
import { FiMinus } from "react-icons/fi";
import { HiPlus } from "react-icons/hi";
import styles from "./ChangeCart.module.css"

function ChangeCart() {
    return (
        <>
            <div className={styles.btns}>
                <button>
                    <HiPlus />
                </button>
                <span>تعداد</span>
                <button>
                    <FiMinus />
                </button>
            </div>
        </>
    );
}

export default ChangeCart;
