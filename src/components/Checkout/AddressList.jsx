import { MdOutlineDelete } from "react-icons/md";
import styles from "./AddressList.module.css";
import { useContext } from "react";
import { AddressContext } from "@/context/AddressContext";
import Loading from "../Global/Loading/Loading";

function AddressList() {
    const { addresses, editAddresses, deleteAddress, loading, chooseAddress} = useContext(AddressContext)
    return (
        <Loading loading={loading}>
            <div className={styles.items}>
                {
                    addresses?.map((address,index) => (
                        <div key={index} className={styles.item}>
                            <div className={styles.right}>
                                <button onClick={() => deleteAddress(address)}>
                                    <MdOutlineDelete />
                                </button>
                                <p>{address.state} - {address.city} - {address.details}</p>
                            </div>

                            <div className={styles.left}>
                                <button onClick={() => editAddresses(address)} className="btn">ویرایش</button>
                                <button onClick={() => chooseAddress(address)} className="btn">انتخاب</button>
                            </div>
                        </div>
                    ))
                }
            </div>
        </Loading>
    );
}

export default AddressList;
