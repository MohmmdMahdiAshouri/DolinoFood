import Cart from "@/models/Cart";
import Order from "@/models/Order";
const { default: axios } = require("axios");
const TESTMERCHANTID = "173d75b1-1774-48af-9c41-c353ddc93354";

export const ZarinpalCreate = async (cart, order, mobile) => {

    let result = {
        code: null,
        success: false,
        message: "",
        data: "",
    };

    try {
        const postData = {
            merchant_id: process.env.ZARINPAL_TEST
                ? TESTMERCHANTID
                : process.env.ZARINPAL_MERCHANT_ID,
            amount: parseInt(cart["finallPrice"]) * 10,
            description: order.description
                ? order.description
                : "از غذای خود لذت ببرید",
            metadata: {
                mobile,
            },
            callback_url: `${process.env.BASE_URL}/result`,
            order_id: order.orderId,
        };

        const api = `https://${
            process.env.ZARINPAL_TEST ? "sandbox" : "payment"
        }.zarinpal.com/pg/v4/payment/request.json`;

        const res = await axios.post(api, postData);

        console.log(res);

        if (res.data.data.code === 100) {
            await Order.updateOne(
                { _id: order._id },
                {
                    $set: {
                        transId: res.data.data.authority,
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

            result.message = res.data.data.message;
            result.code = res.data.data.code;
            result.success = true;
            result.data = `https://${
                process.env.ZARINPAL_TEST ? "sandbox" : "payment"
            }.zarinpal.com/pg/StartPay/${res.data.data.authority}`;
        } else {
            result.message = error.message;
            result.success = false;
            result.code = res.data.data.code;
        }
    } catch (error) {
        result.message = error.message;
        result.success = false;
    }

    return result;
};

export const verifyZarinpal = async (order, authority) => {
    let result = {
        code: null,
        success: false,
        message: "",
        data: "",
    };

    try {
        const postData = {
            merchant_id: process.env.ZARINPAL_TEST
                ? TESTMERCHANTID
                : process.env.ZARINPAL_MERCHANT_ID,
            amount: order.finalPrice,
            authority,
        };

        const api = `https://${
            process.env.ZARINPAL_TEST ? "sandbox" : "payment"
        }.zarinpal.com/pg/v4/payment/verify.json`;

        const res = await axios.post(api, postData);
        if (res.data.data.code === 100) {
            await Order.updateOne(
                { _id: order._id },
                {
                    $set: {
                        status: "paid",
                    },
                }
            );
            await Cart.deleteOne({ userId: order.userId });
            result["data"] = order.orderId;
            result["success"] = true;
            result["code"] = 100;
        } else if (res.data.data.code === 101) {
            const userOrder = await Order.findOne({ userId: order.userId });
            await Cart.deleteOne({ userId: order.userId });
            result["data"] = userOrder.orderId;
            result["success"] = true;
            result["code"] = 101;
        } else {
            result.message = res.data.data.message;
            result.success = false;
            result.code = 400;
        }
    } catch (error) {
        result.message = error.message;
        result.success = false;
        result.code = 400;
    }
    return result;
};
