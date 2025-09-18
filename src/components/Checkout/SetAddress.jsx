"use client";
import { useState } from "react";
import Modal from "../Global/Modal/Modal";
import styles from "./SetAddress.module.css";
import { SlLocationPin } from "react-icons/sl";
import AddressList from "./AddressList";
import AddAddress from "./AddAddress";

function SetAddress() {
    const [openModal, setOpenModal] = useState(false);
    const [addAddressModal, setAddAddressModal] = useState({
        open: false,
        data: null,
    });

    const openAddAddresModal = () => {
        setAddAddressModal({
            open: true,
            data: null,
        });
    };

    const saveData = () => {
        alert("saved");
    };

    return (
        <div className="checkoutBox">
            <div className="checkoutTitle">
                <span>
                    <SlLocationPin />
                </span>
                <span>انتخاب آدرس</span>
            </div>

            <div className="checkoutContent">
                <div className={styles.show}>
                    <p>آدرسی انتخاب نشده</p>
                    <button className="btn" onClick={() => setOpenModal(true)}>
                        انتخاب
                    </button>
                </div>
            </div>

            <Modal
                title="انتخاب آدرس"
                open={openModal}
                setOpenModal={setOpenModal}
                btnText="افزودن آدرس"
                action={openAddAddresModal}
            >
                <AddressList />
            </Modal>

            <Modal
                title="افزودن آدرس"
                open={addAddressModal.open}
                setOpenModal={setAddAddressModal}
                action  ={saveData}
            >
                <AddAddress />
            </Modal>
        </div>
    );
}

export default SetAddress;
