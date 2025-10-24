"use client";
import Image from "next/image";
import Link from "next/link";
import styles from "./Cart.module.css";
import ItemCart from "./ItemCart";
import { useContext } from "react";
import { CartContext } from "@/context/CartContext";
import Loading from "../Loading/Loading";
import { useRouter } from "next/navigation";
import { OrderContext } from "@/context/OrderContext";

function Cart({ data }) {
    const { cart, loading } = useContext(CartContext);
    const details = cart?.restaurant[0];
    const router = useRouter();

    console.log(cart);

    const pushToMenu = () => {
        if (cart) {
            router.push(`/store/${cart.restaurantId}`);
        } else {
            router.push("/browse");
        }
    };

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
                            <span onClick={pushToMenu} className={styles.menu}>
                                مشاهده {cart ? `منو` : "رستوران ها"}
                            </span>
                        </div>
                    </div>

                    <div className={styles.items}>
                        <ItemCart data={data} />
                    </div>

                    <div className={styles.priceItems}>
                        {cart?.totalPrice && (
                            <div className={styles.priceItem}>
                                <span>هزینه کل</span>
                                <span>
                                    {cart?.totalPrice.toLocaleString()} تومان
                                </span>
                            </div>
                        )}

                        {cart?.deliveryFee && (
                            <div className={styles.priceItem}>
                                <span>هزینه ارسال</span>
                                <span>
                                    {cart?.deliveryFee.toLocaleString()} تومان
                                </span>
                            </div>
                        )}

                        {
                            cart?.discount?.difference && (
                                <div className={styles.priceItem}>
                                    <span>تخفیف</span>
                                    <span>{cart?.discount?.difference.toLocaleString()} تومان</span>
                                </div>
                            )
                        }

                        {cart?.finallPrice && (
                            <div className={styles.priceItem}>
                                <span>مبلغ قابل پرداخت</span>
                                <span>
                                    {cart?.finallPrice.toLocaleString()} تومان
                                </span>
                            </div>
                        )}
                    </div>

                    {cart ? (
                        <Link href={"/checkout"} className={styles.btn}>
                            نهایی کردن سفارش
                        </Link>
                    ) : (
                        <p className={styles.empty}>سبد خرید خالی میباشد</p>
                    )}
                </div>
            </Loading>
        </>
    );
}

export default Cart;
