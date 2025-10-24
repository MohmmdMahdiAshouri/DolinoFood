"use client";
import { useContext, useState } from "react";
import Modal from "../Global/Modal/Modal";
import styles from "./SetAddress.module.css";
import { SlLocationPin } from "react-icons/sl";
import AddressList from "./AddressList";
import AddAddress from "./AddAddress";
import { OrderContext } from "@/context/OrderContext";
import Loading from "../Global/Loading/Loading";
import { AddressContext } from "@/context/AddressContext";

function SetAddress() {
    const { order } = useContext(OrderContext);
    const {
        addAddressModal,
        setAddAddressModal,
        closeModal,
        addAddress,
        loading,
    } = useContext(AddressContext);
    const [openModal, setOpenModal] = useState(false);

    const openAddAddresModal = () => {
        setAddAddressModal({
            open: true,
            data: null,
        });
        setOpenModal(true);
    };

    return (
        <>
            {order?.deliveryType === "delivery" && (
                <div className="checkoutBox">
                    <div className="checkoutTitle">
                        <span>
                            <SlLocationPin />
                        </span>
                        <span>انتخاب آدرس</span>
                    </div>

                    <div className="checkoutContent">
                        <div className={styles.show}>
                            {order?.address && order?.address[0] ? (
                                <p>
                                    {order?.address[0]?.state},{" "}
                                    {order?.address[0]?.city},{" "}
                                    {order?.address[0]?.details}
                                </p>
                            ) : (
                                <p>
                                    هنوز آدرسی انتخاب نشده
                                </p>
                            )}

                            <button
                                className="btn"
                                onClick={() => setOpenModal(true)}
                            >
                                انتخاب
                            </button>
                        </div>
                    </div>

                    <Loading loading={loading}>
                        <Modal
                            title="انتخاب آدرس"
                            btnText="افزودن آدرس"
                            open={openModal}
                            setOpenModal={setOpenModal}
                            action={openAddAddresModal}
                        >
                            <AddressList />
                        </Modal>

                        <Modal
                            title="افزودن آدرس"
                            open={addAddressModal?.open}
                            setOpenModal={closeModal}
                            action={addAddress}
                        >
                            <AddAddress />
                        </Modal>
                    </Loading>
                </div>
            )}
        </>
    );
}

export default SetAddress;
