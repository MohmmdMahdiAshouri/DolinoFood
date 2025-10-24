import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { checkAccess, getCartByUser } from "@/utils/ServerFunctions";
import Order from "@/models/Order";
import { ZarinpalCreate } from "@/payment/Zarinpal";
import { cashPayment } from "@/payment/Cash";

export async function GET(req) {
    try {
        //get init user's data such as Id - step1
        const session = await getServerSession(authOptions);
        if (!session) throw new Error("لطفا وارد شوید");

        //check access - step2
        const isAccess = checkAccess(["USER"], session.user.roles);
        if (!isAccess) throw new Error("فقط کاربران میتوانند سفارش دهند");

        //connect database - step3
        await connectDB();

        //get order - stpe4
        const order = await Order.findOne({
            userId: session.user.id,
            status: "pending",
        });

        //get cart - step5
        const cart = await getCartByUser(session.user.id);

        //validation - step6
        if (!order.deliveryType)
            throw new Error("لطفا روش ارسال را انتخاب کنید");

        if (order.deliveryType === "delivery" && !order.addressId)
            throw new Error("لطفا آدرس را انتخاب کنید");

        if (!order.paymentMethod)
            throw new Error("لطفا یکی از روش های پرداخت را انتخاب کنید");

        let finallResult;
        if (order.paymentMethod === "online") {
            if (!order.terminal)
                throw new Error("لطفا یکی از درگاه های پرداخت را انتخاب کنید");

            if (order.terminal === "zarin") {
                finallResult = await ZarinpalCreate(
                    cart,
                    order,
                    session.user.mobile
                );
            }

            if (order.terminal === "saman" || order.terminal === "parsian")
                throw new Error("لطفا از درگاه زرین پال استفاده کنید");

        } else if (order.paymentMethod === "cash") {
            finallResult = await cashPayment(order, cart);
        } else {
            throw new Error("لطفا از روش های دیگر استفاده کنید");
        }

        return NextResponse.json(finallResult, { status: 200 });
    } catch (error) {
        console.log(error.message);

        return NextResponse.json(
            {
                message: error.message,
                success: false,
            },
            {
                status: 500,
            }
        );
    }
}
