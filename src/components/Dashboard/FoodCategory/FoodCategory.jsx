"use client"
import { useRef, useState } from "react";
import Modal from "@/components/Global/Modal/Modal";
import Table from "@/components/Global/Table/Table";
import styles from "./FoodCategory.module.css";
import { Upload } from "@/components/Global/Upload/Upload";
import Loading from "@/components/Global/Loading/Loading";
import { fetchData } from "@/utils/ClientFunctions";
import Notification from "@/components/Global/Notification/Notification";
import Image from "next/image";

function FoodCategory() {

    const [data , setData] = useState({
        name : "",
        image : ""
    })
    const [open , setOpen] = useState(false)
    const [loading , setLoading] = useState(false)
    const [refresh, setRefresh] = useState(false)

    const notifRef = useRef()

    const columns = [
        {
            title: "ردیف",
            width: "2%",
            render: (item, index) => <span>{index + 1}</span>,
        },

        {
            title: "عکس",
            width: "5%",
            render: (item, index) => (
                <Image
                    src={`${process.env.NEXT_PUBLIC_LIARA_IMAGE_URL}${item.image}`}
                    alt="logo"
                    width={50}
                    height={50}
                    objectFit="cover"
                    style={{borderRadius : "10px" , marginBottom : "-15px"}}
                />
            ),
        },

        {
            title: "نام دسته بندی",
            width: "10%",
            render: (item, index) => <span key={index}>{item.name}</span>,
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

    const foodCategoryAddOrEdit = async () => {
        setLoading(true)
        const res = await fetchData("/api/restaurant/addCategory" , "POST" , data)
        if(res.success){
            notifRef.current.openSuccess(res.message)
            setData({
                name : "",
                image : ""
            })
            setOpen(false)
            setRefresh(!refresh)
        }else{
            notifRef.current.openError(res.message)
        }
        setLoading(false)
    }

    const deleteItem = async (item) => {
        setLoading(true)
        const del = await fetchData("/api/restaurant/deleteCategory" , "DELETE" , {_id : item._id})
        if(del.success){
            notifRef.current.openSuccess(del.message)
            setRefresh(!refresh)
        }else{
            notifRef.current.openError(del.message)
        }
        setLoading(false)
    }

    const editItem = (item) => {
        setData(item)
        setOpen(true)
        setRefresh(true)
    }

    return (
        <div>
            <Notification ref={notifRef} />
            <div className="header">
                <button onClick={() => setOpen(true)} className="btn">افزودن</button>
            </div>
            <Table columns={columns} api="/api/restaurant/getCategories" refresh={refresh}/>

            <Loading loading={loading}>
                <Modal open={open} setOpenModal={setOpen} title={"ویرایش"} action={foodCategoryAddOrEdit}>
                    <div className={styles.items}>
                        <div className={styles.item}>
                            <label>نام دسته بندی</label>
                            <input
                                value={data.name}
                                onChange={(e) =>
                                    setData({ ...data, name: e.target.value })
                                }
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.item}>
                            <label>عکس</label>
                            <Upload details={data} setDetails={setData}/>
                        </div>
                    </div>
                </Modal>
            </Loading>
        </div>
    );
}

export default FoodCategory;
