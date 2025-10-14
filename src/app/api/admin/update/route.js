import Restaurant from "@/models/Restaurants";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { checkAccess } from "@/utils/ServerFunctions";

export async function POST(req) {
    try {
        //get init user's data such as Id - step1
        const session = await getServerSession(authOptions);
        if (!session) throw new Error("لطفا وارد شوید");

        //check access - step2
        const isAccess = checkAccess(["SUPERADMIN"], session.user.roles);
        if (!isAccess) throw new Error("شما دسترسی ندارید");

        //connect database - step3
        await connectDB();

        //get datas - step4
        const data = await req.json();

        //update - step5
        await Restaurant.updateOne(
            { _id: data._id },
            {
                $set: {
                    restaurantType: data.restaurantType,
                    status : data.status
                },
            }
        );

        return NextResponse.json(
            {
                success: true,
                message: "اطلاعات با موفقیت ویرایش شد",
            },
            { status: 200 }
        );
    } catch (error) {
        console.log(error.message);

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
