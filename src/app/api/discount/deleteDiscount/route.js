import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import {
    checkAccess,
} from "@/utils/ServerFunctions";
import Order from "@/models/Order";

export async function POST(req) {
    try {
        //get init user's data such as Id - step1
        const session = await getServerSession(authOptions);
        if (!session) throw new Error("لطفا وارد شوید");

        //check access - step2
        const isAccess = checkAccess(["USER"], session.user.roles);
        if (!isAccess) throw new Error("شما دسترسی ندارید");

        //connect database - step3
        await connectDB();

        //get datas - step4
        // const data = await req.json();

        //update order - step5
        await Order.updateOne(
            { userId: session.user.id, status:"pending" },
            {
                $set: {
                    discount: "",
                },
            }
        );

        return NextResponse.json(
            {
                success: true,
                message: "کد تخفیف حذف شد",
            },
            { status: 200 }
        );
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
