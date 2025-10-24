import Cart from "@/models/Cart";
import Discount from "@/models/Discount";
import Order from "@/models/Order";
import bcrypt from "bcrypt";
import mongoose from "mongoose";

export const hashPassword = async (password) => {
    const hash = await bcrypt.hash(password, 10);
    return hash;
};

export const unHashPassword = async (password, hashPassword) => {
    const unHash = await bcrypt.compareSync(password, hashPassword);
    return unHash;
};

export const checkAccess = (access, userAccess) => {
    const hasPermission = access.some(
        (permission) => userAccess.includes(permission)
        // {
        //     if (userAccess === permission) {
        //         return true;
        //     }
        // }
    );
    return hasPermission;
};

export const getTotalPrice = (items) => {
    if (!items) return 0;
    return items.reduce((total, item) => {
        return total + item.price * item.count;
    }, 0);
};


export const supportDelivery = (service, restaurantServices) => {
    return restaurantServices.includes(service);
};

export const getCartByUser = async (userId) => {
    try {
        const cart = await Cart.aggregate([
            {
                $match: { userId: new mongoose.Types.ObjectId(userId) },
            },
            {
                $lookup: {
                    from: "restaurants",
                    localField: "restaurantId",
                    foreignField: "_id",
                    as: "restaurant",
                },
            },
        ]);

        const finallCart = cart[0];

        if (finallCart) {
            finallCart["totalPrice"] = getTotalPrice(finallCart.items);
            finallCart["finallPrice"] = finallCart["totalPrice"];

            let order = await Order.findOne({ userId, status:"pending" });

            if (order && order.discount) {
                const checkDurationCode = await Discount.findOne({
                    _id: JSON.parse(order.discount)._id,
                });
                if (checkDurationCode) {
                    const validation = checkDiscountCode(checkDurationCode);
                    if (!validation) {
                        const discount = getDiscountPrice(
                            JSON.parse(order.discount),
                            finallCart["totalPrice"]
                        );
                        finallCart["discount"] = discount;
                        finallCart["finallPrice"] =
                            finallCart["totalPrice"] - discount.difference;
                    }
                }
            }

            if (order && order.deliveryType === "delivery") {
                finallCart["finallPrice"] = finallCart["finallPrice"] + 20000;
                finallCart["deliveryFee"] = 20000;
            }
        }

        return finallCart;
    } catch (error) {
        return false;
    }
};

export const checkDiscountCode = (discount) => {
    if (!discount.active) return "کد تخفیف فعال نیست";

    if (discount.usageLimit === discount.usageCount)
        return "محدودیت استفاده از کد تخفیف به اتمام رسیده";

    if (new Date(discount.expire).getTime() <= Date.now())
        return "مهلت استفاده از این کد تخفیف به پایان رسیده";

    return false;
};

export const getDiscountPrice = (discount, totalPrice) => {
    let data = {
        type: "",
        value: "",
        finalPrice: 0,
    };

    data.type = discount.discountType;
    data.value = discount.value;

    if (discount.discountType === "percentage") {
        data.finalPrice = Math.ceil(
            totalPrice - (totalPrice * discount.value) / 100
        );
        data.difference = totalPrice - data.finalPrice;
    } else {
        data.finalPrice = totalPrice - discount.value;
        data.difference = totalPrice - data.finalPrice;
    }

    return data;
};
