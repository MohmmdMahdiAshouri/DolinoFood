"use client";
import Modal from "@/components/Global/Modal/Modal";
import Table from "@/components/Global/Table/Table";
import { fetchData, Status, STATUSES } from "@/utils/ClientFunctions";
import styles from "./Orders.module.css";
import { useRef, useState } from "react";
import Loading from "@/components/Global/Loading/Loading";
import Notification from "@/components/Global/Notification/Notification";
import { useRouter } from "next/navigation";
import { Rate } from "antd";

function Orders() {
    const [open, setOpen] = useState(false);
    const [details, setDetails] = useState({
        comment: "",
        rate: 3,
        merchantId: "",
        orderId: "",
    });

    const [loading, setLoading] = useState(false);

    const notifRef = useRef();

    const { push } = useRouter();

    const columns = [
        {
            title: "#",
            width: "2%",
            render: (item, index) => <span>{index + 1}</span>,
        },
        {
            title: "رستوران",
            width: "10%",
            render: (item, index) => (
                <span key={index}>{item.restaurant[0].restaurantType}</span>
            ),
        },
        {
            title: "مبلغ (تومان)",
            width: "5%",
            render: (item, index) => (
                <span>{(item.finalPrice / 10).toLocaleString()}</span>
            ),
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
                    <button onClick={() => viewOrder(item)} className="btn">
                        مشاهده
                    </button>
                    <button onClick={() => editItem(item)} className="btn">
                        ثبت نظر
                    </button>
                </div>
            ),
        },
    ];

    const editItem = (item) => {
        setOpen(true);
        setDetails({
            comment : "",
            rate: 3,
            restaurantId: item.restaurantId,
            orderId: item._id,
        });
    };

    const handleEdit = async () => {
        setLoading(true);
        const res = await fetchData("/api/comment/add", "POST", details);
        if (res.success) {
            notifRef.current.openSuccess(res.message);
            setDetails({
                comment: "",
                rate: 3,
                merchantId: "",
                orderId: "",
            });
        } else {
            notifRef.current.openError(res.message);
        }
        setLoading(false);
    };

    const viewOrder = (item) => {
        push(`/tracking/${item.orderId}`);
    };

    return (
        <>
            <Notification ref={notifRef} />
            <Loading loading={loading}>
                <Table columns={columns} api={"/api/order/getUserOrders"} />

                <Modal
                    open={open}
                    setOpenModal={setOpen}
                    title={"ویرایش"}
                    action={handleEdit}
                >
                    <div className={styles.items}>
                        <div className={styles.item}>
                            <label>امتیاز : </label>
                            <Rate
                                allowHalf
                                style={{ fontSize: "23px", color: "#ef4123" }}
                                defaultValue={details.rate}
                                onChange={(e) =>
                                    setDetails({ ...details, rate: e })
                                }
                            />
                        </div>

                        <div className={styles.item}>
                            <label>متن نظر : </label>
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
                    </div>
                </Modal>
            </Loading>
        </>
    );
}

export default Orders;
