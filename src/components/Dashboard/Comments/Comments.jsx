"use client"
import Modal from "@/components/Global/Modal/Modal";
import Table from "@/components/Global/Table/Table";
import { Status, STATUSES } from "@/utils/ClientFunctions";
import React, { useState } from "react";
import styles from "./Comments.module.css"

function Comments() {
    const [open, setOpen] = useState(false)
    const [details,setDetails] = useState({
        comment:"",
        rate:5,
        merchantId:"",
        orderId:""
    });
    const columns = [
        {
            title: "#",
            width: "0.5%",
            render: (item, index) => <span>{index + 1}</span>,
        },

        {
            title: "نام",
            width: "5%",
            render: (item, index) => (
                <span style={{fontSize : "14px"}} key={index}>{item.user[0].first_name} {item.user[0].last_name}</span>
            ),
        },
        {
            title: "رستوران",
            width: "4%",
            render: (item, index) => <span>{item?.restaurant[0].restaurantType}</span>,
        },
        {
            title: "متن نظر",
            width: "12%",
            render: (item, index) => <span>{item.comment}</span>,
        },
        {
            title: "وضعیت",
            width: "3%",
            render: (item, index) => (
                <span className={`status ${item.status}`}>
                    {Status(item.status)}
                </span>
            ),
        },
        {
            title: "عملیات",
            width: "3%",
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
    return (
        <div>
            <Table
                columns={columns}
                api={"/api/comment/get"}
            />

            <Modal
                open={open}
                setOpen={setOpen}
                title={"ویرایش"}
                // save={editComment}
            >
                <div className={styles.items}>
                    <div className={styles.item}>
                        <label>نظر</label>
                        <textarea
                            value={details.comment}
                            onChange={(e) =>
                                setDetails({
                                    ...details,
                                    comment: e.target.value,
                                })
                            }
                        ></textarea>
                    </div>

                    <div className={styles.item}>
                        <label>وضعیت</label>
                        <select
                            value={details.status}
                            onChange={(e) =>
                                setDetails({
                                    ...details,
                                    status: e.target.value,
                                })
                            }
                        >
                            {STATUSES.map((item, index) => (
                                <option key={index} value={item.value}>
                                    {item.title}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </Modal>
        </div>
    );
}

export default Comments;
