"use client";
import styles from "./Discount.module.css";
import Loading from "@/components/Global/Loading/Loading";
import Modal from "@/components/Global/Modal/Modal";
import Notification from "@/components/Global/Notification/Notification";
import Table from "@/components/Global/Table/Table";
import { fetchData } from "@/utils/ClientFunctions";
import { useRef, useState } from "react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker from "react-multi-date-picker";
import TimePicker from "react-multi-date-picker/plugins/time_picker";

function Discount() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [refresh, setRefresh] = useState(false);
    const [data, setData] = useState({
        code: "",
        value: 0,
        active: true,
        start: Date.now(),
        expire: Date.now(),
        usageLimit: 1,
        minOrder: 0,
        discountType: "percentage",
    });

    const notifRef = useRef();

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const addDiscount = async () => {
        setLoading(true);
        const res = await fetchData("/api/discount/add", "POST", data);
        if (res.success) {
            notifRef.current.openSuccess(res.message);
            setData({
                code: "",
                value: 0,
                active: true,
                start: Date.now(),
                expire: Date.now(),
                usageLimit: 1,
                minOrder: 0,
                discountType: "percentage",
            });
            setRefresh(!refresh);
        } else {
            notifRef.current.openError(res.message);
        }
        setLoading(false);
    };

    const deleteItem = async (item) => {
        setLoading(true);
        const res = await fetchData("/api/discount/delete", "DELETE", item);
        if (res.success) {
            notifRef.current.openSuccess(res.message);
            setRefresh(!refresh);
        } else {
            notifRef.current.openSuccess(res.message);
        }
        setLoading(false);
    };

    const editItem = (item) => {
        setOpen(true);
        setData(item);
    };

    const columns = [
        {
            title: "#",
            width: "2%",
            render: (item, index) => <span>{index + 1}</span>,
        },

        {
            title: "کد",
            width: "5%",
            render: (item, index) => <span>{item.code}</span>,
        },

        {
            title: "مقدار",
            width: "5%",
            render: (item, index) => <span>{item.value}</span>,
        },

        {
            title: "وضعیت",
            width: "5%",
            render: (item, index) => (
                <span>{item.active ? "فعال" : "غیرفعال"}</span>
            ),
        },

        {
            title: "حداقل سفارش",
            width: "5%",
            render: (item, index) => <span>{item.minOrder}</span>,
        },

        {
            title: "نوع تخفیف",
            width: "5%",
            render: (item, index) => (
                <span>{item.discountType === "cash" ? "نقدی" : "درصدی"}</span>
            ),
        },

        {
            title: "تعداد دفعات قابل استفاده",
            width: "10%",
            render: (item, index) => <span>{item.usageLimit}</span>,
        },

        {
            title: "زمان شروع و پایان",
            width: "5%",
            render: (item, index) => (
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "5px",
                    }}
                >
                    <DatePicker
                        format="HH:mm:ss , YYYY/MM/DD"
                        calendar={persian}
                        locale={persian_fa}
                        value={item.start}
                        disabled
                    />
                    <DatePicker
                        format="HH:mm:ss , YYYY/MM/DD"
                        calendar={persian}
                        locale={persian_fa}
                        value={item.expire}
                        disabled
                    />
                </div>
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

    return (
        <>
            <Notification ref={notifRef} />
            <Loading loading={loading}>
                <div>
                    <div className="header">
                        <button onClick={() => setOpen(true)} className="btn">
                            افزودن
                        </button>
                    </div>
                    <Table
                        api={"/api/discount/get"}
                        columns={columns}
                        refresh={refresh}
                    />

                    <Modal
                        open={open}
                        setOpenModal={() => {
                            setData({
                                code: "",
                                value: 0,
                                active: true,
                                start: Date.now(),
                                expire: Date.now(),
                                usageLimit: 1,
                                minOrder: 0,
                                discountType: "percentage",
                            });
                            setOpen(false);
                        }}
                        title={"ویرایش"}
                        action={addDiscount}
                    >
                        <div className={styles.items}>
                            <div className={styles.item}>
                                <label>کد : </label>
                                <input
                                    onChange={changeHandler}
                                    value={data.code}
                                    type="text"
                                    name="code"
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.item}>
                                <label>مقدار : </label>
                                <input
                                    onChange={changeHandler}
                                    value={data.value}
                                    name="value"
                                    type="number"
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.item}>
                                <label>حداقل سفارش : </label>
                                <input
                                    onChange={changeHandler}
                                    value={data.minOrder}
                                    name="minOrder"
                                    type="number"
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.item}>
                                <label>فعال : </label>
                                <input
                                    onChange={() =>
                                        setData({
                                            ...data,
                                            active: !data.active,
                                        })
                                    }
                                    checked={data.active}
                                    name="active"
                                    type="checkbox"
                                    className={styles.input}
                                />
                            </div>

                            <div className={styles.item}>
                                <label>نوع : </label>
                                <select
                                    onChange={changeHandler}
                                    value={data.discountType}
                                    name="discountType"
                                >
                                    <option value={"percentage"}>درصدی</option>
                                    <option value={"cash"}>نقدی</option>
                                </select>
                            </div>

                            <div className={styles.item}>
                                <label>تاریخ شروع : </label>
                                <DatePicker
                                    format="HH:mm:ss , YYYY/MM/DD"
                                    plugins={[
                                        <TimePicker
                                            key={3}
                                            position="button"
                                        />,
                                    ]}
                                    calendar={persian}
                                    locale={persian_fa}
                                    calendarPosition="bottom-right"
                                    value={data.start}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            start: e.unix * 1000,
                                        })
                                    }
                                />
                            </div>

                            <div className={styles.item}>
                                <label>تاریخ پایان : </label>
                                <DatePicker
                                    format="HH:mm:ss , YYYY/MM/DD"
                                    plugins={[
                                        <TimePicker
                                            key={3}
                                            position="button"
                                        />,
                                    ]}
                                    calendar={persian}
                                    locale={persian_fa}
                                    calendarPosition="bottom-right"
                                    value={data.expire}
                                    onChange={(e) =>
                                        setData({
                                            ...data,
                                            expire: e.unix * 1000,
                                        })
                                    }
                                />
                            </div>

                            <div className={styles.item}>
                                <label>تعداد دفعات قابل استفاده : </label>
                                <input
                                    onChange={changeHandler}
                                    value={data.usageLimit}
                                    name="usageLimit"
                                    type="number"
                                    className={styles.input}
                                />
                            </div>
                        </div>
                    </Modal>
                </div>
            </Loading>
        </>
    );
}

export default Discount;
