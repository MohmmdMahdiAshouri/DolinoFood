"use client";
import React, { useEffect, useRef, useState } from "react";
import styles from "../FoodCategory/FoodCategory.module.css";
import Table from "@/components/Global/Table/Table";
import Modal from "@/components/Global/Modal/Modal";
import { Upload } from "@/components/Global/Upload/Upload";
import Loading from "@/components/Global/Loading/Loading";
import { fetchData } from "@/utils/ClientFunctions";
import Notification from "@/components/Global/Notification/Notification";
import Image from "next/image";

function Foods() {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const [categories, setCategories] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [data, setData] = useState({
        name: "",
        price: 0,
        catId: "",
        catName: "",
        image: "",
    });

    const notifRef = useRef();

    const changeHandler = (e) => {
        setData({ ...data, [e.target.name]: e.target.value });
    };

    const getCategory = async () => {
        setLoading(true);
        const res = await fetchData("/api/restaurant/getCategories", "GET");
        if (res.success) {
            setCategories(res.data);
            if (res.data.length > 0) {
                setData((prev) => ({
                    ...prev,
                    catId: res.data[0]._id,
                    catName: res.data[0].name,
                }));
            }
        } else {
            notifRef.current.openError(res.message);
        }
        setLoading(false);
    };

    useEffect(() => {
        getCategory();
    }, []);

    const setCatIdCatName = (e) => {
        const selectedCategory = categories.find(
            (item) => item._id === e.target.value
        );
        setData({
            ...data,
            catId: selectedCategory._id,
            catName: selectedCategory.name,
        });
    };

    const foodsAddorUpdate = async () => {
        setLoading(true);
        const res = await fetchData("/api/restaurant/addFood", "POST", data);
        if (res.success) {
            notifRef.current.openSuccess(res.message);
            setData({
                name: "",
                price: 0,
                catId: "",
                catName: "",
                image: "",
            });
            setRefresh(!refresh);
        } else {
            notifRef.current.openError(res.message);
        }
        setLoading(false);
    };

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
                    style={{ borderRadius: "10px", marginBottom: "-15px" }}
                />
            ),
        },

        {
            title: "نام غذا",
            width: "10%",
            render: (item, index) => <span key={index}>{item.name}</span>,
        },

        {
            title: "قیمت (تومان)",
            width: "10%",
            render: (item, index) => (
                <span key={index}>{item.price.toLocaleString()}</span>
            ),
        },

        {
            title: "نام دسته بندی",
            width: "10%",
            render: (item, index) => <span key={index}>{item.catName}</span>,
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

    const deleteItem = async (item) => {
        setLoading(true);
        const del = await fetchData("/api/restaurant/deleteFoods", "DELETE", {
            _id: item._id,
        });
        if (del.success) {
            notifRef.current.openSuccess(del.message);
            setRefresh(!refresh);
        } else {
            notifRef.current.openError(del.message);
        }
        setLoading(false);
    };

    const editItem = (item) => {
        setOpen(true);
        setData(item);
    };

    return (
        <>
            <Notification ref={notifRef} />
            <div className="header">
                <button onClick={() => setOpen(true)} className="btn">
                    افزودن
                </button>
            </div>
            <Table
                columns={columns}
                api="/api/restaurant/getFoods"
                refresh={refresh}
            />

            <Loading loading={loading}>
                <Modal
                    open={open}
                    setOpenModal={(data) => {
                        setOpen(false);
                        setData({
                            name: "",
                            price: 0,
                            catId: "",
                            catName: "",
                            image: "",
                        });
                    }}
                    title={"ویرایش"}
                    action={foodsAddorUpdate}
                >
                    <div className={styles.items}>
                        <div className={styles.item}>
                            <label>نام غذا</label>
                            <input
                                name="name"
                                value={data.name}
                                onChange={changeHandler}
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.item}>
                            <label>قیمت</label>
                            <input
                                name="price"
                                value={data.price}
                                onChange={changeHandler}
                                type="number"
                                className={styles.input}
                            />
                        </div>

                        <div className={styles.item}>
                            <label>انتخاب دسته بندی</label>
                            <select
                                onChange={setCatIdCatName}
                                value={data.catId}
                                name="categories"
                            >
                                {categories.map((item) => (
                                    <option value={item._id} key={item._id}>
                                        {item.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className={styles.item}>
                            <label>عکس</label>
                            <Upload details={data} setDetails={setData} />
                        </div>
                    </div>
                </Modal>
            </Loading>
        </>
    );
}

export default Foods;
