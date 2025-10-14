import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { checkAccess } from "@/utils/ServerFunctions";
import Foods from "@/models/Foods";

export async function DELETE(req) {
    try {
        //get init user's data such as Id - step1
        const session = await getServerSession(authOptions);
        if (!session) throw new Error("لطفا وارد شوید");

        //check access - step2
        const isAccess = checkAccess(["MERCHANT"], session.user.roles);
        if (!isAccess) throw new Error("شما دسترسی ندارید");

        //connect database - step3
        await connectDB();

        //get datas - step4
        const data = await req.json();

        //delete item - step5
        await Foods.deleteOne({
            _id: data._id,
            restaurantId: session.user.id,
        });

        return NextResponse.json(
            {
                success: true,
                message: "عملیات با موفقیت انجام شد",
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
