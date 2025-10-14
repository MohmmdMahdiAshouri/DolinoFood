import Restaurant from "@/models/Restaurants";
import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import mongoose from "mongoose";

export async function GET(req) {
    try {
        //get init user's data such as Id - step1
        const session = await getServerSession(authOptions);
        if (!session) throw new Error("لطفا وارد شوید");

        //connect database - step2
        await connectDB();

        //get restaurant - step3
        const restaurant = await Restaurant.findOne({_id : new mongoose.Types.ObjectId(session.user.id)});

        return NextResponse.json(
            {
                success: true,
                message: "ثبت نام با موفقیت انجام شد",
                data: restaurant,
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
