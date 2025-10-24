import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { checkAccess, getCartByUser } from "@/utils/ServerFunctions";
import Order from "@/models/Order";
import mongoose from "mongoose";
import Comment from "@/models/Comment";
import { message } from "antd";

export async function POST(req) {
    try {
        //get init user's data such as Id - step1
        const session = await getServerSession(authOptions);
        if (!session) throw new Error("لطفا وارد شوید");

        //check access - step2
        const isAccess = checkAccess(["USER"], session.user.roles);
        if (!isAccess) throw new Error("فقط ادمین ها دسترسی دارند");

        //connect database - step3
        await connectDB();

        //get params - step4
        const data = await req.json()

        //create comment - step5
        await Comment.create({
            restaurantId : data.restaurantId,
            userId : session.user.id,
            orderId : data.orderId,
            comment : data.comment,
            rate : data.rate
        })

        return NextResponse.json(
            {
                success: true,
                message : "نظر شما ثبت شد و پس از تایید به نمایش در می آید"
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
