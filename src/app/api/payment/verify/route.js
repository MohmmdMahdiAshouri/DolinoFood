import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { checkAccess, getCartByUser } from "@/utils/ServerFunctions";
import Order from "@/models/Order";
import { verifyZarinpal, ZarinpalCreate } from "@/payment/Zarinpal";

export async function POST(req) {
    try {
        //get init user's data such as Id - step1
        const session = await getServerSession(authOptions);
        if (!session) throw new Error("لطفا وارد شوید");

        //check access - step2
        const isAccess = checkAccess(["USER"], session.user.roles);
        if (!isAccess) throw new Error("فقط کاربران میتوانند سفارش دهند");

        //get data - step3
        const { status, authority } = await req.json();

        //connect database - step4
        await connectDB();

        //get order - stpe5
        const order = await Order.findOne({
            userId: session.user.id,
            transId: authority,
        });
        if (!order) throw new Error("تراکنش نامعتبر");

        let finallResult;
        if (order.terminal === "zarin") {
            finallResult = await verifyZarinpal(order, authority);
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
