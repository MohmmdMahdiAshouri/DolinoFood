import Cart from "@/models/Cart";
import Order from "@/models/Order";

export const cashPayment = async (order, cart) => {
    let result = {
        code: null,
        success: false,
        message: "",
        data: "",
    };

    try {
        await Order.updateOne(
            { _id: order._id },
            {
                $set: {
                    status: "waiting",
                    discountDifference: cart.discount
                        ? cart.discount.difference
                        : 0,
                    deliveryPrice:
                        order.deliveryType === "delivery"
                            ? cart.deliveryFee
                            : 0,
                    finalPrice: parseInt(cart["finallPrice"]) * 10,
                },
            }
        );

        await Cart.deleteOne({userId : order.userId})

        result.message = "سفارش با موفقیت ایجاد شد";
        result.code = 200;
        result.success = true;
        result.data = `/tracking/${order.orderId}`;

    } catch (error) {
        result.message = error.message;
        result.success = false;
        result.code = 400;
    }
    return result;
};
