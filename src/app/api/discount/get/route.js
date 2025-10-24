import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import Discount from "@/models/Discount";
import { checkAccess } from "@/utils/ServerFunctions";

export async function GET(req) {
    try {
        //get init user's data such as Id - step1
        const session = await getServerSession(authOptions);
        if (!session) throw new Error("لطفا وارد شوید");

        //check access - step2
        const isAccess = checkAccess(["MERCHANT"], session.user.roles);
        if (!isAccess) throw new Error("شما دسترسی ندارید");

        //connect database - step3
        await connectDB();

        //get foods - step4
        const discount = await Discount.find({
            restaurantId: session.user.id,
        });

        return NextResponse.json(
            {
                success: true,
                // message: "ثبت نام با موفقیت انجام شد",
                data: discount,
            },
            { status: 200 }
        );
    } catch (error) {
        return NextResponse.json(
            {
                message: "درخواست با خطا مواجه شد",
                success: false,
            },
            {
                status: 500,
            }
        );
    }
}
