import connectDB from "@/utils/connectDB";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "../../auth/[...nextauth]/route";
import { checkAccess, getCartByUser, supportDelivery } from "@/utils/ServerFunctions";
import Order from "@/models/Order";
import mongoose from "mongoose";

export async function POST(req) {
    try {
        //get init user's data such as Id - step1
        const session = await getServerSession(authOptions);
        if (!session) throw new Error("لطفا وارد شوید");

        //check access - step2
        const isAccess = checkAccess(["USER"], session.user.roles);
        if (!isAccess) throw new Error("فقط کاربران میتوانند سفارش دهند");

        //connect database - step3
        await connectDB();

        //get params - step4
        const data = await req.json();

        //get order - step5
        const order = await Order.aggregate([
            {
                $match: {
                    userId: new mongoose.Types.ObjectId(session.user.id),
                    status: "pending",
                },
            },
            {
                $lookup: {
                    from : "restaurants",
                    localField : "restaurantId",
                    foreignField : "_id",
                    as : "restaurant",
                },
            },
        ]);
        if (!order && order.length < 1) throw new Error("درخواست با خطا مواجه شد");

        console.log("-+-", order[0]);
        
        //check support delivery method - step6
        const isSupport = supportDelivery(data.service, order[0].restaurant[0].service)
        if(!isSupport) throw new Error("رستوران مورد نظر این روش ارسال را پشتیبانی نمی کند")

        await Order.updateOne({userId : session.user.id, status :"pending"}, {$set : {
            deliveryType : data.service
        }})

        return NextResponse.json(
            {
                success: true,
                message: "موفق",
                data: order[0],
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
