"use client"
import styles from "./Restaurant.module.css"
import Table from "@/components/Global/Table/Table";
import Image from "next/image";
import { fetchData, Status, STATUSES } from "@/utils/ClientFunctions";
import Modal from "@/components/Global/Modal/Modal";
import { useRef, useState } from "react";
import Loading from "@/components/Global/Loading/Loading";
import Notification from "@/components/Global/Notification/Notification";

function Restaurant() {
    const [open, setOpen] = useState(false)
    const [loading, setLoading] = useState(false)
    const [refresh, setRefresh] = useState(false)
    const [data, setData] = useState({
        restaurantType : "",
        status : ""
    })

    const notifRef = useRef()

    const columns = [
        {
            title: "#",
            width: "2%",
            render: (item, index) => <span>{index + 1}</span>,
        },

        {
            title: "لوگو",
            width: "5%",
            render: (item, index) => (
                <Image
                    src={`${process.env.NEXT_PUBLIC_LIARA_IMAGE_URL}${item.logo}`}
                    alt="logo"
                    width={45}
                    height={45}
                    style={{borderRadius : "10px" , marginBottom : "-15px"}}
                />
            ),
        },

        {
            title: "رستوران",
            width: "10%",
            render: (item, index) => <span key={index}>{item.restaurantType}</span>,
        },

        {
            title: "شعبه",
            width: "5%",
            render: (item, index) => <span>{item.branch}</span>,
        },

        {
            title: "وضعیت",
            width: "5%",
            render: (item, index) => (
                <span className={`status ${item.status}`}>
                    {Status(item.status)}
                </span>
            ),
        },

        {
            title: "عملیات",
            width: "10%",
            render: (item, index) => (
                <div className="tableBtns">
                    <button onClick={() => deleteItem(item)} className="btn">
                        حذف
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
        setData(item)
    }

    const saveEdit = async () => {
        setLoading(true)
        const res = await fetchData("/api/admin/update" , "POST" , data)
        if(res.success){
            notifRef.current.openSuccess(res.message)
            setData({
                restaurantType : "",
                status : ""
            })
            setRefresh(!refresh)
        }else(
            notifRef.current.openError(res.message)
        )
        setLoading(false)
    }

    return (
        <>
            <Notification ref={notifRef} />
            <Table refresh={refresh} columns={columns} api="/api/admin/getRestaurants"/>
            <Loading loading={loading}>
                <Modal title="اطلاعات رستوران" open={open} setOpenModal={setOpen} action={saveEdit}>
                    <div className={styles.items}>
                            <div className={styles.item}>
                                <label>نام رستوران</label>
                                <input
                                    value={data.restaurantType}
                                    onChange={e => setData({...data , restaurantType : e.target.value})}
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.item}>
                                <label>وضعیت</label>
                                <select
                                    value={data.status}
                                    onChange={e => setData({...data , status : e.target.value})}
                                >
                                    {STATUSES.map((item , index) => (
                                        <option key={index} value={item.value}>{item.title}</option>
                                    ))}
                                </select>
                            </div>
                        </div>
                </Modal>
            </Loading>
        </>
    );
}

export default Restaurant;
