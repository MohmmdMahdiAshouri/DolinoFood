"use client"
import Modal from "@/components/Global/Modal/Modal";
import Table from "@/components/Global/Table/Table";
import { fetchData, Status, STATUSES } from "@/utils/ClientFunctions";
import styles from "./AdminOrders.module.css";
import { useRef, useState } from "react";
import Loading from "@/components/Global/Loading/Loading";
import Notification from "@/components/Global/Notification/Notification";
import { useRouter } from "next/navigation";

function AdminOrders() {
    const [open, setOpen] = useState(false);
    const [details, setDetails] = useState(null)
    const [loading, setLoading] = useState(false)

    const notifRef = useRef()

    const {push} = useRouter()

    const columns = [
        {
            title: "#",
            width: "2%",
            render: (item, index) => <span>{index + 1}</span>,
        },
        {
            title: "رستوران",
            width: "7%",
            render: (item, index) => (
                <span key={index}>{item?.restaurant[0]?.restaurantType}</span>
            ),
        },
        {
            title: "سفارش دهنده",
            width: "8%",
            render: (item, index) => (
                <span style={{ fontSize: "14px" }}>
                    {item?.user[0]?.first_name} {item?.user[0]?.last_name}
                </span>
            ),
        },
        {
            title: "مبلغ (تومان)",
            width: "5%",
            render: (item, index) => (
                <span>{(item?.finalPrice / 10).toLocaleString()}</span>
            ),
        },
        {
            title: "وضعیت",
            width: "5%",
            render: (item, index) => (
                <span className={`status ${item?.status}`}>
                    {Status(item?.status)}
                </span>
            ),
        },
        {
            title: "عملیات",
            width: "10%",
            render: (item, index) => (
                <div className="tableBtns">
                    <button onClick={() => viewOrder(item)} className="btn">
                        مشاهده
                    </button>
                    <button onClick={() => editItem(item)} className="btn">
                        ویرایش
                    </button>
                </div>
            ),
        },
    ];

    const editItem = (item) => {
        setOpen(true)
        setDetails(item)
    }

    const handleEdit = async () => {
        setLoading(true)
        const res = await fetchData("/api/order/editOrder", "POST", details)
        if(res.success){
            notifRef.current.openSuccess(res.message)
        }else{
            notifRef.current.openError(res.message)
        }
        setLoading(false)
    }

    const viewOrder = (item) => {
        push(`/tracking/${item.orderId}`)
    }

    return (
        <>
            <Notification ref={notifRef} />
            <Loading loading={loading}>
                <Table columns={columns} api="/api/order/getAllOrders" />

                <Modal open={open} setOpenModal={setOpen} title={"ویرایش"} action={handleEdit}>
                    <div className={styles.items}>
                        <label>انتخاب دسته بندی</label>
                        <select 
                        value={details?.status} onChange={e => setDetails({...details, status : e.target.value})}
                        >
                            {STATUSES.map((item, index) => (
                                <option key={index} value={item.value}>
                                    {item.title}
                                </option>
                            ))}
                        </select>
                    </div>
                </Modal>
            </Loading>
        </>
    );
}

export default AdminOrders;
