"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./Cart.module.css";
import ItemCart from "./ItemCart";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import Loading from "../Loading/Loading";

function Cart({data}) {
    const { cart, loading } = useContext(CartContext);
    const details = cart?.restaurant[0];
    return (
        <>
            <Loading loading={loading}>
                <div>
                    <div className={styles.head}>
                        <div className={styles.logo}>
                            <Image
                                src={
                                    cart
                                        ? `${process.env.NEXT_PUBLIC_LIARA_IMAGE_URL}${details.logo}`
                                        : "/Images/no.png"
                                }
                                objectFit="contain"
                                fill
                                alt="logo"
                            />
                        </div>
                        <div className={styles.text}>
                            <h5>{details?.restaurantType}</h5>
                            <span className={styles.menu}>مشاهده منو</span>
                        </div>
                    </div>

                    <div className={styles.items}>
                        <ItemCart data={data}/>
                    </div>

                    <div className={styles.priceItems}>
                        <div className={styles.priceItem}>
                            <span>تخفیف</span>
                            <span>25 درصد</span>
                        </div>

                        <div className={styles.priceItem}>
                            <span>هزینه ارسال</span>
                            <span>258000 تومان</span>
                        </div>

                        <div className={styles.priceItem}>
                            <span>هزینه کل</span>
                            <span>258000 تومان</span>
                        </div>

                        <div className={styles.priceItem}>
                            <span>مبلغ قابل پرداخت</span>
                            <span>258000 تومان</span>
                        </div>
                    </div>

                    <Link href={"/checkout"} className={styles.btn}>
                        نهایی کردن سفارش
                    </Link>
                </div>
                <p className={styles.empty}>سبد خرید خالی میباشد</p>
            </Loading>
        </>
    );
}

export default Cart;
